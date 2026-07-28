/* ==========================================================================
   WEBHOOKS.JS — sends Discord embeds for club events.
   Design rule: NEVER include exact dollar figures. Everything is phrased
   like transfer-journalism / gossip-column language, using tiers instead
   of numbers, so the Discord feed reads like real football media rather
   than a leaked spreadsheet.
   ========================================================================== */

function magnitudeWord(n){
  const abs = Math.abs(n);
  if (abs >= 5000000) return "eye-watering";
  if (abs >= 1000000) return "serious";
  if (abs >= 250000)  return "considerable";
  if (abs >= 50000)   return "tidy";
  return "modest";
}
function trendWord(pct){
  if (pct >= 15) return "surging";
  if (pct >= 4)  return "climbing steadily";
  if (pct >= -4) return "holding steady";
  if (pct >= -15) return "sliding";
  return "in free fall";
}

const WEBHOOK_MIN_INTERVAL_MS = 1500;
let _webhookQueue = Promise.resolve();
let _lastWebhookSend = 0;

async function sendWebhook(embed){
  if (!DISCORD_WEBHOOK_URL){
    console.warn('Discord webhook URL not set — skipping send.', embed);
    return;
  }
  // Chained onto a queue so sends are always spaced at least WEBHOOK_MIN_INTERVAL_MS
  // apart, no matter how many calls fire back-to-back from the app.
  _webhookQueue = _webhookQueue.then(async () => {
    const wait = _lastWebhookSend + WEBHOOK_MIN_INTERVAL_MS - Date.now();
    if (wait > 0) await new Promise(r => setTimeout(r, wait));
    _lastWebhookSend = Date.now();
    try{
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ embeds: [embed] })
      });
    }catch(e){
      console.error('Webhook failed', e);
    }
  });
  return _webhookQueue;
}

const GOLD = 0xC6A15B;

