/* ==========================================================================
   DASHBOARD.JS
   ========================================================================== */

const PAYDAY_COOLDOWN_DAYS = 3;   // real-world days between salary collections
const MORTGAGE_SALARY_MULT = 4;   // max loan = salary * this, minus existing debt
const DOWN_PAYMENT_PCT = 0.20;
const DECLARE_WINDOW_DAYS = 3;    // rolling window for self-declared transfer interest
const DECLARE_MAX = 2;            // max declarations allowed within that window
const KID_COOLDOWN_DAYS = 21;     // "once every 3 weeks"
const NEWS_COOLDOWN_HOURS = 12;
const EXPENSE_COOLDOWN_HOURS = 18;
const SCANDAL_CHANCE = 0.08;      // rare, rolled inside the expense check

let player = null;

async function init(){
  const username = requirePlayerSession();
  if (!username) return;
  player = await getPlayer(username);
  if (!player){ playerLogout(); return; }

  document.getElementById('shell').innerHTML =
    renderSidebar('dashboard', { type:'player', name: player.name, username: player.username }) +
    document.getElementById('mainTemplate').innerHTML;

  document.getElementById('pageTitle').textContent = player.name || player.username;
  document.getElementById('pageSub').textContent = player.retired ? "Retired — Club Legend" : `${player.position || '—'} · No Name Sporting Club`;

  populateCatalogs();
  populateStaffAndLuxury();
  renderAll();

  const params = new URLSearchParams(window.location.search);
  if (!player.lifeChoice || params.get('onboard')){
    document.getElementById('onboardModal').style.display = 'flex';
  }
}

/* ---------------- Catalog (cars + properties) ---------------- */

function groupByTier(list){
  const groups = {};
  list.forEach((item, i)=>{
    if (!groups[item.tier]) groups[item.tier] = [];
    groups[item.tier].push({ ...item, _idx: i });
  });
  return groups;
}

function buildCarOptions(filterText){
  const term = (filterText||'').trim().toLowerCase();
  const filtered = term ? CAR_CATALOG.filter(c=>c.name.toLowerCase().includes(term)) : CAR_CATALOG;
  const indexed = filtered.map(c => ({ ...c, _idx: CAR_CATALOG.indexOf(c) }));
  const groups = {};
  indexed.forEach(c=>{ (groups[c.tier] = groups[c.tier] || []).push(c); });
  const order = ['Economy','Sport','Luxury','Exotic','Hypercar'];
  const sel = document.getElementById('carTier');
  sel.innerHTML = order.filter(t=>groups[t]).map(tier=>
    `<optgroup label="${tier}">` +
    groups[tier].map(c=>`<option value="${c._idx}">${esc(c.name)} — ${fmtMoney(c.price)}</option>`).join('') +
    `</optgroup>`
  ).join('') || '<option value="">No matches</option>';
}
function filterCarSelect(){
  buildCarOptions(document.getElementById('carSearch').value);
}

function populateCatalogs(){
  buildCarOptions('');
  const order = ['Rental','Starter Home','Mid-Range Home','Luxury Home','Mansion / Estate','Ultra Luxury'];
  const groups = groupByTier(PROPERTY_CATALOG);
  const sel = document.getElementById('propTier');
  sel.innerHTML = order.filter(t=>groups[t]).map(tier=>
    `<optgroup label="${tier}">` +
    groups[tier].map(p=>`<option value="${p._idx}">${esc(p.name)} — ${p.mode==='rent'?fmtMoney(p.price)+'/mo':fmtMoney(p.price)}</option>`).join('') +
    `</optgroup>`
  ).join('');
  updatePropBlurb();
}
function updatePropBlurb(){
  const idx = Number(document.getElementById('propTier').value);
  const p = PROPERTY_CATALOG[idx];
  document.getElementById('propBlurb').textContent = p ? p.blurb : '';
  const financeBtn = document.querySelector('#propBuyButtons button:last-child');
  if (financeBtn) financeBtn.style.display = (p && p.mode === 'rent') ? 'none' : 'inline-flex';
}

function populateStaffAndLuxury(){
  const staffSel = document.getElementById('staffPick');
  staffSel.innerHTML = STAFF_CATALOG.map((s,i)=>
    `<option value="${i}">${esc(s.role)} — ${esc(s.name)} — ${fmtMoney(s.weeklySalary)}/wk</option>`
  ).join('');

  const order = ['Jewelry & Watches','Art & Collectibles','Yachts','Private Jets','Vacations & Experiences'];
  const groups = groupByTier(LUXURY_CATALOG.map((x,i)=>({ ...x, tier:x.category })));
  const luxSel = document.getElementById('luxuryPick');
  luxSel.innerHTML = order.filter(t=>groups[t]).map(tier=>
    `<optgroup label="${tier}">` +
    groups[tier].map(x=>`<option value="${x._idx}">${esc(x.name)} — ${fmtMoney(x.price)}${x.asset?'':' (experience)'}</option>`).join('') +
    `</optgroup>`
  ).join('');
}

function renderAll(){
  renderPlayerCard();
  renderStats();
  renderDossier();
  renderBanking();
  renderCharity();
  renderCars();
  renderProperties();
  renderMortgageOptions();
  renderInvestments();
  renderVentures();
  renderRelationship();
  renderStaff();
  renderLuxury();
  renderSponsorships();
  renderReputation();
  renderExpenseLog();
  renderBankruptcy();
  renderCrisisBanner();
  renderDeclaredInterest();
  renderCasino();
  renderCareer();
  renderRetirement();
}

/* ---------------- Rendering ---------------- */

function renderPlayerCard(){
  document.getElementById('playerCardWrap').innerHTML = `
    <div class="ovr-badge"><div class="n">${player.ovr}</div><div class="p">${esc(player.position||'')}</div></div>
    <div>
      <h2>${esc(player.name)} ${player.retired ? '<span class="pill">Retired</span>' : ''}</h2>
      <div class="meta">${esc(player.team)} · Age ${player.age} · ${esc(player.transferStatus)}</div>
      ${player.lifeChoice ? `<div class="tag-strip"><span class="pill pill-gold">${esc(player.lifeChoice)} path</span></div>` : ''}
    </div>`;
}

