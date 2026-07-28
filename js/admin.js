/* ==========================================================================
   ADMIN.JS
   ========================================================================== */

let roster = [];
let current = null; // player object currently loaded in the form

requireAdminSession(async ()=>{
  document.getElementById('shell').innerHTML =
    renderSidebar('admin', { type:'admin' }) +
    document.getElementById('mainTemplate').innerHTML;
  await refreshRoster();
  newPlayer();
});

async function refreshRoster(){
  roster = await getAllPlayers();
  const sel = document.getElementById('rosterSelect');
  sel.innerHTML = '<option value="">— New Player —</option>' +
    roster.map(p=>`<option value="${esc(p.username)}">${esc(p.name)} (${esc(p.username)})</option>`).join('');
}

function newPlayer(){
  current = blankPlayer('');
  document.getElementById('rosterSelect').value = '';
  fillForm(current);
}

function loadIntoForm(username){
  if (!username){ newPlayer(); return; }
  current = roster.find(p=>p.username===username);
  fillForm(current);
}

function fillForm(p){
  document.getElementById('f_username').value = p.username || '';
  document.getElementById('f_username').disabled = !!(p.username);
  document.getElementById('f_password').value = p.password || '';
  document.getElementById('f_name').value = p.name || '';
  document.getElementById('f_position').value = p.position || '';
  document.getElementById('f_age').value = p.age || '';
  document.getElementById('f_team').value = p.team || 'No Name Sporting Club';
  document.getElementById('f_ovr').value = p.ovr || '';
  document.getElementById('f_reputation').value = p.reputation ?? 60;
  document.getElementById('f_marketValue').value = p.marketValue || '';
  document.getElementById('f_transferStatus').value = p.transferStatus || 'Not listed';
  document.getElementById('f_contractStart').value = p.contract?.start || '';
  document.getElementById('f_contractYears').value = p.contract?.years || '';
  document.getElementById('f_salary').value = p.salary || '';
  document.getElementById('f_releaseClause').value = p.contract?.releaseClause || '';
  document.getElementById('f_bonuses').value = p.contract?.bonuses || '';

  document.getElementById('interestRows').innerHTML = '';
  (p.interestedClubs||[]).forEach(c=>addInterestRow(c.club, c.percent));
  document.getElementById('careerRows').innerHTML = '';
  (p.careerHistory||[]).forEach(h=>addCareerRow(h.year, h.event));
  document.getElementById('sponsorRows').innerHTML = '';
  (p.sponsorships||[]).forEach(s=>addSponsorRow(s.brand, s.tier));
}

function addInterestRow(club='', pct=50){
  const div = document.createElement('div');
  div.className = 'field-row';
  div.style.alignItems = 'flex-end';
  div.innerHTML = `
    <div><label>Club</label><input class="intClub" value="${esc(club)}" placeholder="Club name"></div>
    <div style="display:flex;gap:8px;">
      <div style="flex:1;"><label>Interest %</label><input class="intPct" type="number" min="0" max="100" value="${pct}"></div>
      <button type="button" class="btn btn-sm btn-ghost" style="margin-bottom:14px;" onclick="this.closest('.field-row').remove()">✕</button>
    </div>`;
  document.getElementById('interestRows').appendChild(div);
}
function addCareerRow(year='', event=''){
  const div = document.createElement('div');
  div.className = 'field-row';
  div.style.alignItems = 'flex-end';
  div.innerHTML = `
    <div><label>Year</label><input class="carYear" value="${esc(year)}" placeholder="2025"></div>
    <div style="display:flex;gap:8px;">
      <div style="flex:1;"><label>Event</label><input class="carEvent" value="${esc(event)}" placeholder="Joined the club"></div>
      <button type="button" class="btn btn-sm btn-ghost" style="margin-bottom:14px;" onclick="this.closest('.field-row').remove()">✕</button>
    </div>`;
  document.getElementById('careerRows').appendChild(div);
}
function addSponsorRow(brand='', tier='Grassroots'){
  const div = document.createElement('div');
  div.className = 'field-row';
  div.style.alignItems = 'flex-end';
  div.innerHTML = `
    <div><label>Brand</label><input class="sponBrand" value="${esc(brand)}" placeholder="Nike"></div>
    <div style="display:flex;gap:8px;">
      <div style="flex:1;"><label>Tier</label>
        <select class="sponTier">
          ${['Grassroots','Local','Mid-market','Elite'].map(t=>`<option ${t===tier?'selected':''}>${t}</option>`).join('')}
        </select>
      </div>
      <button type="button" class="btn btn-sm btn-ghost" style="margin-bottom:14px;" onclick="this.closest('.field-row').remove()">✕</button>
    </div>`;
  document.getElementById('sponsorRows').appendChild(div);
}

