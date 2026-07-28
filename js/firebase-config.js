const firebaseConfig = {
  apiKey: "AIzaSyB6ATqENYiJWaTpebKfMUE3HCDtkryKo-U",
  authDomain: "nnsc-portal.firebaseapp.com",
  projectId: "nnsc-portal",
  storageBucket: "nnsc-portal.firebasestorage.app",
  messagingSenderId: "922946281032",
  appId: "1:922946281032:web:6001131f864525c22b027d"
};

/* Discord webhook URL — Server Settings → Integrations → Webhooks → New Webhook.
   Leave blank to disable Discord alerts entirely. */
const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1531485335266000916/QQt_kKiA2GcE2fra2VsoDyjOOKFAN6lWih8B-ma_QPrOj3e3PnZAT9AwMbT3aVJUuNbi";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();