function renderStats(){
  const nw = netWorth(player);
  document.getElementById('statGrid').innerHTML = `
    <div class="stat"><div class="label">Salary</div><div class="value gold">${fmtMoney(player.salary)}/yr</div></div>
    <div class="stat"><div class="label">Market Value</div><div class="value">${fmtMoney(player.marketValue)}</div></div>
    <div class="stat"><div class="label">Net Worth</div><div class="value good">${fmtMoney(nw)}</div></div>
    <div class="stat"><div class="label">Reputation</div><div class="value">${player.reputation}/100</div></div>`;
}

function renderDossier(){
  const end = contractEndDate(player);
  document.getElementById('dossier').innerHTML = `
    <div class="seal">CLUB<br>SEAL</div>
    <div class="dossier-head">
      <div class="club">No Name Sporting Club</div>
      <h2>Player Contract</h2>
      <div class="sub">${isVeteranDeal(player.contract?.start) ? 'VETERAN DEAL · ' : ''}Official Document</div>
    </div>
    <div class="dossier-grid">
      <div class="dossier-field"><div class="k">Player</div><div class="v">${esc(player.name)}</div></div>
      <div class="dossier-field"><div class="k">Position</div><div class="v">${esc(player.position)}</div></div>
      <div class="dossier-field"><div class="k">Signed</div><div class="v">${fmtDate(player.contract?.start)}</div></div>
      <div class="dossier-field"><div class="k">Expires</div><div class="v">${end ? fmtDate(end) : '—'}</div></div>
      <div class="dossier-field"><div class="k">Contract Length</div><div class="v">${player.contract?.years||0} years</div></div>
      <div class="dossier-field"><div class="k">Annual Salary</div><div class="v">${fmtMoneyFull(player.salary)}</div></div>
      <div class="dossier-field"><div class="k">Release Clause</div><div class="v">${fmtMoneyFull(player.contract?.releaseClause)}</div></div>
      <div class="dossier-field"><div class="k">Market Value</div><div class="v">${fmtMoneyFull(player.marketValue)}</div></div>
    </div>
    <div class="dossier-clause">${esc(player.contract?.bonuses) || 'No supplementary bonus clauses on file.'}</div>
    <div class="dossier-sign">
      <div><div class="line">${esc(player.name)}</div><div class="cap">Player</div></div>
      <div><div class="line">Club Office</div><div class="cap">No Name Sporting Club</div></div>
    </div>`;
}

function renderBanking(){
  document.getElementById('checkingVal').textContent = fmtMoneyFull(player.bank.checking);
  document.getElementById('savingsVal').textContent = fmtMoneyFull(player.bank.savings);
  const last = player.lastPayday ? new Date(player.lastPayday) : null;
  const ready = !last || (Date.now() - last) >= PAYDAY_COOLDOWN_DAYS*86400000;
  const btn = document.getElementById('paydayBtn');
  btn.disabled = !ready;
  btn.textContent = ready ? 'Collect Salary' : `Next payday in ${Math.ceil(PAYDAY_COOLDOWN_DAYS - (Date.now()-last)/86400000)}d`;
}

function renderCharity(){
  document.getElementById('charityLog').innerHTML = (player.charityLog||[]).slice().reverse().map(c=>
    `<div style="margin-bottom:6px;">🤝 <strong>${esc(c.cause)}</strong> — ${fmtMoney(c.amount)} <span style="opacity:.6">(${fmtDate(c.date)})</span></div>`
  ).join('') || 'No donations logged yet.';
}

function renderCars(){
  document.getElementById('carsCount').textContent = (player.cars||[]).length;
  document.getElementById('carsList').innerHTML = (player.cars||[]).map(c=>
    `<div class="stat" style="margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;">
      <div><div class="value" style="font-size:14px;">${esc(c.name)}</div><div class="label">Acquired ${fmtDate(c.acquired)}</div></div>
      <span class="pill pill-gold">${fmtMoney(c.value)}</span>
    </div>`
  ).join('') || '<div class="empty-state">Garage is empty.</div>';
}

function renderProperties(){
  document.getElementById('propsCount').textContent = (player.properties||[]).length;
  document.getElementById('propsList').innerHTML = (player.properties||[]).map(p=>
    `<div class="stat" style="margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;">
      <div><div class="value" style="font-size:14px;">${esc(p.name)}</div><div class="label">${esc(p.location||'Location not set')} · ${esc(p.mode)}</div></div>
      <span class="pill pill-gold">${fmtMoney(p.value)}</span>
    </div>`
  ).join('') || '<div class="empty-state">No properties yet.</div>';
}

function renderMortgageOptions(){
  document.getElementById('mortgageList').innerHTML = (player.mortgages||[]).map(m=>
    `<div class="stat" style="margin-bottom:8px;">
      <div style="display:flex;justify-content:space-between;">
        <strong>${esc(m.property)}</strong>
        <span class="pill ${m.status==='Approved'?'pill-good':'pill-bad'}">${m.status}</span>
      </div>
      <div class="label" style="margin-top:6px;">${esc(m.reason||'')}</div>
      ${m.status==='Approved' ? `<div class="label" style="margin-top:4px;">Balance: ${fmtMoneyFull(m.balance)} · Monthly: ${fmtMoneyFull(m.monthly)}</div>
      <button class="btn btn-sm" style="margin-top:8px;" onclick="payMortgage('${esc(m.property)}')">Make Payment</button>` : ''}
    </div>`
  ).join('') || '<div class="empty-state">No mortgage history.</div>';
}

