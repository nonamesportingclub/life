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

async function sendWebhook(embed){
  if (!DISCORD_WEBHOOK_URL){
    console.warn('Discord webhook URL not set — skipping send.', embed);
    return;
  }
  try{
    await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] })
    });
  }catch(e){
    console.error('Webhook failed', e);
  }
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