async function submitPlayer(e){
  e.preventDefault();
  const username = document.getElementById('f_username').value.trim();
  if (!username) return toast('Username is required.', true);

  const p = current && current.username === username ? current : blankPlayer(username);
  p.username = username;
  p.password = document.getElementById('f_password').value;
  p.name = document.getElementById('f_name').value.trim();
  p.position = document.getElementById('f_position').value.trim();
  p.age = Number(document.getElementById('f_age').value) || 0;
  p.team = document.getElementById('f_team').value.trim();
  p.ovr = Number(document.getElementById('f_ovr').value) || 0;
  p.reputation = Number(document.getElementById('f_reputation').value) || 0;
  p.marketValue = Number(document.getElementById('f_marketValue').value) || 0;
  p.transferStatus = document.getElementById('f_transferStatus').value;
  p.contract = {
    start: document.getElementById('f_contractStart').value,
    years: Number(document.getElementById('f_contractYears').value) || 0,
    releaseClause: Number(document.getElementById('f_releaseClause').value) || 0,
    bonuses: document.getElementById('f_bonuses').value.trim()
  };
  p.salary = Number(document.getElementById('f_salary').value) || 0;

  p.interestedClubs = [...document.querySelectorAll('#interestRows .field-row')].map(row=>({
    club: row.querySelector('.intClub').value.trim(),
    percent: Number(row.querySelector('.intPct').value)||0
  })).filter(c=>c.club);

  p.careerHistory = [...document.querySelectorAll('#careerRows .field-row')].map(row=>({
    year: row.querySelector('.carYear').value.trim(),
    event: row.querySelector('.carEvent').value.trim()
  })).filter(c=>c.event);

  const prevSponsorCount = (p.sponsorships||[]).length;
  const newSponsors = [...document.querySelectorAll('#sponsorRows .field-row')].map(row=>({
    brand: row.querySelector('.sponBrand').value.trim(),
    tier: row.querySelector('.sponTier').value,
    since: Date.now()
  })).filter(s=>s.brand);

  // preserve original "since" dates where a sponsor already existed
  const oldByBrand = Object.fromEntries((p.sponsorships||[]).map(s=>[s.brand, s.since]));
  newSponsors.forEach(s=>{ if (oldByBrand[s.brand]) s.since = oldByBrand[s.brand]; });
  p.sponsorships = newSponsors;

  if (!p.bank) p.bank = { checking:0, savings:0 };
  ['cars','properties','investments','mortgages','businessVentures','charityLog','newsLog'].forEach(k=>{
    if (!p[k]) p[k] = [];
  });

  await savePlayer(p);

  if (newSponsors.length > prevSponsorCount){
    const added = newSponsors.slice(prevSponsorCount);
    added.forEach(s=> webhookSponsorship(p.name, s.brand, s.tier));
  }

  toast('Player saved.');
  current = p;
  await refreshRoster();
  document.getElementById('rosterSelect').value = p.username;
  document.getElementById('f_username').disabled = true;
}

async function removePlayer(){
  if (!current || !current.username) return toast('Select a player first.', true);
  if (!confirm(`Delete ${current.name}? This can't be undone.`)) return;
  await deletePlayer(current.username);
  toast('Player deleted.');
  await refreshRoster();
  newPlayer();
}

async function negotiate(outcome){
  if (!current || !current.username) return toast('Select a player first.', true);
  const salary = Number(document.getElementById('negSalary').value);
  const years = Number(document.getElementById('negYears').value);
  if (!salary || !years) return toast('Enter proposed salary and years.', true);

  if (outcome === 'Accepted'){
    current.salary = salary;
    current.contract = { ...current.contract, start: new Date().toISOString().slice(0,10), years };
    await savePlayer(current);
    fillForm(current);
    toast(`${current.name} accepted the new terms.`);
  } else {
    toast(`${current.name} rejected the offer.`);
  }
}

async function postRumor(){
  if (!current || !current.name) return toast('Select a player first.', true);
  const club = document.getElementById('rumorClub').value.trim();
  const pct = Number(document.getElementById('rumorPct').value);
  if (!club || !pct) return toast('Enter a club and interest %.', true);

  await db.collection('rumors').add({
    player: current.username, headline: `${club} showing interest in ${current.name}`, date: Date.now()
  });
  await webhookRumor(current.name, club, pct);
  document.getElementById('rumorClub').value=''; document.getElementById('rumorPct').value='';
  toast('Rumor posted.');
}

async function postPR(){
  if (!current || !current.name) return toast('Select a player first.', true);
  const headline = document.getElementById('prHeadline').value.trim();
  const positive = document.getElementById('prType').value === 'positive';
  if (!headline) return toast('Enter a headline.', true);

  current.newsLog = current.newsLog || [];
  current.newsLog.push({ headline, positive, date: Date.now() });
  current.reputation = Math.max(0, Math.min(100, current.reputation + (positive ? 4 : -4)));
  await savePlayer(current);
  await webhookPR(current.name, headline, positive);
  document.getElementById('prHeadline').value='';
  toast('Incident logged.');
}