function renderInvestments(){
  document.getElementById('investList').innerHTML = (player.investments||[]).map((inv,i)=>{
    const cur = Math.round(inv.principal * (1+inv.performancePct/100));
    return `<div class="stat" style="margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;">
      <div><div class="value" style="font-size:14px;">${esc(inv.category)}</div><div class="label">Principal ${fmtMoney(inv.principal)}</div></div>
      <div style="text-align:right;">
        <div class="value ${inv.performancePct>=0?'good':'bad'}" style="font-size:14px;">${fmtMoney(cur)}</div>
        <button class="btn btn-sm btn-ghost" style="margin-top:4px;" onclick="cashOutInvestment(${i})">Cash out</button>
      </div>
    </div>`;
  }).join('') || '<div class="empty-state">No active investments.</div>';
}

function renderVentures(){
  document.getElementById('bizList').innerHTML = (player.businessVentures||[]).map((b,i)=>
    `<div class="stat" style="margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;">
      <div><div class="value" style="font-size:14px;">${esc(b.name)}</div><div class="label">${esc(b.type)}</div></div>
      <div style="text-align:right;">
        <span class="pill ${b.status==='Thriving'?'pill-good':b.status==='Struggling'?'pill-bad':'pill-gold'}">${b.status}</span><br>
        <button class="btn btn-sm btn-ghost" style="margin-top:6px;" onclick="checkVenture(${i})">Check In</button>
      </div>
    </div>`
  ).join('') || '<div class="empty-state">No ventures launched.</div>';
}

function renderSponsorships(){
  document.getElementById('sponsorList').innerHTML = (player.sponsorships||[]).map(s=>
    `<div class="stat" style="margin-bottom:8px;">
      <div style="display:flex;justify-content:space-between;">
        <strong>${esc(s.brand)}</strong><span class="pill pill-gold">${esc(s.tier)}</span>
      </div>
      <div class="label" style="margin-top:6px;">Since ${fmtDate(s.since)}</div>
    </div>`
  ).join('') || '<div class="empty-state">No sponsorships yet — assigned by the club.</div>';
}

function renderReputation(){
  document.getElementById('repVal').textContent = `${player.reputation}/100`;
  document.getElementById('newsLog').innerHTML = (player.newsLog||[]).slice().reverse().slice(0,6).map(n=>
    `<div style="margin-bottom:6px;">${n.positive?'📣':'⚠️'} ${esc(n.headline)}</div>`
  ).join('') || 'No club news yet.';
}

function recentDeclarations(){
  const cutoff = Date.now() - DECLARE_WINDOW_DAYS*86400000;
  return (player.declaredInterest||[]).filter(d=>d.date >= cutoff);
}

function renderDeclaredInterest(){
  const recent = recentDeclarations();
  const remaining = Math.max(0, DECLARE_MAX - recent.length);
  const badge = document.getElementById('declareRemaining');
  const btn = document.getElementById('declareBtn');
  if (remaining > 0){
    badge.textContent = `${remaining} of ${DECLARE_MAX} left this window`;
    btn.disabled = false;
    btn.textContent = 'Declare Interest';
  } else {
    const oldest = recent.reduce((a,b)=> a.date<b.date?a:b);
    const freeAt = new Date(oldest.date + DECLARE_WINDOW_DAYS*86400000);
    const days = Math.max(0, (freeAt - Date.now())/86400000);
    badge.textContent = `0 left — resets in ${days.toFixed(1)}d`;
    btn.disabled = true;
    btn.textContent = 'Limit reached';
  }

  const all = (player.declaredInterest||[]).slice().sort((a,b)=>b.date-a.date);
  document.getElementById('declareList').innerHTML = all.map((d,i)=>`
    <div class="stat" style="margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;">
      <div><strong>${esc(d.club)}</strong><div class="label" style="margin-top:4px;">${fmtDate(d.date)}</div></div>
      <button class="btn btn-sm btn-ghost" onclick="withdrawDeclaration(${(player.declaredInterest||[]).indexOf(d)})">Withdraw</button>
    </div>`).join('') || '<div class="empty-state">No public declarations yet.</div>';
}

async function declareInterest(){
  const club = document.getElementById('declareClub').value.trim();
  if (!club) return toast('Enter a club name.', true);
  if (recentDeclarations().length >= DECLARE_MAX) return toast(`You can only declare interest in ${DECLARE_MAX} clubs per ${DECLARE_WINDOW_DAYS} days.`, true);

  player.declaredInterest = player.declaredInterest || [];
  player.declaredInterest.push({ club, date: Date.now() });
  await save();
  renderDeclaredInterest();
  document.getElementById('declareClub').value = '';
  webhookDeclareInterest(player.name, club);
}

async function withdrawDeclaration(i){
  player.declaredInterest.splice(i,1);
  await save();
  renderDeclaredInterest();
}

/* ---------------- Casino ---------------- */

function renderCasino(){
  const g = player.gambling || { wagered:0, won:0, lost:0, biggestWin:0, log:[] };
  document.getElementById('gWagered').textContent = fmtMoneyFull(g.wagered);
  document.getElementById('gBiggest').textContent = fmtMoneyFull(g.biggestWin);
  const net = g.won - g.lost;
  document.getElementById('casinoNet').textContent = `Net: ${net>=0?'+':''}${fmtMoney(net)}`;
  document.getElementById('gambleLog').innerHTML = (g.log||[]).slice().reverse().slice(0,8).map(l=>
    `<div style="margin-bottom:5px;">${l.result==='win'?'🟢':'🔴'} <strong>${esc(l.game)}</strong> — bet ${fmtMoney(l.bet)}, ${l.result==='win'?'won':'lost'} ${fmtMoney(l.amount)}</div>`
  ).join('') || 'No hands played yet.';
}

