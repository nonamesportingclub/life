/* ==========================================================================
   NAVBAR.JS — builds the sidebar. Call renderSidebar('dashboard', identity)
   where identity = { type:'player', name, username } or { type:'admin' }.
   ========================================================================== */

function renderSidebar(active, identity){
  const playerLinks = [
    ['dashboard.html','dashboard','My Profile'],
    ['transfermarket.html','transfermarket','Transfer Market'],
    ['contracts.html','contracts','Contract List'],
    ['leaderboard.html','leaderboard','Leaderboards'],
  ];
  const adminLinks = [
    ['admin.html','admin','Admin Panel'],
    ['transfermarket.html','transfermarket','Transfer Market'],
    ['contracts.html','contracts','Contract List'],
    ['leaderboard.html','leaderboard','Leaderboards'],
  ];
  const links = identity.type === 'admin' ? adminLinks : playerLinks;

  const linksHtml = links.map(([href,key,label])=>
    `<a class="nav-link${active===key?' active':''}" href="${href}">${label}</a>`
  ).join('');

  const whoName = identity.type === 'admin' ? 'Club Administrator' : (identity.name || identity.username);
  const whoRole = identity.type === 'admin' ? 'Admin access' : 'Player access';
  const logoutFn = identity.type === 'admin' ? 'adminLogout()' : 'playerLogout()';

  return `
  <nav class="sidebar">
    <div class="crest">
      <div class="crest-mark">NN</div>
      <div class="crest-word">No Name<br>Sporting Club<small>Club Portal</small></div>
    </div>
    <div class="nav-group">
      <div class="nav-label">Navigate</div>
      ${linksHtml}
    </div>
    <div class="sidebar-foot">
      <div class="who-chip">
        <div class="who-avatar">${initials(whoName)}</div>
        <div>
          <div class="who-name">${esc(whoName)}</div>
          <div class="who-role">${whoRole}</div>
        </div>
      </div>
      <button class="logout-btn" onclick="${logoutFn}">Sign out</button>
    </div>
  </nav>`;
}
