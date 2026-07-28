/* ==========================================================================
   SESSION.JS — two separate identities:
     1. PLAYER  — a simple username/password check against the players
        collection. This is a fun profile-lock, NOT strong security
        (see README "Security notes"). Stored in sessionStorage.
     2. ADMIN   — real Firebase Authentication (email/password), so only
        the admin can ever write to the database per firestore.rules.
   ========================================================================== */

function setPlayerSession(username){
  sessionStorage.setItem('nnsc_player', username);
}
function getPlayerSession(){
  return sessionStorage.getItem('nnsc_player');
}
function clearPlayerSession(){
  sessionStorage.removeItem('nnsc_player');
}

function playerLogout(){
  clearPlayerSession();
  window.location.href = 'index.html';
}
function adminLogout(){
  auth.signOut().then(()=> window.location.href = 'index.html');
}

/* Call at the top of any page that requires a logged-in PLAYER */
function requirePlayerSession(){
  const u = getPlayerSession();
  if (!u){
    window.location.href = 'index.html';
    return null;
  }
  return u;
}

/* Call at the top of admin.html — resolves once Firebase reports auth state */
function requireAdminSession(callback){
  auth.onAuthStateChanged(user=>{
    if (!user){
      window.location.href = 'index.html';
    } else {
      callback(user);
    }
  });
}

/* Used by pages open to BOTH players and admin (market, contracts, leaderboard).
   Waits for Firebase's async auth state before deciding, so a real admin
   session isn't mistaken for "logged out" on first paint. */
function resolveIdentity(){
  return new Promise(resolve=>{
    const pUser = getPlayerSession();
    if (pUser){ resolve({ type:'player', username: pUser }); return; }
    const unsub = auth.onAuthStateChanged(user=>{
      unsub();
      resolve(user ? { type:'admin' } : null);
    });
  });
}