async function recordGamble(game, bet, won, payout){
  player.gambling = player.gambling || { wagered:0, won:0, lost:0, biggestWin:0, log:[] };
  const g = player.gambling;
  g.wagered += bet;
  const netAmount = won ? (payout - bet) : bet;
  if (won){ g.won += netAmount; g.biggestWin = Math.max(g.biggestWin, netAmount); }
  else { g.lost += bet; }
  g.log = g.log || [];
  g.log.push({ game, bet, result: won?'win':'lose', amount: netAmount, date: Date.now() });
  player.bank.checking += won ? (payout - bet) : -bet;
  await save();
  renderBanking(); renderStats(); renderCasino();
  if (netAmount >= 250000) webhookGamble(player.name, game, won, netAmount);
}

function takeBet(inputId){
  if (blockIfCrisis()) return null;
  const bet = Number(document.getElementById(inputId).value);
  if (!bet || bet <= 0){ toast('Enter a valid bet.', true); return null; }
  if (bet > player.bank.checking){ toast('Not enough in checking.', true); return null; }
  return bet;
}

async function playCoinFlip(){
  const bet = takeBet('coinBet'); if (!bet) return;
  const call = document.getElementById('coinSide').value;
  const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
  const won = result === call;
  toast(`${result}! You ${won?'won':'lost'}.`, !won);
  await recordGamble('Coin Flip', bet, won, bet*1.9);
}

async function playDiceDuel(){
  const bet = takeBet('diceBet'); if (!bet) return;
  const player_roll = 1 + Math.floor(Math.random()*6);
  const house_roll = 1 + Math.floor(Math.random()*6);
  if (player_roll === house_roll){
    toast(`Push — both rolled ${player_roll}. Bet returned.`);
    return; // no change
  }
  const won = player_roll > house_roll;
  toast(`You rolled ${player_roll}, house rolled ${house_roll}. You ${won?'won':'lost'}.`, !won);
  await recordGamble('Dice Duel', bet, won, bet*1.9);
}

const SLOT_SYMBOLS = [
  { s:'🍒', w:40, mult:3 },
  { s:'🍋', w:28, mult:4 },
  { s:'🔔', w:16, mult:8 },
  { s:'⭐', w:10, mult:12 },
  { s:'💎', w:6,  mult:20 },
];
function weightedSymbol(){
  const total = SLOT_SYMBOLS.reduce((s,x)=>s+x.w,0);
  let r = Math.random()*total;
  for (const sym of SLOT_SYMBOLS){ if (r < sym.w) return sym; r -= sym.w; }
  return SLOT_SYMBOLS[0];
}
async function playSlots(){
  const bet = takeBet('slotsBet'); if (!bet) return;
  const reels = [weightedSymbol(), weightedSymbol(), weightedSymbol()];
  document.getElementById('slotsReel').textContent = reels.map(r=>r.s).join(' ');
  let won = false, payout = 0;
  if (reels[0].s === reels[1].s && reels[1].s === reels[2].s){
    won = true; payout = bet * reels[0].mult;
    toast(`JACKPOT! Triple ${reels[0].s} — ${reels[0].mult}x!`);
  } else if (reels[0].s === reels[1].s || reels[1].s === reels[2].s || reels[0].s === reels[2].s){
    won = true; payout = bet * 1.5;
    toast('Two of a kind — small win.');
  } else {
    toast('No match. House wins.', true);
  }
  await recordGamble('Slots', bet, won, payout);
}

async function playRoulette(){
  const bet = takeBet('rouletteBet'); if (!bet) return;
  const color = document.getElementById('rouletteColor').value;
  const roll = Math.floor(Math.random()*37); // 0-36, 0 = green
  const resultColor = roll === 0 ? 'Green' : (roll % 2 === 0 ? 'Black' : 'Red');
  const won = resultColor === color;
  const payout = color === 'Green' ? bet*35 : bet*2;
  toast(`Ball landed on ${roll} (${resultColor}). You ${won?'won':'lost'}.`, !won);
  await recordGamble('Roulette', bet, won, payout);
}

/* ---------------- Relationships & Family ---------------- */

function renderRelationship(){
  const r = player.relationship || { status:'Single', partnerName:'', since:null, prenup:false };
  const kids = player.kids || [];
  let html = '';

  if (r.status === 'Single'){
    html += `
      <div class="field-row">
        <div><label for="partnerName">Partner's name</label><input id="partnerName" type="text" placeholder="e.g. Jamie Rivera"></div>
        <div style="display:flex;align-items:flex-end;"><button class="btn btn-solid" style="margin-bottom:14px;" onclick="propose()">Propose</button></div>
      </div>`;
  } else if (r.status === 'Engaged'){
    html += `
      <p class="section-note">Engaged to <strong>${esc(r.partnerName)}</strong>.</p>
      <label style="display:flex;align-items:center;gap:8px;text-transform:none;font-family:inherit;color:var(--ink-text);font-size:13px;">
        <input type="checkbox" id="prenupCheck" style="width:auto;margin:0;"> Sign a prenup before marrying
      </label>
      <button class="btn btn-solid" onclick="marry()">Get Married</button>
      <button class="btn btn-ghost" onclick="callOffEngagement()">Call It Off</button>`;
  } else if (r.status === 'Married'){
    html += `
      <p class="section-note">Married to <strong>${esc(r.partnerName)}</strong> since ${fmtDate(r.since)}${r.prenup ? ' · Prenup on file' : ''}.</p>
      <button class="btn btn-danger" onclick="fileDivorce()">File for Divorce</button>`;
  } else if (r.status === 'Divorced'){
    html += `<p class="section-note">Divorced. Previously married to ${esc(r.partnerName)}.</p>
      <div class="field-row">
        <div><label for="partnerName">New partner's name</label><input id="partnerName" type="text" placeholder="e.g. Jamie Rivera"></div>
        <div style="display:flex;align-items:flex-end;"><button class="btn btn-solid" style="margin-bottom:14px;" onclick="propose()">Propose</button></div>
      </div>`;
  }

  if (r.status === 'Married'){
    const last = player.lastKidTry ? new Date(player.lastKidTry) : null;
    const ready = !last || (Date.now()-last) >= KID_COOLDOWN_DAYS*86400000;
    html += `<hr class="hairline"><label for="babyName">Try for a baby (name if it happens)</label>
      <input id="babyName" type="text" placeholder="e.g. Nova">
      <button class="btn ${ready?'btn-solid':'btn-ghost'}" ${ready?'':'disabled'} onclick="tryForBaby()">
        ${ready ? 'Try for a Baby' : `Next attempt in ${Math.ceil(KID_COOLDOWN_DAYS - (Date.now()-last)/86400000)}d`}
      </button>`;
  }

  html += `<hr class="hairline"><div class="card-title" style="font-size:11px;">Kids</div>` +
    (kids.length ? kids.map(k=>`<div class="stat" style="margin-bottom:6px;"><strong>${esc(k.name)}</strong> <span class="label">— born ${fmtDate(k.born)}</span></div>`).join('')
      : '<div class="empty-state" style="padding:12px;">No kids yet.</div>');

  document.getElementById('relationshipBlock').innerHTML = html;
}

