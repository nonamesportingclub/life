/* ==========================================================================
   FIREBASE CONFIG — fill this in with YOUR project's values.
   Get these from: Firebase Console → Project Settings → General →
   "Your apps" → Web app → SDK setup and configuration.
   See README.md for the full step-by-step.
   ========================================================================== */
const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT.appspot.com",
  messagingSenderId: "PASTE_YOUR_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID"
};

/* Discord webhook URL — Server Settings → Integrations → Webhooks → New Webhook.
   Leave blank to disable Discord alerts entirely. */
const DISCORD_WEBHOOK_URL = "";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