function webhookPurchase(playerName, itemName, category, amount){
  return sendWebhook({
    title: "💰 Lifestyle Update",
    description: `**${playerName}** has added to their ${category} collection — sources describe the ${magnitudeWord(amount)} addition, a **${itemName}**, as a statement piece.`,
    color: GOLD
  });
}
function webhookMortgage(playerName, propertyName, approved, reason){
  return sendWebhook({
    title: approved ? "🏦 Mortgage Approved" : "🏦 Mortgage Denied",
    description: approved
      ? `**${playerName}**'s bid on **${propertyName}** has cleared with lenders. Move-in expected soon.`
      : `**${playerName}**'s financing for **${propertyName}** has hit a snag. ${reason ? `Word is it came down to: _${reason}_.` : ''}`,
    color: approved ? 0x4E9A6A : 0xB5473A
  });
}
function webhookInvestment(playerName, category, pct){
  return sendWebhook({
    title: "📈 Portfolio Watch",
    description: `**${playerName}**'s ${category} position is ${trendWord(pct)} this week, per people close to the account.`,
    color: pct >= 0 ? 0x4E9A6A : 0xB5473A
  });
}
function webhookNetWorthShakeup(playerName, rank){
  return sendWebhook({
    title: "🏆 Leaderboard Shakeup",
    description: rank === 1
      ? `There's a new richest player in the squad: **${playerName}**.`
      : `**${playerName}** has climbed to **#${rank}** on the club's net worth table.`,
    color: GOLD
  });
}
function webhookSponsorship(playerName, brand, tier){
  return sendWebhook({
    title: "⚽ Sponsorship Signed",
    description: `**${playerName}** has agreed a new **${tier}** partnership with **${brand}**.`,
    color: GOLD
  });
}
function webhookLifeEvent(playerName, headline, blurb){
  return sendWebhook({
    title: `🎙️ ${headline}`,
    description: `**${playerName}** — ${blurb}`,
    color: 0x8A93A6
  });
}
function webhookRumor(playerName, club, interestPct){
  const tier = interestPct >= 80 ? "advanced talks" : interestPct >= 50 ? "genuine interest" : "on the radar";
  return sendWebhook({
    title: "📰 Transfer Rumor",
    description: `Sources indicate **${club}** are showing ${tier} in **${playerName}**.`,
    color: GOLD
  });
}
function webhookTransferInterest(playerName, club, pct){
  return sendWebhook({
    title: "🚨 Transfer Update",
    description: `**${playerName}** has attracted fresh interest from **${club}**, described as **${pct}%** genuine.`,
    color: GOLD
  });
}
function webhookPR(playerName, headline, positive){
  return sendWebhook({
    title: positive ? "📣 Positive Press" : "📣 PR Incident",
    description: `**${playerName}** — ${headline}`,
    color: positive ? 0x4E9A6A : 0xB5473A
  });
}
function webhookCharity(playerName, cause){
  return sendWebhook({
    title: "🤝 Community Update",
    description: `**${playerName}** has made a contribution supporting **${cause}**.`,
    color: 0x4E9A6A
  });
}
function webhookRetirement(playerName){
  return sendWebhook({
    title: "🎗️ Retirement Announced",
    description: `**${playerName}** has officially called time on their career at No Name Sporting Club. The archives are open on their legacy page.`,
    color: GOLD
  });
}
function webhookGamble(playerName, game, won, amount){
  return sendWebhook({
    title: won ? "🎰 Casino Night" : "🎰 Casino Night",
    description: won
      ? `**${playerName}** walked away from the ${game} table with a ${magnitudeWord(amount)} win.`
      : `**${playerName}** had a rough night at the ${game} table, dropping a ${magnitudeWord(amount)} sum.`,
    color: won ? 0x4E9A6A : 0xB5473A
  });
}
function webhookDeclareInterest(playerName, club){
  return sendWebhook({
    title: "📰 Player Declares Interest",
    description: `**${playerName}** has publicly expressed interest in a move to **${club}**.`,
    color: GOLD
  });
}
function webhookMarriage(playerName, partnerName){
  return sendWebhook({
    title: "💍 Wedding Bells",
    description: `**${playerName}** has married **${partnerName}**. The club wishes them well.`,
    color: GOLD
  });
}
function webhookEngagement(playerName, partnerName){
  return sendWebhook({
    title: "💌 Engagement Announced",
    description: `**${playerName}** is engaged to **${partnerName}**.`,
    color: GOLD
  });
}
function webhookDivorce(playerName, partnerName){
  return sendWebhook({
    title: "💔 Divorce Announced",
    description: `**${playerName}** and **${partnerName}** have finalized their divorce. Terms are described as **private**.`,
    color: 0xB5473A
  });
}
function webhookBaby(playerName, babyName){
  return sendWebhook({
    title: "👶 Family News",
    description: `**${playerName}** and their partner have welcomed a new addition to the family: **${babyName}**.`,
    color: GOLD
  });
}
function webhookBankruptcy(playerName){
  return sendWebhook({
    title: "⚠️ Financial Restructuring",
    description: `**${playerName}** has filed for bankruptcy protection after a period of financial strain. Assets have been restructured.`,
    color: 0xB5473A
  });
}
function webhookScandal(playerName, headline){
  return sendWebhook({
    title: "🔥 Scandal",
    description: `**${playerName}** — ${headline}`,
    color: 0xB5473A
  });
}
function webhookExpense(playerName, headline, amount){
  return sendWebhook({
    title: "🧾 Unexpected Expense",
    description: `**${playerName}** — ${headline}. Described as a **${magnitudeWord(amount)}** hit to the wallet.`,
    color: 0xB5473A
  });
}
function webhookClubCreated(founderName, clubName, category){
  return sendWebhook({
    title: "🏛️ New Club Founded",
    description: `**${founderName}** has founded a new club: **${clubName}** (${category}). Open to any player who wants to join.`,
    color: GOLD
  });
}