async function propose(){
  const name = document.getElementById('partnerName').value.trim();
  if (!name) return toast('Enter a name first.', true);
  player.relationship = { status:'Engaged', partnerName: name, since: null, prenup: false };
  await save(); renderRelationship();
}
async function callOffEngagement(){
  player.relationship = { status:'Single', partnerName:'', since:null, prenup:false };
  await save(); renderRelationship();
}
async function marry(){
  const prenup = document.getElementById('prenupCheck')?.checked || false;
  player.relationship.status = 'Married';
  player.relationship.since = Date.now();
  player.relationship.prenup = prenup;
  await save(); renderRelationship();
  webhookMarriage(player.name, player.relationship.partnerName);
}
async function fileDivorce(){
  if (!confirm('File for divorce? This affects your finances and reputation.')) return;
  const partnerName = player.relationship.partnerName;
  const prenup = player.relationship.prenup;
  const settlementPct = prenup ? (0.05 + Math.random()*0.08) : (0.20 + Math.random()*0.25);
  const nw = netWorth(player);
  const settlement = Math.max(0, Math.round(nw * settlementPct));
  player.bank.checking -= Math.min(settlement, Math.max(0, player.bank.checking));
  const remainder = settlement - Math.min(settlement, Math.max(0, player.bank.checking + settlement));
  player.reputation = Math.max(0, player.reputation - (prenup ? 3 : 8));
  player.relationship = { status:'Divorced', partnerName, since:null, prenup:false };
  await save(); renderRelationship(); renderBanking(); renderStats(); renderReputation();
  toast(`Divorce finalized. Settlement: ${fmtMoney(settlement)}${prenup?' (limited by prenup)':''}.`);
  webhookDivorce(player.name, partnerName);
}
async function tryForBaby(){
  const last = player.lastKidTry ? new Date(player.lastKidTry) : null;
  if (last && (Date.now()-last) < KID_COOLDOWN_DAYS*86400000) return;
  player.lastKidTry = Date.now();
  const name = (document.getElementById('babyName')?.value || '').trim() || 'Unnamed';
  const success = Math.random() < 0.7;
  if (success){
    player.kids = player.kids || [];
    player.kids.push({ name, born: Date.now() });
    await save(); renderRelationship();
    toast(`Congratulations! Welcome, ${name}.`);
    webhookBaby(player.name, name);
  } else {
    await save(); renderRelationship();
    toast('Not this time — try again in a few weeks.');
  }
}

/* ---------------- Personal Staff ---------------- */

function renderStaff(){
  const staff = player.staff || [];
  const weekly = staff.reduce((s,x)=>s+x.weeklySalary,0);
  document.getElementById('staffWeeklyCost').textContent = `${fmtMoney(weekly)}/wk total`;
  document.getElementById('staffList').innerHTML = staff.map((s,i)=>
    `<div class="stat" style="margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;">
      <div><strong>${esc(s.role)}</strong> — ${esc(s.name)}<div class="label" style="margin-top:4px;">${fmtMoney(s.weeklySalary)}/wk · hired ${fmtDate(s.hiredDate)}</div></div>
      <button class="btn btn-sm btn-ghost" onclick="fireStaff(${i})">Let Go</button>
    </div>`
  ).join('') || '<div class="empty-state">No staff hired.</div>';
}
async function hireStaff(){
  if (blockIfCrisis()) return;
  const idx = Number(document.getElementById('staffPick').value);
  const item = STAFF_CATALOG[idx];
  if (!item) return;
  player.staff = player.staff || [];
  if (player.staff.some(s=>s.role===item.role && s.name===item.name)) return toast('Already on staff.', true);
  player.staff.push({ role: item.role, name: item.name, weeklySalary: item.weeklySalary, hiredDate: Date.now() });
  await save(); renderStaff();
  toast(`${item.name} joins as your ${item.role}.`);
}
async function fireStaff(i){
  player.staff.splice(i,1);
  await save(); renderStaff();
}

/* ---------------- Luxury Marketplace ---------------- */

function renderLuxury(){
  const items = player.luxuryItems || [];
  const experiences = player.experienceLog || [];
  document.getElementById('luxuryList').innerHTML =
    items.map(x=>`<div class="stat" style="margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;">
      <div><strong>${esc(x.name)}</strong><div class="label" style="margin-top:4px;">${esc(x.category)} · acquired ${fmtDate(x.acquired)}</div></div>
      <span class="pill pill-gold">${fmtMoney(x.value)}</span>
    </div>`).join('') +
    experiences.slice().reverse().slice(0,5).map(x=>`<div class="stat" style="margin-bottom:8px;display:flex;justify-content:space-between;align-items:center;">
      <div><strong>${esc(x.name)}</strong><div class="label" style="margin-top:4px;">${esc(x.category)} · ${fmtDate(x.date)}</div></div>
      <span class="pill">${fmtMoney(x.cost)} spent</span>
    </div>`).join('')
    || '<div class="empty-state">Nothing purchased yet.</div>';
}
async function buyLuxury(){
  if (blockIfCrisis()) return;
  const idx = Number(document.getElementById('luxuryPick').value);
  const item = LUXURY_CATALOG[idx];
  if (!item) return;
  if (item.price > player.bank.checking) return toast('Not enough in checking.', true);
  player.bank.checking -= item.price;
  if (item.asset){
    player.luxuryItems = player.luxuryItems || [];
    player.luxuryItems.push({ name: item.name, category: item.category, value: item.price, acquired: Date.now() });
  } else {
    player.experienceLog = player.experienceLog || [];
    player.experienceLog.push({ name: item.name, category: item.category, cost: item.price, date: Date.now() });
    player.reputation = Math.min(100, player.reputation + 1);
  }
  await save();
  renderBanking(); renderStats(); renderLuxury(); renderReputation();
  webhookPurchase(player.name, item.name, item.category.toLowerCase(), item.price);
  await maybeNetWorthShakeup();
}

