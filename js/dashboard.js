/* ==========================================================================
   DASHBOARD.JS
   ========================================================================== */

const PAYDAY_COOLDOWN_DAYS = 3;   // real-world days between salary collections
const MORTGAGE_SALARY_MULT = 4;   // max loan = salary * this, minus existing debt
const DOWN_PAYMENT_PCT = 0.20;

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

  renderAll();

  const params = new URLSearchParams(window.location.search);
  if (!player.lifeChoice || params.get('onboard')){
    document.getElementById('onboardModal').style.display = 'flex';
  }
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
  renderSponsorships();
  renderReputation();
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

  const sel = document.getElementById('mortgageProp');
  const owned = (player.properties||[]).filter(p=>p.mode==='buy');
  sel.innerHTML = owned.length
    ? owned.map(p=>`<option value="${esc(p.name)}">${esc(p.name)} — ${fmtMoney(p.value)}</option>`).join('')
    : '<option value="">No purchasable properties owned</option>';
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

async function save(){ await savePlayer(player); }

async function chooseLife(choice){
  player.lifeChoice = choice;
  await save();
  document.getElementById('onboardModal').style.display = 'none';
  renderPlayerCard();
}

async function collectPayday(){
  const last = player.lastPayday ? new Date(player.lastPayday) : null;
  if (last && (Date.now()-last) < PAYDAY_COOLDOWN_DAYS*86400000) return;
  player.bank.checking += player.salary / 26; // biweekly-ish slice of annual salary
  player.lastPayday = Date.now();
  await save();
  renderBanking(); renderStats();
  toast(`Payday! ${fmtMoney(player.salary/26)} added to checking.`);
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

async function buyCar(){
  const [name, price] = document.getElementById('carTier').value.split('|');
  const p = Number(price);
  if (p > player.bank.checking) return toast("Not enough in checking for that purchase.", true);
  player.bank.checking -= p;
  player.cars = player.cars || [];
  player.cars.push({ name, value: p, acquired: Date.now() });
  await save();
  renderBanking(); renderStats(); renderCars();
  webhookPurchase(player.name, name, 'car', p);
  await maybeNetWorthShakeup();
}

async function acquireProperty(){
  const [name, price, mode] = document.getElementById('propTier').value.split('|');
  const location = document.getElementById('propLocation').value.trim() || 'Location not disclosed';
  const p = Number(price);
  if (mode === 'buy' && p > player.bank.checking) return toast("Not enough in checking to buy that property.", true);
  if (mode === 'buy') player.bank.checking -= p;
  player.properties = player.properties || [];
  player.properties.push({ name, value: mode==='buy'?p:0, location, mode: mode==='buy'?'Owned':'Renting', acquired: Date.now() });
  await save();
  renderBanking(); renderStats(); renderProperties();
  webhookPurchase(player.name, `${name} (${location})`, 'property', p);
  await maybeNetWorthShakeup();
}

async function applyMortgage(){
  const propName = document.getElementById('mortgageProp').value;
  if (!propName) return toast('Buy a property first.', true);
  const prop = (player.properties||[]).find(p=>p.name===propName);
  if (!prop) return;

  const existingDebt = (player.mortgages||[]).filter(m=>m.status==='Approved').reduce((s,m)=>s+m.balance,0);
  const maxLoan = player.salary * MORTGAGE_SALARY_MULT - existingDebt;
  const loanNeeded = prop.value * (1 - DOWN_PAYMENT_PCT);
  const downPayment = prop.value * DOWN_PAYMENT_PCT;

  let approved, reason;
  if (loanNeeded > maxLoan){
    approved = false; reason = 'requested loan exceeds what current salary supports against existing debt';
  } else if (downPayment > player.bank.checking){
    approved = false; reason = "insufficient checking balance for the down payment";
  } else {
    approved = true; reason = 'salary and existing debt load cleared underwriting';
  }

  const record = {
    property: propName, status: approved ? 'Approved' : 'Denied', reason,
    balance: approved ? loanNeeded : 0,
    monthly: approved ? Math.round(loanNeeded/240) : 0,
    date: Date.now()
  };
  if (approved) player.bank.checking -= downPayment;
  player.mortgages = player.mortgages || [];
  player.mortgages.push(record);
  await save();
  renderBanking(); renderStats(); renderMortgageOptions();
  webhookMortgage(player.name, propName, approved, approved ? null : reason);
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
