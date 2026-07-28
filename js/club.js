/* ==========================================================================
   CLUB.JS — shared data helpers used across every page.
   Firestore layout:
     players/{username}   -> full player document (see schema below)
     rumors/{autoId}       -> transfer rumor feed entries
     config/admin          -> { username }  (real auth is Firebase Auth)
     config/club            -> { name, crestInitials, discordWebhook }
   ========================================================================== */

const PLAYERS = () => db.collection('players');
const RUMORS  = () => db.collection('rumors');
const CONFIG  = (doc) => db.collection('config').doc(doc);
const CLUBS   = () => db.collection('clubs');

/* ---------- Player schema defaults (used when admin creates a new player) --------- */
function blankPlayer(username){
  return {
    username, password: "",
    name: "", position: "", ovr: 70, age: 22,
    team: "No Name Sporting Club", transferStatus: "Not listed",
    salary: 0, marketValue: 0,
    contract: { start: "", years: 1, releaseClause: 0, bonuses: "" },
    interestedClubs: [],           // [{club, percent}]  -- clubs interested in the player (admin-set)
    declaredInterest: [],          // [{club, date}]      -- player self-declaring interest in leaving, capped at 2 per 3 days
    careerHistory: [],             // [{year, event}]
    lifeChoice: "",                // set once by player
    reputation: 60,                 // 0-100 fan approval
    bank: { checking: 0, savings: 0 },
    cars: [],                       // [{name, tier, acquired}]
    properties: [],                 // [{name, tier, location, acquired}]
    investments: [],                // [{name, category, principal, performancePct}]
    mortgages: [],                  // [{property, status, reason, date}]
    sponsorships: [],               // [{brand, tier, since}]
    pendingSponsorOffer: null,      // {brand, tier, industry, date}
    lastSponsorCheck: null,
    businessVentures: [],           // [{name, type, status}]
    charityLog: [],                 // [{cause, note, date}]
    gambling: { wagered: 0, won: 0, lost: 0, biggestWin: 0, log: [] }, // log: [{game, bet, result, amount, date}]
    relationship: { status: "Single", partnerName: "", since: null, prenup: false }, // Single/Engaged/Married/Divorced
    kids: [],                        // [{name, born}]
    lastKidTry: null,                // cooldown gate, ~once per 3 weeks
    staff: [],                       // [{role, name, weeklySalary, hiredDate}]
    luxuryItems: [],                 // [{name, category, value, acquired}] -- jewelry/art/yachts/jets
    experienceLog: [],               // [{name, category, cost, date}] -- vacations etc, no lasting asset value
    expenseLog: [],                  // [{headline, amount, date}]
    lastExpenseCheck: null,
    lastNewsCheck: null,
    bankruptcyCount: 0,
    retired: false,
    createdAt: Date.now()
  };
}

async function getAllPlayers(){
  const snap = await PLAYERS().get();
  return snap.docs.map(d => d.data());
}
async function getPlayer(username){
  const doc = await PLAYERS().doc(username).get();
  return doc.exists ? doc.data() : null;
}
async function savePlayer(player){
  await PLAYERS().doc(player.username).set(player, { merge: true });
}
async function deletePlayer(username){
  await PLAYERS().doc(username).delete();
}

/* ---------- Formatting ---------- */
function fmtMoney(n){
  if (n === undefined || n === null) return "$0";
  const abs = Math.abs(n);
  if (abs >= 1e6) return (n/1e6).toFixed(2).replace(/\.00$/,'') + "M";
  if (abs >= 1e3) return (n/1e3).toFixed(0) + "K";
  return "$" + n;
}
function fmtMoneyFull(n){
  return "$" + (n||0).toLocaleString();
}
function fmtDate(d){
  if (!d) return "—";
  const dt = new Date(d);
  return dt.toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' });
}
function yearsAt(startDateStr){
  if (!startDateStr) return 0;
  const start = new Date(startDateStr);
  const now = new Date();
  return ((now - start) / (1000*60*60*24*365.25));
}
function isVeteranDeal(startDateStr){
  return yearsAt(startDateStr) >= 3;
}
function contractEndDate(p){
  if (!p.contract || !p.contract.start) return null;
  const d = new Date(p.contract.start);
  d.setFullYear(d.getFullYear() + (p.contract.years||0));
  return d;
}
function monthsUntil(dateObj){
  if (!dateObj) return null;
  const now = new Date();
  return (dateObj - now) / (1000*60*60*24*30.44);
}
function netWorth(p){
  const bank = (p.bank?.checking||0) + (p.bank?.savings||0);
  const invest = (p.investments||[]).reduce((s,i)=> s + (i.principal||0) * (1 + (i.performancePct||0)/100), 0);
  const props = (p.properties||[]).reduce((s,x)=> s + (x.value||0), 0);
  const cars = (p.cars||[]).reduce((s,x)=> s + (x.value||0), 0);
  const luxury = (p.luxuryItems||[]).reduce((s,x)=> s + (x.value||0), 0);
  const debt = (p.mortgages||[]).filter(m=>m.status==='Approved').reduce((s,m)=> s + (m.balance||0), 0);
  return Math.round(bank + invest + props + cars + luxury - debt);
}
const BANKRUPTCY_THRESHOLD = -250000;
function inFinancialCrisis(p){
  return netWorth(p) < BANKRUPTCY_THRESHOLD;
}
function valueRating(p){
  // crude "worth it" flag: salary per OVR point vs league-ish baseline
  if (!p.ovr) return "—";
  const perPoint = (p.salary||0) / p.ovr;
  if (perPoint > 15000) return "Overpaid";
  if (perPoint < 4000) return "Bargain";
  return "Fair value";
}
function esc(str){
  const d = document.createElement('div');
  d.textContent = str ?? "";
  return d.innerHTML;
}
function toast(msg, isErr){
  document.querySelectorAll('.toast').forEach(t=>t.remove());
  const t = document.createElement('div');
  t.className = 'toast' + (isErr ? ' err' : '');
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(()=> t.remove(), 3800);
}
function initials(name){
  return (name||"?").split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
}