/* ---------------- Random Expenses & Scandals ---------------- */

const EMERGENCY_EVENTS = [
  { headline: 'an unexpected medical bill came in', min: 2000, max: 25000 },
  { headline: 'a car needed emergency repairs', min: 1500, max: 18000 },
  { headline: 'a surprise tax adjustment landed', min: 5000, max: 60000 },
  { headline: 'a family emergency required financial help', min: 3000, max: 40000 },
  { headline: 'a home repair couldn\'t wait', min: 2000, max: 30000 },
  { headline: 'a legal consultation fee came due', min: 4000, max: 35000 },
];
const SCANDAL_EVENTS = [
  { headline: 'was named in a leaked financial dispute that made headlines.', rep: -18, min: 20000, max: 150000 },
  { headline: 'is facing scrutiny after a controversial statement resurfaced.', rep: -15, min: 10000, max: 80000 },
  { headline: 'is at the center of a messy public falling-out with a former business partner.', rep: -20, min: 30000, max: 200000 },
];

function renderExpenseLog(){
  const last = player.lastExpenseCheck ? new Date(player.lastExpenseCheck) : null;
  const ready = !last || (Date.now()-last) >= EXPENSE_COOLDOWN_HOURS*3600000;
  const btn = document.getElementById('expenseBtn');
  btn.disabled = !ready;
  btn.textContent = ready ? 'Check for Emergencies' : `Available again in ${Math.ceil(EXPENSE_COOLDOWN_HOURS - (Date.now()-last)/3600000)}h`;

  document.getElementById('expenseLog').innerHTML = (player.expenseLog||[]).slice().reverse().slice(0,6).map(e=>
    `<div style="margin-bottom:6px;">🧾 ${esc(e.headline)} — ${fmtMoney(e.amount)}</div>`
  ).join('') || 'No expenses logged yet.';
}
async function checkExpenses(){
  const last = player.lastExpenseCheck ? new Date(player.lastExpenseCheck) : null;
  if (last && (Date.now()-last) < EXPENSE_COOLDOWN_HOURS*3600000) return;
  player.lastExpenseCheck = Date.now();

  const isScandal = Math.random() < SCANDAL_CHANCE;
  if (isScandal){
    const ev = SCANDAL_EVENTS[Math.floor(Math.random()*SCANDAL_EVENTS.length)];
    const amount = Math.round(ev.min + Math.random()*(ev.max-ev.min));
    player.bank.checking -= amount;
    player.reputation = Math.max(0, player.reputation + ev.rep);
    player.expenseLog = player.expenseLog || [];
    player.expenseLog.push({ headline: `Scandal — ${ev.headline}`, amount, date: Date.now() });
    await save();
    renderBanking(); renderStats(); renderExpenseLog(); renderReputation();
    toast('A scandal broke — reputation and wallet both took a hit.', true);
    webhookScandal(player.name, ev.headline);
  } else {
    const ev = EMERGENCY_EVENTS[Math.floor(Math.random()*EMERGENCY_EVENTS.length)];
    const amount = Math.round(ev.min + Math.random()*(ev.max-ev.min));
    player.bank.checking -= amount;
    player.expenseLog = player.expenseLog || [];
    player.expenseLog.push({ headline: ev.headline, amount, date: Date.now() });
    await save();
    renderBanking(); renderStats(); renderExpenseLog();
    toast(`Life happens: ${ev.headline} — ${fmtMoney(amount)}.`, true);
    webhookExpense(player.name, ev.headline, amount);
  }
}

/* ---------------- Debt & Bankruptcy ---------------- */

function renderCrisisBanner(){
  document.getElementById('crisisBanner').style.display = inFinancialCrisis(player) ? 'block' : 'none';
}
function renderBankruptcy(){
  document.getElementById('bankruptcyCount').textContent = player.bankruptcyCount || 0;
}
async function fileBankruptcy(){
  if (!confirm('File for bankruptcy? Mortgages clear, most assets are seized, and reputation takes a serious hit.')) return;
  player.mortgages = [];
  player.investments = [];
  player.businessVentures = [];
  player.cars = [];
  player.properties = [];
  player.luxuryItems = [];
  player.bank = { checking: 1000, savings: 0 };
  player.reputation = Math.max(0, player.reputation - 25);
  player.bankruptcyCount = (player.bankruptcyCount||0) + 1;
  await save();
  renderAll();
  toast('Bankruptcy filed. Fresh start — reputation took a hit.');
  webhookBankruptcy(player.name);
}

function renderCareer(){
  const hist = (player.careerHistory||[]).slice().sort((a,b)=> (a.year||0)-(b.year||0));
  document.getElementById('careerTimeline').innerHTML = hist.map(h=>
    `<div class="timeline-item"><div class="yr">${esc(h.year)}</div><p>${esc(h.event)}</p></div>`
  ).join('') || '<div class="empty-state">Career history set by the admin will appear here.</div>';
}

function renderRetirement(){
  const eligible = netWorth(player) >= 10000000 && player.age >= 30 && !player.retired;
  document.getElementById('retireCard').style.display = eligible ? 'block' : 'none';
}

/* ---------------- Actions ---------------- */

async function save(){
  try{
    await savePlayer(player);
  }catch(e){
    console.error('Save failed', e);
    toast("Couldn't save — check your Firestore rules are published correctly.", true);
    throw e;
  }
}

async function chooseLife(choice){
  player.lifeChoice = choice;
  await save();
  document.getElementById('onboardModal').style.display = 'none';
  renderPlayerCard();
}

async function collectPayday(){
  const last = player.lastPayday ? new Date(player.lastPayday) : null;
  if (last && (Date.now()-last) < PAYDAY_COOLDOWN_DAYS*86400000) return;
  const salarySlice = player.salary / 26; // biweekly-ish slice of annual salary
  const staffCost = (player.staff||[]).reduce((s,x)=>s+x.weeklySalary,0) * (PAYDAY_COOLDOWN_DAYS/7);
  player.bank.checking += salarySlice - staffCost;
  player.lastPayday = Date.now();
  await save();
  renderBanking(); renderStats();
  if (staffCost > 0){
    toast(`Payday! +${fmtMoney(salarySlice)} in salary, -${fmtMoney(staffCost)} in staff wages.`);
  } else {
    toast(`Payday! ${fmtMoney(salarySlice)} added to checking.`);
  }
}

async function moveToSavings(){
  const amt = Number(document.getElementById('transferAmt').value);
  if (!amt || amt <= 0 || amt > player.bank.checking) return toast('Invalid amount.', true);
  player.bank.checking -= amt; player.bank.savings += amt;
  await save(); renderBanking(); renderStats();
  document.getElementById('transferAmt').value='';
}
async function moveToChecking(){
  const amt = Number(document.getElementById('withdrawAmt').value);
  if (!amt || amt <= 0 || amt > player.bank.savings) return toast('Invalid amount.', true);
  player.bank.savings -= amt; player.bank.checking += amt;
  await save(); renderBanking(); renderStats();
  document.getElementById('withdrawAmt').value='';
}

async function donateCharity(){
  const cause = document.getElementById('charityCause').value.trim();
  const amt = Number(document.getElementById('charityAmt').value);
  if (!cause || !amt || amt <= 0 || amt > player.bank.checking) return toast('Enter a cause and valid amount.', true);
  player.bank.checking -= amt;
  player.reputation = Math.min(100, player.reputation + Math.max(1, Math.round(amt/50000)));
  player.charityLog = player.charityLog || [];
  player.charityLog.push({ cause, amount: amt, date: Date.now() });
  await save();
  renderBanking(); renderStats(); renderCharity(); renderReputation();
  document.getElementById('charityCause').value=''; document.getElementById('charityAmt').value='';
  webhookCharity(player.name, cause);
}

function blockIfCrisis(){
  if (inFinancialCrisis(player)){
    toast("Financial crisis — new spending is locked. See Debt & Bankruptcy.", true);
    return true;
  }
  return false;
}

async function buyCar(){
  if (blockIfCrisis()) return;
  const idx = Number(document.getElementById('carTier').value);
  const item = CAR_CATALOG[idx];
  if (!item) return toast('Pick a car first.', true);
  if (item.price > player.bank.checking) return toast("Not enough in checking for that purchase.", true);
  player.bank.checking -= item.price;
  player.cars = player.cars || [];
  player.cars.push({ name: item.name, value: item.price, acquired: Date.now() });
  await save();
  renderBanking(); renderStats(); renderCars();
  webhookPurchase(player.name, item.name, 'car', item.price);
  await maybeNetWorthShakeup();
}

async function buyPropertyCash(){
  if (blockIfCrisis()) return;
  const idx = Number(document.getElementById('propTier').value);
  const item = PROPERTY_CATALOG[idx];
  if (!item) return toast('Pick a property first.', true);
  const location = document.getElementById('propLocation').value.trim() || 'Location not disclosed';
  const mode = item.mode;
  if (mode === 'buy' && item.price > player.bank.checking) return toast("Not enough in checking to pay cash for that property. Try financing instead.", true);
  if (mode === 'buy') player.bank.checking -= item.price;
  player.properties = player.properties || [];
  player.properties.push({ name: item.name, value: mode==='buy'?item.price:0, location, mode: mode==='buy'?'Owned':'Renting', acquired: Date.now() });
  await save();
  renderBanking(); renderStats(); renderProperties();
  webhookPurchase(player.name, `${item.name} (${location})`, 'property', item.price);
  await maybeNetWorthShakeup();
}

async function financeProperty(){
  if (blockIfCrisis()) return;
  const idx = Number(document.getElementById('propTier').value);
  const item = PROPERTY_CATALOG[idx];
  if (!item) return toast('Pick a property first.', true);
  if (item.mode === 'rent') return toast('Rentals don\'t need financing — use Pay Cash to log a rental.', true);
  const location = document.getElementById('propLocation').value.trim() || 'Location not disclosed';

  const existingDebt = (player.mortgages||[]).filter(m=>m.status==='Approved').reduce((s,m)=>s+m.balance,0);
  const maxLoan = player.salary * MORTGAGE_SALARY_MULT - existingDebt;
  const loanNeeded = item.price * (1 - DOWN_PAYMENT_PCT);
  const downPayment = item.price * DOWN_PAYMENT_PCT;

  let approved, reason;
  if (loanNeeded > maxLoan){
    approved = false; reason = 'requested loan exceeds what current salary supports against existing debt';
  } else if (downPayment > player.bank.checking){
    approved = false; reason = "insufficient checking balance for the 20% down payment";
  } else {
    approved = true; reason = 'salary and existing debt load cleared underwriting';
  }

  webhookMortgage(player.name, item.name, approved, approved ? null : reason);

  if (!approved){
    player.mortgages = player.mortgages || [];
    player.mortgages.push({ property: item.name, status: 'Denied', reason, balance: 0, monthly: 0, date: Date.now() });
    await save();
    renderMortgageOptions();
    toast(`Denied: ${reason}.`, true);
    return;
  }

  player.bank.checking -= downPayment;
  player.properties = player.properties || [];
  player.properties.push({ name: item.name, value: item.price, location, mode: 'Owned (financed)', acquired: Date.now() });
  player.mortgages = player.mortgages || [];
  player.mortgages.push({
    property: item.name, status: 'Approved', reason,
    balance: loanNeeded, monthly: Math.round(loanNeeded/240), date: Date.now()
  });
  await save();
  renderBanking(); renderStats(); renderProperties(); renderMortgageOptions();
  toast(`Approved! Down payment of ${fmtMoney(downPayment)} paid, ${fmtMoney(loanNeeded)} financed.`);
  await maybeNetWorthShakeup();
}

async function payMortgage(propName){
  const m = (player.mortgages||[]).find(x=>x.property===propName && x.status==='Approved');
  if (!m || m.balance<=0) return;
  const pay = Math.min(m.monthly, player.bank.checking, m.balance);
  if (pay <= 0) return toast('Not enough in checking.', true);
  player.bank.checking -= pay; m.balance -= pay;
  await save();
  renderBanking(); renderStats(); renderMortgageOptions();
  toast(`Paid ${fmtMoney(pay)} toward ${propName}.`);
}

async function makeInvestment(){
  if (blockIfCrisis()) return;
  const category = document.getElementById('investCat').value;
  const amt = Number(document.getElementById('investAmt').value);
  if (!amt || amt<=0 || amt>player.bank.checking) return toast('Invalid amount.', true);
  player.bank.checking -= amt;
  player.investments = player.investments || [];
  player.investments.push({ category, principal: amt, performancePct: 0 });
  await save();
  renderBanking(); renderStats(); renderInvestments();
  document.getElementById('investAmt').value='';
}

async function cashOutInvestment(i){
  const inv = player.investments[i];
  const cur = Math.round(inv.principal * (1+inv.performancePct/100));
  player.bank.checking += cur;
  player.investments.splice(i,1);
  await save();
  renderBanking(); renderStats(); renderInvestments();
  await maybeNetWorthShakeup();
}

async function simulateMarket(){
  (player.investments||[]).forEach(inv=>{
    const delta = (Math.random()*24)-11; // -11% to +13% swing per "week"
    inv.performancePct += delta;
  });
  await save();
  renderInvestments(); renderStats();
  (player.investments||[]).forEach(inv=>{
    if (Math.abs(inv.performancePct) > 20) webhookInvestment(player.name, inv.category, inv.performancePct);
  });
  toast('Market week simulated.');
}

async function startVenture(){
  if (blockIfCrisis()) return;
  const name = document.getElementById('bizName').value.trim();
  const type = document.getElementById('bizType').value;
  const amt = Number(document.getElementById('bizAmt').value);
  if (!name || !amt || amt<=0 || amt>player.bank.checking) return toast('Fill in name and a valid amount.', true);
  player.bank.checking -= amt;
  player.businessVentures = player.businessVentures || [];
  player.businessVentures.push({ name, type, capital: amt, value: amt, status: 'Active' });
  await save();
  renderBanking(); renderStats(); renderVentures();
  document.getElementById('bizName').value=''; document.getElementById('bizAmt').value='';
}

async function checkVenture(i){
  const v = player.businessVentures[i];
  const roll = Math.random();
  if (roll > 0.6){ v.status = 'Thriving'; v.value = Math.round(v.value * 1.35); }
  else if (roll > 0.25){ v.status = 'Active'; v.value = Math.round(v.value * 1.05); }
  else { v.status = 'Struggling'; v.value = Math.round(v.value * 0.7); }
  await save();
  renderVentures(); renderStats();
}

const NEWS_EVENTS = [
  { headline: 'gave an interview praised for its honesty and warmth.', positive: true, rep: 4 },
  { headline: 'was seen supporting a local youth club event.', positive: true, rep: 3 },
  { headline: "made headlines after a lighthearted viral social media moment.", positive: true, rep: 5 },
  { headline: 'is facing questions after a tax filing review.', positive: false, rep: -3 },
  { headline: 'was involved in a minor public dispute that drew media attention.', positive: false, rep: -5 },
  { headline: 'declined to comment on swirling off-field rumors.', positive: false, rep: -1 },
  { headline: "signed autographs for hours after a public appearance.", positive: true, rep: 3 },
];
async function checkClubNews(){
  const last = player.lastNewsCheck ? new Date(player.lastNewsCheck) : null;
  if (last && (Date.now()-last) < NEWS_COOLDOWN_HOURS*3600000){
    const hrs = Math.ceil(NEWS_COOLDOWN_HOURS - (Date.now()-last)/3600000);
    return toast(`No fresh news yet — check back in ${hrs}h.`, true);
  }
  player.lastNewsCheck = Date.now();
  const ev = NEWS_EVENTS[Math.floor(Math.random()*NEWS_EVENTS.length)];
  player.reputation = Math.max(0, Math.min(100, player.reputation + ev.rep));
  player.newsLog = player.newsLog || [];
  player.newsLog.push({ headline: ev.headline, positive: ev.positive, date: Date.now() });
  await save();
  renderReputation(); renderStats();
  webhookPR(player.name, ev.headline, ev.positive);
}

async function maybeNetWorthShakeup(){
  const all = await getAllPlayers();
  const ranked = all.filter(p=>!p.retired).sort((a,b)=> netWorth(b)-netWorth(a));
  const rank = ranked.findIndex(p=>p.username===player.username) + 1;
  if (rank === 1) webhookNetWorthShakeup(player.name, 1);
}

async function retirePlayer(){
  if (!confirm('Retire permanently? This locks your profile as a legacy page.')) return;
  player.retired = true;
  await save();
  webhookRetirement(player.name);
  renderAll();
}

init();
