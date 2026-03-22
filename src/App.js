import { useState, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');`;

const CSS = `
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #f0f2f5; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ticker {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes barFill {
    from { width: 0%; }
    to   { width: var(--w); }
  }
  @keyframes blink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.25; }
  }

  .fade-up   { animation: fadeUp 0.35s ease both; }
  .fade-up-1 { animation: fadeUp 0.35s 0.06s ease both; }
  .fade-up-2 { animation: fadeUp 0.35s 0.12s ease both; }
  .fade-up-3 { animation: fadeUp 0.35s 0.18s ease both; }

  .ticker-inner { animation: ticker 35s linear infinite; }
  .bar-fill { animation: barFill 0.9s cubic-bezier(0.16,1,0.3,1) both; }
  .red-blink { animation: blink 1.2s ease infinite; }

  .cal-row   { transition: background 0.12s; cursor: pointer; user-select: none; }
  .cal-row:hover   { background: #f8f9fb !important; }
  .driver-row { transition: background 0.12s; cursor: pointer; user-select: none; }
  .driver-row:hover { background: #f8f9fb !important; }
  .mkt-btn { transition: all 0.15s ease; cursor: pointer; border: none; outline: none; }
  .mkt-btn:hover { box-shadow: 0 2px 12px rgba(0,0,0,0.1); transform: translateY(-1px); }

  .accordion-body {
    overflow: hidden;
    transition: max-height 0.32s cubic-bezier(0.16,1,0.3,1), opacity 0.22s ease;
  }
  .accordion-body.open   { max-height: 440px; opacity: 1; }
  .accordion-body.closed { max-height: 0; opacity: 0; }

  .chevron { display: inline-block; transition: transform 0.2s ease; }
  .chevron.open { transform: rotate(180deg); }

  ::-webkit-scrollbar       { width: 4px; }
  ::-webkit-scrollbar-track { background: #f0f2f5; }
  ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
`;

/* ── HOOK: window size ───────────────────────────────────────────── */
function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return width;
}

/* ── SVG ICONS ──────────────────────────────────────────────────── */
const GoldIcon = ({ size = 32 }) => (
  <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" style={{ borderRadius: 8, flexShrink: 0, display: "block" }}>
    <path d="M0 0h56v56H0V0z" fill="#D69A00"/>
    <path d="M21.248 21.555h13.784l-2.01-5.393a1.17 1.17 0 00-.41-.553l-11.364 5.946zm-.038-6.401C21.698 13.842 22.772 13 23.956 13h8.151c1.184 0 2.258.842 2.747 2.154l2.009 5.393c.603 1.618-.371 3.453-1.831 3.453h-14c-1.46 0-2.433-1.835-1.831-3.453l2.01-5.393h-.001zM10.235 35.555h13.757l-2.01-5.393a1.171 1.171 0 00-.41-.553l-11.337 5.946zm-.039-6.401C10.685 27.842 11.76 27 12.943 27h8.124c1.184 0 2.259.842 2.747 2.154l2.009 5.393c.603 1.618-.37 3.453-1.831 3.453H10.017c-1.46 0-2.433-1.835-1.83-3.453l2.01-5.393zm35.89 6.401h-13.85l11.43-5.945c.179.126.323.316.413.553l2.008 5.392zM34.945 27c-1.184 0-2.259.842-2.747 2.154l-2.009 5.393c-.603 1.618.37 3.453 1.831 3.453h14.067c1.46 0 2.433-1.835 1.83-3.453l-2.01-5.393C45.422 27.842 44.348 27 43.164 27h-8.22z" fill="#fff"/>
  </svg>
);

const SilverIcon = ({ size = 32 }) => (
  <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" style={{ borderRadius: 8, flexShrink: 0, display: "block" }}>
    <path d="M0 0h56v56H0V0z" fill="#ADABB8"/>
    <path d="M21.247 21.555h13.785l-2.01-5.393a1.171 1.171 0 00-.41-.553l-11.365 5.946zm-.038-6.401C21.698 13.842 22.772 13 23.956 13h8.15c1.185 0 2.26.842 2.748 2.154l2.009 5.393c.602 1.618-.371 3.453-1.831 3.453h-14c-1.46 0-2.434-1.835-1.832-3.453l2.01-5.393zM10.234 35.555h13.757l-2.008-5.393a1.17 1.17 0 00-.412-.553l-11.337 5.946zm-.038-6.401C10.685 27.842 11.76 27 12.943 27h8.124c1.184 0 2.258.842 2.747 2.154l2.009 5.393C26.426 36.165 25.452 38 23.99 38H10.017c-1.46 0-2.433-1.835-1.83-3.453l2.01-5.393zm35.89 6.401h-13.85l11.43-5.945c.178.126.323.316.412.553l2.008 5.392zM34.943 27c-1.184 0-2.258.842-2.746 2.154l-2.01 5.393C29.586 36.165 30.559 38 32.02 38h14.066c1.46 0 2.434-1.835 1.831-3.453l-2.01-5.393C45.422 27.842 44.346 27 43.163 27h-8.22z" fill="#fff"/>
  </svg>
);

const OilIcon = ({ size = 32 }) => (
  <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 56" style={{ borderRadius: 8, flexShrink: 0, display: "block" }}>
    <path fill="url(#oil_g)" d="M0 0h56v56H0z"/>
    <path d="M38.889 31.111c0 6.845-4.9 12.445-10.889 12.445-5.989 0-10.889-5.6-10.889-12.445C17.111 24.267 28 9.333 28 9.333s10.889 14.934 10.889 21.778z" fill="#fff"/>
    <defs>
      <linearGradient id="oil_g" x1="10.418" y1="9.712" x2="68.147" y2="76.017" gradientUnits="userSpaceOnUse">
        <stop stopColor="#1A1E21"/><stop offset="1" stopColor="#06060A"/>
      </linearGradient>
    </defs>
  </svg>
);

const NasIcon = ({ size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" xmlns="http://www.w3.org/2000/svg" style={{ borderRadius: 8, flexShrink: 0, display: "block" }}>
    <path fill="#0091BA" d="M0 0h56v56H0z"/>
    <path d="M13.06 36h3.3V20h-3.3L9 23.04v2.88l4-2.68h.06V36ZM26.02 36c3.97 0 6.38-3.08 6.38-8v-.02c0-4.91-2.4-7.98-6.38-7.98s-6.39 3.07-6.39 7.98v.03c0 4.91 2.41 7.99 6.39 7.99Zm0-2.6c-1.96 0-3.08-2-3.08-5.4v-.02c0-3.4 1.12-5.39 3.08-5.39 1.95 0 3.07 2 3.07 5.4V28c0 3.4-1.12 5.4-3.07 5.4ZM40.61 36C44.6 36 47 32.92 47 28v-.02c0-4.91-2.41-7.98-6.39-7.98-3.97 0-6.38 3.07-6.38 7.98v.03c0 4.91 2.4 7.99 6.38 7.99Zm0-2.6c-1.95 0-3.07-2-3.07-5.4v-.02c0-3.4 1.12-5.39 3.07-5.39 1.96 0 3.08 2 3.08 5.4V28c0 3.4-1.12 5.4-3.08 5.4Z" fill="#fff"/>
  </svg>
);

const BtcIcon = ({ size = 32 }) => (
  <div style={{ width: size, height: size, borderRadius: 8, background: "#F7931A", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <span style={{ color: "#fff", fontWeight: 800, fontSize: size * 0.45, fontFamily: "Arial, sans-serif" }}>₿</span>
  </div>
);

/* ── DATA ───────────────────────────────────────────────────────── */
const markets = [
  {
    name: "XAUUSD", label: "Gold", Icon: GoldIcon,
    price: "$4,650.30", change: "−10.2% wk", changeUp: false,
    bias: "PARADOX / OVERSOLD WATCH", biasColor: "#d97706", biasBg: "#fffbeb", biasBorder: "#fde68a",
    accent: "#D69A00", sentiment: 35,
    keyLevel: "Support $4,533–$4,540  ·  Key floor $4,319  ·  Resistance $4,791–$4,815 → $4,996",
    watch: "Closed $4,650.30 — down ~$950 from January's $5,597 ATH in under 2 months. This is gold's worst monthly performance since October 2008, driven by a counterintuitive paradox: the Iran war IS driving oil to $98, which IS keeping inflation expectations elevated, which IS killing rate-cut hopes, which IS making the dollar and bonds more attractive than non-yielding gold. The recovery thesis rests entirely on Friday's PCE print. Core PCE cooling toward 2.7% or below = gold reclaims $4,791–$4,815 fast. Hot PCE above 3.0% = retest $4,319–$4,533 support. Do not add new longs above $4,680 without a PCE catalyst.",
    drivers: [
      { short: "☢️ The War Paradox: Gold crashing DURING active war — oil inflation is the killer", detail: "This is the defining market paradox of early 2026. Gold, the ultimate safe-haven, is down 17% from its January high WHILE the US and Israel are actively at war with Iran. The mechanism: $98 WTI oil is feeding directly into inflation expectations. Core PCE is tracking toward 2.9–3.0%. Higher inflation → Fed cannot cut rates → real yields stay elevated → dollar strengthens → gold, which yields nothing, loses its appeal against rate-bearing assets. The war has turned gold's own tailwind (geopolitical fear) into a headwind (inflation that prevents rate cuts). This is a genuine dislocation and it will resolve — the question is whether PCE Friday provides the trigger." },
      { short: "📊 PCE Friday Mar 27 — THE recovery catalyst. Core PCE 2.7% or below = gold rips", detail: "The February PCE price index (Fed's preferred inflation measure) releases Friday March 27. This is the single most important data point for gold this week. The critical level: core PCE at or below 2.7% YoY would represent meaningful progress toward the 2% target and would force the market to reprice Fed cut expectations forward. That repricing directly translates to lower real yields, a weaker dollar, and a gold recovery toward $4,791–$4,815. Core PCE at 2.9%+ confirms the stagflation narrative and gold stays under pressure. Watch the services ex-energy component specifically — that's what the Fed watches." },
      { short: "🛡️ $4,533–$4,540 is the 61.8% retracement — this is the structural floor", detail: "The $4,533–$4,540 zone represents the 61.8% Fibonacci retracement of the entire October 2025 rally to the $5,597 January 2026 high. This is a technically critical level. A sustained daily close below this zone would be a bearish structural break, shifting the medium-term target to $4,319 and potentially $4,224–$4,251. The fact that gold held this level intraday during last week's worst sessions is a tentative positive. RSI on the weekly chart is at its lowest since November 2024 — deeply oversold on a multi-month basis — which historically precedes violent relief rallies." },
      { short: "🏛️ G7 SPR Release (300–400M barrels) — if it pushes oil below $85, gold rips", detail: "The G7 is actively discussing a coordinated release of 300–400M barrels from Strategic Petroleum Reserves, with the US, UK, and Japan already expressing support. If this release materializes and drives WTI back toward $80–$82, the entire chain that's crushing gold reverses: lower oil → lower inflation expectations → rate cut odds revive → real yields fall → gold rallies. Watch for any G7 announcement this week — it would be the most bullish catalyst for gold possible without being PCE-related. This is the tail-risk upside scenario for gold bulls." },
      { short: "🏦 Central bank bid (China PBoC) still active at $4,500–$4,600 — sovereign floor", detail: "Despite the brutal selloff, China's PBoC and other sovereign buyers have been accumulating at $4,500–$4,600 levels. This central bank bid is the structural floor that distinguishes the current dislocation from a genuine bear market. Gold ETF inflows of $16 billion in January–February 2026 (while Bitcoin ETFs saw $4.5B in outflows) confirm that institutional demand for the metal remains strong. The current weakness is technical and macro-driven — not a fundamental deterioration in demand. Sovereign accumulation at $4,500–$4,600 means the downside is capped unless PCE delivers a major upside shock." },
      { short: "⚡ Post-FOMC Stagflation SEP: Fed raised inflation projections, cut growth — worst case for gold short-term", detail: "At the March 17–18 FOMC meeting, the Fed held rates at 3.50–3.75% and released an updated Summary of Economic Projections (SEP) that confirmed the stagflationary shift: inflation forecasts revised higher (partly due to $98 oil and tariff passthrough), growth forecasts cut. Some Fed officials are now discussing rate hikes rather than cuts by late 2026. CME FedWatch has started pricing a non-trivial probability of a rate hike by October. This hawkish pivot is the primary reason gold has collapsed — until the PCE trend convincingly re-decelerates, the macro backdrop remains hostile for the metal." },
    ],
  },
  {
    name: "XAGUSD", label: "Silver", Icon: SilverIcon,
    price: "$69.66", change: "−9.3% wk", changeUp: false,
    bias: "BEARISH / AVOID", biasColor: "#dc2626", biasBg: "#fef2f2", biasBorder: "#fecaca",
    accent: "#ADABB8", sentiment: 18,
    keyLevel: "Support $65–$67  ·  Key floor $60  ·  Resistance $74–$75 → $80",
    watch: "Closed $69.66 — 3rd consecutive weekly decline, now negative YTD. Silver is being hit by a dual wrecking ball: (1) the monetary channel — no rate cuts due to $98 oil keeping inflation elevated, and (2) the industrial demand channel — Iran's attacks on Qatar's LNG facilities signal a broader Gulf energy disruption that raises manufacturing cost and demand concerns globally. Silver needs BOTH a soft PCE on Friday AND signs of oil price de-escalation before it can stabilize. Until then, this is a falling knife. Do not catch it above $71. Buy zone is $65–$67 support IF PCE cooperates.",
    drivers: [
      { short: "💀 Dual wrecking ball: monetary headwind (no cuts) + industrial demand fears (LNG attack)", detail: "Silver is uniquely exposed to both of the dominant macro forces crushing markets right now. The monetary channel: oil at $98 keeps core inflation elevated, the Fed cannot cut rates, real yields stay high, non-yielding silver underperforms bonds. The industrial channel: Iran's attack on Qatar's LNG facilities — destroying an estimated 17% of QatarEnergy's LNG export capacity — signals broader Gulf industrial disruption. Silver's ~55% industrial use (solar panels, EVs, electronics) means any demand shock from energy market disruption directly hits silver prices. Gold can recover via safe-haven demand; silver cannot if industry is hurting." },
      { short: "🇶🇦 Qatar LNG attack = industrial demand shock — silver's industrial end-market is at risk", detail: "Iran's strikes destroying an estimated 17% of Qatar's LNG export capacity is a new and underappreciated driver of silver weakness. Qatar supplies ~20% of global LNG. LNG disruptions raise energy costs for industrial manufacturers across Europe and Asia — the same manufacturers that buy silver for solar panels, EV batteries, and semiconductor production. When industrial energy costs spike, manufacturers cut production and reduce input purchases. Silver, as an industrial input, sees demand fall. This is a second-order effect of the Iran war that gold doesn't face. Until Qatar LNG is restored, silver has a persistent industrial demand overhang." },
      { short: "📊 PCE Friday is silver's only near-term rescue — needs core PCE ≤2.7% to stabilize", detail: "Silver's recovery from $69.66 requires a clear dovish signal from Friday's PCE data. Core PCE at 2.7% or below would force the market to reprice rate-cut expectations earlier, reducing the monetary headwind on silver. But even a soft PCE won't fully resolve silver's industrial demand problem — you'd need to also see oil declining (via G7 SPR release or Iran talks progress) for the full recovery thesis to work. Silver's bar for recovery is higher than gold's: you need both a monetary catalyst AND an industrial demand stabilizer. Neither is guaranteed this week." },
      { short: "📉 Gold/silver ratio spiking to multi-month highs — historically a violent mean-reversion setup", detail: "The gold/silver ratio has widened sharply as gold at $4,650 holds relative to silver at $69.66. Historically, extreme ratio widening — when gold dramatically outperforms silver — precedes violent silver outperformance once conditions turn. When this ratio does mean-revert, silver typically moves 3–5x faster than gold. The current ratio level suggests silver is historically cheap relative to gold, but 'cheap' doesn't mean 'buy now' — it means the eventual recovery in silver will be faster and larger than in gold, once the PCE and oil catalysts arrive. Patience is the trade here." },
      { short: "🔗 Silver negative YTD — capital destruction alert, positioning extremely light", detail: "Silver turning negative for the year is a signal of structural selling — not just tactical repositioning. Institutional and retail positions in silver have been aggressively reduced. This light positioning is a double-edged sword: very few longs left to shake out (limited further forced selling), but also very few buyers ready to step in quickly. A short squeeze is possible if PCE delivers a dramatic surprise, but sustained recovery requires rebuilding long positioning — a process that takes weeks, not days." },
      { short: "⚠️ $65–$67 is the critical weekly support — a break below means $60 test", detail: "The $65–$67 zone represents the last significant consolidation base before the major 2025 rally. A weekly close below $65 would technically cancel the 2025 bull run in silver and shift the medium-term target to $60 — the pre-breakout level. The risk of a PCE hot print triggering this breakdown is real. Protective stops for any existing silver positions should be tight, and new longs should only be entered at $65–$67 with PCE as the trigger, NOT before the data." },
    ],
  },
  {
    name: "NAS100", label: "Nasdaq 100", Icon: NasIcon,
    price: "$23,898", change: "−2.1% wk", changeUp: false,
    bias: "BEARISH / CAUTION", biasColor: "#dc2626", biasBg: "#fef2f2", biasBorder: "#fecaca",
    accent: "#0091BA", sentiment: 28,
    keyLevel: "Resistance $24,400–$24,600  ·  Support $23,400–$23,500  ·  200-DMA ~$22,800",
    watch: "Closed $23,898 — down ~8.5% from the October 2025 peak of $26,119. VIX at 26.78 signals elevated fear but not panic. The index is caught in a stagflationary vice: oil at $98 keeping inflation high (bearish for multiples), weak government spending (DOGE cuts + war budget reallocation), tariff EPS compression, and a hawkish Fed. PCE Friday is the make-or-break event — soft PCE (≤2.7%) = short-covering rally toward $24,600. Hot PCE (≥3.0%) = accelerated sell toward $23,400 → 200-DMA at $22,800. Do not hold leveraged longs through PCE without defined risk.",
    drivers: [
      { short: "📉 Closed $23,898 — down 8.5% from Oct peak, trend firmly lower with each rally sold", detail: "NAS100 has been in a clear distribution pattern since the October 2025 peak of $26,119. Each attempted rally has been sold — the March 17 bounce to ~$25,400 reversed quickly on the hawkish FOMC outcome. This is textbook distribution behavior: institutional sellers using any strength to reduce positions. The burden of proof is entirely on bulls. With VIX at 26.78, the market is pricing fear but not capitulation — which means there's room for further downside before the bottom is in." },
      { short: "🔥 Stagflation SEP from FOMC = worst possible backdrop for tech multiples", detail: "The March 17–18 FOMC produced a Summary of Economic Projections that shifted decidedly stagflationary: inflation revised up, growth revised down. For NAS100, which trades at elevated P/E multiples, this is a double compression: the discount rate (interest rates) stays high (compressing valuations) while earnings growth expectations fall (compressing the earnings component). P/E compression is slow, grinding, and brutal for high-multiple tech names. Nvidia, Apple, Microsoft, Meta — all face the same headwind of a Fed that WANTS to cut but cannot because oil at $98 is reigniting inflation." },
      { short: "⛽ $98 oil = direct EPS headwind for airlines, logistics, consumer, and cloud names", detail: "Oil at $98 is a direct earnings headwind for approximately 40% of NAS100 components. Airlines like United (already warning on fuel costs) and logistics names face margin compression. Consumer discretionary names see demand softness as energy costs crowd out consumer spending. Even cloud names face higher data center energy costs. The tariff backdrop compounds this — Apple's supply chain, AMD's manufacturing cost base, and consumer electronics margins all face dual pressure from tariffs and energy costs. Sell-side estimates have not yet fully adjusted for $98 sustained oil; expect downward revisions in Q1 earnings season (starting mid-April)." },
      { short: "🤖 AI capex arms race continues but DeepSeek ROI fears persist — multiple compression ongoing", detail: "Alphabet, Meta, and Microsoft have all committed $175–200B+ in combined AI capex for 2026. While bulls see this as demand for Nvidia and cloud infrastructure, bears see it as massive cash burn against uncertain ROI timelines. DeepSeek's demonstration that frontier AI can be built at a fraction of hyperscaler cost has not been fully resolved — investors are still questioning whether $200B in capex is justified when competitors can replicate results at a fraction of the cost. This uncertainty creates a valuation ceiling on AI-exposed names even as the underlying technology continues to advance." },
      { short: "💀 PMI Monday + Consumer Confidence Tuesday — double dose of sentiment data", detail: "Monday's Flash PMI (Manufacturing + Services) and Tuesday's CB Consumer Confidence data provide early-week signals for whether the stagflation narrative is accelerating. Manufacturing PMI has been weak (tariffs, supply chain disruption). A Services PMI print below 50 would confirm the war/oil shock is spreading to the dominant US sector — a major bearish catalyst for NAS100. Consumer confidence at consensus (95.0) or below signals consumer spending is rolling over, directly hitting consumer tech, e-commerce, and advertising revenue guidance. Both prints land before the week's main event (PCE Friday) and could set the tone for Monday-Thursday trading." },
      { short: "🏛️ War budget reallocation + DOGE cuts = gov-tech and defense-tech confusion", detail: "The Iran war is creating conflicting signals for the government/defense tech complex that makes up a meaningful NAS100 weight. On one hand, actual kinetic military spending is accelerating (Raytheon, Lockheed, L3Harris — not NAS100 names). On the other hand, DOGE's civilian federal cuts and the diversion of budget to military ops is compressing IT and cloud spending on the civilian side. Palantir and other gov-tech names that trade in NAS100 face ambiguous guidance into Q1 earnings. The market hasn't priced the full complexity of war + DOGE budget reallocation for tech sector revenue." },
    ],
  },
  {
    name: "BTCUSD", label: "Bitcoin", Icon: BtcIcon,
    price: "$70,343", change: "−7.6% fr wk high", changeUp: false,
    bias: "RESILIENT / WALL OF WORRY", biasColor: "#16a34a", biasBg: "#f0fdf4", biasBorder: "#bbf7d0",
    accent: "#F7931A", sentiment: 48,
    keyLevel: "Support $64,000–$66,000  ·  Key level $63,000  ·  Resistance $73,000–$74,000 → $76,000",
    watch: "Closed $70,343 — this is the single most resilient asset across your entire portfolio since the Iran war began. Bitcoin sold off first (Saturday Feb 28, when traditional markets were closed), absorbed $364M in liquidations, and has since outperformed gold, S&P 500, NAS100, and Asian equities. A rising floor of higher lows ($64,000 → $68,000 → $70,000) is forming against resistance at $73,000–$74,000. The war trade thesis for Bitcoin: if oil de-escalates (G7 SPR, Iran deal, Trump statement) → risk-on surge through $74,000 → $76,000. If oil stays at $98+ and PCE is hot → retest $64,000–$66,000 support. With negative funding rates and extreme fear sentiment, risk/reward favors holding.",
    drivers: [
      { short: "🏆 Bitcoin outperforming EVERYTHING since war began — higher lows forming above $64K", detail: "This is the most important and underappreciated fact in markets right now. Since the US-Israel strikes on Iran began on February 28 (a Saturday, when Bitcoin was the only major liquid market open), BTC has outperformed gold, the S&P 500, Nasdaq 100, and Asian equities. Gold is down 17% from its January high; Bitcoin is down only ~10% from its peak and has repeatedly formed higher lows at $64,000, $67,000, and $70,000. This price resilience in the face of extreme negative headlines is a classic 'wall of worry' dynamic — the best signal of genuine underlying demand." },
      { short: "⚡ Oil is the only variable that matters for BTC: above $80 = headwind, below $80 = breakout", detail: "The institutional consensus on Bitcoin's key macro variable has crystallized: oil price is what determines the near-term direction. Wintermute, Maelstrom, and Apollo Crypto have all independently concluded that sustained Brent above $80 hardens the re-inflation narrative and makes Federal Reserve rate cuts impossible through mid-2026. That rate-cut delay is the primary headwind for Bitcoin through the liquidity channel. Conversely, any sustained move below $80 — whether from G7 SPR release, Iran de-escalation, or Trump comments — directly unlocks the next Bitcoin rally. Watch WTI more than any on-chain metric this week." },
      { short: "📊 ETF outflows collapsed 94% — from $3.8B (Feb) to negligible. Marginal seller exhausted", detail: "Spot Bitcoin ETF net outflows peaked at $3.8B in February 2026 (worst month since launch in January 2024). Year-to-date outflows hit $4.5B total. But the trend is decelerating sharply — weekly outflow pace has dropped dramatically. When the marginal seller is exhausted (near-zero outflows) and price holds above $70,000, a reversal to inflows typically happens fast and violently. Simultaneously, gold ETFs absorbed $16B in inflows over January–February — some of that capital will rotate back into Bitcoin the moment the macro backdrop shifts." },
      { short: "💎 Rising floor: $64K → $68K → $70K. Market buying every dip despite 'extreme fear'", detail: "The Crypto Fear & Greed Index has been in 'extreme fear' territory for weeks — typically a contrarian buy signal. Yet despite extreme fear sentiment, Bitcoin's price action shows systematic buying at every dip. The pattern: BTC sells off on negative headlines (oil spike, Iran escalation) → recovers to a higher low than the previous sell-off → resistance at $73–$74K. This rising floor pattern is the technical signature of accumulation. When the macro trigger (oil de-escalation or soft PCE) arrives, the coiled spring above $70K could release very quickly toward $76K and beyond." },
      { short: "🏛️ US Strategic Bitcoin Reserve — sovereign validation removes the regulatory tail risk permanently", detail: "The establishment of the US Strategic Bitcoin Reserve remains the structural watershed event of 2026. Regardless of short-term price action, sovereign-level recognition by the world's largest economy permanently removes the 'government ban' tail risk that previously deterred institutional allocators. Endowments, pension funds, sovereign wealth funds, and corporate treasuries that were previously sidelined by regulatory uncertainty can now justify Bitcoin allocations. This demand category has barely begun to enter the market. Bitcoin's ATH of $126,000 (October 2025) was largely driven by anticipation of this development; the retracement to $70K is a war-driven reset, not a fundamental reversal." },
      { short: "⚠️ $63,000 is the floor — hot PCE + oil above $100 = retest of this level", detail: "If Friday's PCE prints hot (core PCE ≥3.0%) AND oil stays above $100, Bitcoin could retest the critical $63,000 level. A break below $63,000 on a weekly close would technically shift the bias from 'recovering' to 'extended correction' and could target the $55,000–$60,000 zone that Scenario 2 (prolonged war) analysis identifies. However, the rising floor pattern and exhausted sellers make this the less-likely scenario unless we see a dramatic deterioration in both oil and inflation simultaneously. Position size accordingly — the risk is real but the probability is moderate, not dominant." },
    ],
  },
  {
    name: "USOIL", label: "Crude Oil", Icon: OilIcon,
    price: "$98.22", change: "+7.7% wk rebound", changeUp: true,
    bias: "WAR PREMIUM / BINARY", biasColor: "#7c3aed", biasBg: "#f5f3ff", biasBorder: "#ddd6fe",
    accent: "#374151", sentiment: 72,
    keyLevel: "Support $91–$93  ·  Key floor $85  ·  Resistance $102–$105  ·  Hormuz spike target $115–$120",
    watch: "Closed $98.22 — rebounding after the vicious $120 → $85 roundtrip of March 8–9 (Trump's 'very far ahead' comments crashed oil $35 in a single session). Now back at $98, driven by Iran's attacks on Qatar LNG and ongoing Strait of Hormuz chokehold. US troops reportedly being prepared for deployment. G7 considering 300–400M barrel SPR release — this is the single biggest downside catalyst for oil this week. EIA inventory Wednesday critical. This is not a normal oil trade: set defined stops at $93, accept the binary nature of the position. Do not over-size.",
    drivers: [
      { short: "🇮🇷 Strait of Hormuz chokehold: 20% of global oil still at risk — the $25–30 war premium", detail: "Iran's partial closure of the Strait of Hormuz — the narrow waterway through which roughly 20% of the world's oil supply flows — is the single most important supply-side event in oil markets since the Russia-Ukraine war. At $98, the market is pricing approximately $25–30 of geopolitical risk premium above fundamental fair value of ~$70–72. This premium will stay until one of three things happens: (1) Iran reopens the Strait via deal or defeat, (2) the G7 SPR release overwhelms the supply disruption, or (3) global demand collapses enough to absorb the supply shock. None of these is imminent in the next 5 days." },
      { short: "🇶🇦 Qatar LNG attack = energy complex multi-asset cascade", detail: "Iran's strikes destroying an estimated 17% of Qatar's LNG export capacity is a new escalation that markets are still processing. This is not just an oil story — it is a global energy complex story. LNG disruption raises natural gas prices globally, which raises European industrial energy costs, which slows manufacturing, which reduces oil demand (partially offsetting the supply shock). The secondary effect: higher European energy costs add to global stagflation pressure, reinforcing the Fed's inability to cut rates. This LNG disruption is why oil is recovering even though the Strait of Hormuz is partially functioning." },
      { short: "🚨 US troop deployment being prepared — escalation risk to $115–$120 remains live", detail: "Reports from multiple news agencies indicate the US is actively preparing troop deployment for the Iran theater. This is a significant escalation signal. If ground forces enter, market pricing will shift rapidly from 'air campaign with limited supply disruption' to 'multi-month engagement with sustained Hormuz disruption.' Oil could retrace toward the $115–$120 March 8 spike level. The options market is pricing significant tail risk in crude — do not be short oil without tight stops. The $115–$120 target would represent full Hormuz closure pricing." },
      { short: "🏛️ G7 SPR Release (300–400M barrels) — the biggest single downside catalyst for oil", detail: "The most significant near-term bearish risk for oil is a coordinated G7 Strategic Petroleum Reserve release. The US, UK, and Japan have already expressed support for releasing 300–400M barrels from joint strategic reserves. If the G7 formalizes this announcement this week, oil could drop $12–18 in a session — back toward $80–$85. This is the scenario where the 'Iran war premium' rapidly unwinds and gold, Bitcoin, and NAS100 simultaneously rally hard. Watch for G7 energy ministers' statements or emergency calls this week — this is a scheduled or unscheduled event that could dominate the week." },
      { short: "📊 EIA Inventory Wednesday — Hormuz disruption makes data unpredictable", detail: "Wednesday's EIA weekly inventory report is highly uncertain in the current environment. The Hormuz chokehold has disrupted tanker traffic in ways that won't fully show up in weekly US inventory data for 1–2 reporting lags. Forecast calls for a modest draw, but the real story is in gasoline inventories (summer driving season approaching) and distillate inventories (jet fuel, which airlines are consuming heavily for emergency rerouting around the Gulf). A large unexpected build = short-term oil bearish; a large unexpected draw = $102+ test before PCE." },
      { short: "💡 Trump 'oil prices will drop rapidly when Iran threat is over' — the de-escalation put", detail: "President Trump's statement on March 8 that oil prices 'will drop rapidly' when the 'Iran nuclear threat is over' provided the template for the $120 → $85 crash that day. This 'Trump put' on oil prices creates an asymmetric situation: any further Trump statement suggesting progress in Iran talks or a timeline for resolution = instant $10–15 oil crash = gold and Bitcoin spike = NAS100 short squeeze. Monitor Trump's social media and White House statements over the weekend and during the week — a single sentence can move oil $10 in minutes and cascade across all 5 of your markets simultaneously." },
    ],
  },
];

const calendarEvents = [
  { day: "MON", date: "Mar 23",  event: "S&P Flash PMI (Manufacturing + Services)",    impact: "HIGH",      color: "#f59e0b", note: "First read on March economic health — tariff + war impact",    forecast: "Mfg 52.0  ·  Svcs 53.5",     previous: "Mfg 52.7  ·  Svcs 54.3",     detail: "The flash PMI data provides the first March snapshot of economic activity. Manufacturing has been grinding lower under tariff headwinds and supply-chain disruption from the Iran war (Gulf shipping rerouting). Forecast: Manufacturing 52.0 (prior 52.7). Services 53.5 (prior 54.3). A Manufacturing print below 50 = contraction signal, highly bearish for NAS100. Services staying above 53 = consumer economy still holding. Biggest immediate impact on NAS100 and DXY (which flows through to gold and BTC)." },
  { day: "TUE", date: "Mar 24",  event: "CB Consumer Confidence",                       impact: "MED",       color: "#0ea5e9", note: "Consumer spending health amid oil shock and war anxiety",      forecast: "95.0",                        previous: "98.3",                        detail: "The Conference Board Consumer Confidence index for March. Consensus expects a decline to 95.0 from 98.3, reflecting the psychological impact of $5/gallon gas prices (WTI at $98 feeds through to retail fuel costs), war anxiety, and a labor market that showed -92K NFP in February. A print below 92 would be a major bearish signal for consumer discretionary and NAS100. Watch the expectations subcomponent — this leads consumer spending by 3–6 months." },
  { day: "WED", date: "Mar 25",  event: "EIA Crude Oil Inventories",                     impact: "HIGH",      color: "#f59e0b", note: "Hormuz disruption makes this print especially volatile",      forecast: "−0.8M barrels",               previous: "+3.8M barrels",               detail: "The weekly EIA report arrives at 10:30 AM ET. The prior week showed a +3.8M barrel surprise build, but that data predates the full Hormuz disruption impact on tanker traffic. This week's read is highly uncertain. A draw of 3M+ barrels = bullish for oil, bearish for gold/NAS100/BTC via inflation channel. A build of 2M+ barrels = bearish for oil, relief rally in everything else. Wednesday is also the session where Iran escalation headlines tend to drop overnight, making this the most volatile single session of the week." },
  { day: "THU", date: "Mar 26",  event: "Q4 2025 GDP Final + Durable Goods Orders",     impact: "HIGH",      color: "#f59e0b", note: "Stagflation read: growth confirm + forward demand signal",    forecast: "GDP +2.3% QoQ  ·  DG +0.5%", previous: "GDP +2.3% QoQ  ·  DG +3.1%", detail: "A double header. Q4 2025 GDP final reading (third estimate) expected unchanged at +2.3% QoQ — a confirmation, not a surprise. Watch the GDP Price Deflator within the report for an early PCE signal. February Durable Goods Orders forecast at +0.5% (after a volatile +3.1% in January). Core durable goods ex-aircraft is the cleaner read — weakness here signals business investment is slowing under tariff and war uncertainty, a NAS100 bearish signal." },
  { day: "THU", date: "Mar 26",  event: "US Initial Jobless Claims",                     impact: "MED",       color: "#0ea5e9", note: "Post-NFP labor market trajectory — watch for acceleration",  forecast: "228K",                        previous: "223K",                        detail: "Weekly jobless claims provide the highest-frequency labor market read available. After February's -92K NFP shock, the claims trend becomes critical for understanding whether labor market deterioration is a one-month blip or an accelerating trend. Forecast: 228K (prior 223K). A print above 250K = bad jobs trend confirmed, highly bullish for gold and rate-cut expectations, bearish for NAS100 near-term. Below 215K = labor market resilient, stagflation narrative intensifies (growth holds + inflation stays high = no cuts)." },
  { day: "FRI", date: "Mar 27",  event: "🚨 US FEB PCE Price Index — 8:30 AM ET",        impact: "CRITICAL",  color: "#dc2626", note: "THE week's macro event — Fed's preferred inflation measure",   forecast: "Core +2.8% YoY",              previous: "Core +2.7% YoY",              detail: "THE week's definitive macro event. February PCE (Fed's preferred inflation measure) forecast: Core PCE +2.8% YoY (Jan +2.7%). The oil shock from $98 WTI and ongoing tariff passthrough risks pushing this toward 2.9–3.0%. A hot print (≥3.0%) confirms stagflation, kills rate-cut hopes, crushes NAS100 and BTC, and keeps gold under pressure. A soft print (≤2.7%) would be the dovish surprise that triggers a broad risk-on: gold recovery to $4,791, NAS100 squeeze to $24,600, BTC push through $74,000. Personal Income and Spending data releases simultaneously — watch spending MoM for consumer health." },
  { day: "∞",   date: "Ongoing", event: "🇮🇷 US–Israel–Iran War / Strait of Hormuz",    impact: "TAIL RISK", color: "#7c3aed", note: "Binary oil event — monitor headlines 24/7 including weekends", forecast: "No ceasefire timeline",         previous: "War began Feb 28, 2026",      detail: "The conflict is 3+ weeks old. Iran has declared a partial Strait of Hormuz chokehold and attacked Qatar's LNG infrastructure. Iran's army chief has vowed 'decisive and regrettable' retaliation for recent strikes. US troops reportedly being pre-positioned. Binary outcomes: Ceasefire/deal = oil crashes $20–30, gold and BTC spike, NAS100 short squeeze. Escalation to ground war = oil toward $115–120, stagflation terminal, rate hike pricing accelerates. Monitor Trump's social media — the March 8 '$35 oil crash in 1 session' happened on a single statement." },
  { day: "∞",   date: "Ongoing", event: "G7 Strategic Reserve Release Talks",            impact: "HIGH",      color: "#f59e0b", note: "300–400M barrel SPR = biggest single oil bearish catalyst",   forecast: "Decision pending G7 ministers", previous: "3 of 7 nations expressed support", detail: "The G7 is actively debating a coordinated release of 300–400M barrels from strategic reserves. The US, UK, and Japan have already expressed support. Germany and France are the holdouts. If the remaining G7 members agree, an announcement could come any day — even over a weekend. This is the biggest single near-term downside risk for oil, and the biggest single near-term upside catalyst for gold, Bitcoin, and NAS100. Watch for emergency G7 energy minister meetings or communiqués. A 300M barrel release would be the largest coordinated SPR action in history and would test OPEC+ production discipline." },
];

const macroThemes = [
  { icon: "🪖", title: "Iran War — Week 3+",            tag: "DOMINANT DRIVER", tagColor: "#7c3aed", tagBg: "#f5f3ff", text: "US-Israel strikes on Iran began Feb 28. Strait of Hormuz partially choked (20% global oil). Qatar LNG attacked. US troop pre-positioning. Every market in your portfolio is a derivative of this war's trajectory." },
  { icon: "📊", title: "PCE Friday — Fed's True Test",   tag: "FRI 8:30 AM ET",  tagColor: "#dc2626", tagBg: "#fef2f2", text: "Feb PCE (Fed preferred inflation) releases Mar 27. Forecast: Core +2.8% YoY. $98 oil risks upside surprise. Soft (≤2.7%) = broad risk-on, gold recovery. Hot (≥3.0%) = stagflation confirmed, sell everything." },
  { icon: "🔥", title: "Stagflation: Fed Boxed In",     tag: "HAWKISH HOLD",    tagColor: "#d97706", tagBg: "#fffbeb", text: "March FOMC: held 3.50–3.75%, SEP revised inflation UP and growth DOWN. Some officials now discussing rate HIKES by Oct 2026. $98 oil is the mechanism keeping the Fed frozen despite weak labor markets." },
  { icon: "🥇", title: "Gold Paradox — Down 17% in War", tag: "WATCH",           tagColor: "#d97706", tagBg: "#fffbeb", text: "Gold had its worst month since Oct 2008 DURING an active war. The mechanism: war → oil $98 → inflation expectations up → Fed can't cut → real yields elevated → gold unwinds. Deeply oversold. Needs PCE to turn." },
  { icon: "⛽", title: "Oil $98: The Stagflation Engine", tag: "ALL MARKETS",    tagColor: "#7c3aed", tagBg: "#f5f3ff", text: "WTI at $98 is the variable that explains every other anomaly. It's why gold is falling in a war. Why the Fed can't cut. Why NAS100 multiples compress. Why silver has no floor. Oil is the master variable this week." },
  { icon: "₿",  title: "Bitcoin: Wall of Worry Winner",  tag: "OUTPERFORMING",  tagColor: "#16a34a", tagBg: "#f0fdf4", text: "Bitcoin has outperformed gold, S&P, and NAS100 since the war began. Higher lows at $64K → $70K. ETF outflows collapsed 94%. Rising floor vs resistance at $73–74K. The cleanest long if oil falls on G7 SPR or Trump comments." },
];

/* ── SUBCOMPONENTS ──────────────────────────────────────────────── */
const Ticker = () => {
  const items = [
    "XAUUSD  $4,650.30  ▼10.2% WK","XAGUSD  $69.66  ▼9.3% WK  NEG YTD",
    "NAS100  $23,898  ▼2.1% WK  VIX 26.78","BTCUSD  $70,343  ▼47% FR OCT ATH",
    "USOIL  $98.22  ▲7.7% WK REBOUND","FED RATE  3.50–3.75%  HAWKISH HOLD",
    "IRAN WAR  WEEK 3+  HORMUZ CHOKED","PCE INFLATION  FRI MAR 27  8:30 AM ET  FORECAST +2.8%",
    "G7 SPR RELEASE  300–400M BARRELS  DECISION PENDING","TRUMP: OIL PRICES WILL DROP RAPIDLY WHEN IRAN THREAT IS OVER"
  ];
  const doubled = [...items, ...items];
  return (
    <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", overflow: "hidden", height: 36, display: "flex", alignItems: "center", position: "sticky", top: 0, zIndex: 100 }}>
      <div style={{ background: "#111827", color: "#fff", fontFamily: "'Inter',sans-serif", fontSize: 11, fontWeight: 600, padding: "0 14px", height: "100%", display: "flex", alignItems: "center", whiteSpace: "nowrap", flexShrink: 0, gap: 7, letterSpacing: "0.03em" }}>
        <span className="red-blink" style={{ width: 7, height: 7, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
        MARKET CLOSED
      </div>
      <div style={{ overflow: "hidden", flex: 1, maskImage: "linear-gradient(90deg, transparent, white 3%, white 97%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, white 3%, white 97%, transparent)" }}>
        <div className="ticker-inner" style={{ display: "flex", gap: 36, whiteSpace: "nowrap", fontFamily: "'Inter',sans-serif", fontSize: 11, letterSpacing: "0.02em" }}>
          {doubled.map((item, i) => (
            <span key={i} style={{ color: item.includes("▼") ? "#dc2626" : item.includes("▲") ? "#16a34a" : "#6b7280" }}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const ImpactBadge = ({ impact, color }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
    <span style={{ width: 8, height: 8, borderRadius: "50%", background: color, display: "inline-block", flexShrink: 0 }} />
    <span style={{ fontSize: 11, fontWeight: 600, color, whiteSpace: "nowrap" }}>{impact}</span>
  </div>
);

const SentimentBar = ({ value, color, animate }) => (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
      <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>Bearish</span>
      <span style={{ fontSize: 11, color, fontWeight: 600 }}>Sentiment {value}%</span>
      <span style={{ fontSize: 11, color: "#9ca3af", fontWeight: 500 }}>Bullish</span>
    </div>
    <div style={{ height: 6, background: "#f3f4f6", borderRadius: 6, overflow: "hidden" }}>
      <div className={animate ? "bar-fill" : ""} style={{ "--w": `${value}%`, width: animate ? undefined : `${value}%`, height: "100%", borderRadius: 6, background: `linear-gradient(90deg, #e5e7eb, ${color})` }} />
    </div>
  </div>
);

/* ── MAIN ──────────────────────────────────────────────────────── */
export default function EliteMacros() {
  const [activeMarket, setActiveMarket] = useState(0);
  const [openItem, setOpenItem]         = useState(null);
  const [animateBars, setAnimateBars]   = useState(true);
  const winW   = useWindowWidth();
  const mobile = winW < 640;
  const tablet = winW >= 640 && winW < 900;
  const m = markets[activeMarket];

  const toggle = (key) => setOpenItem(prev => prev === key ? null : key);
  const handleMarketChange = (i) => {
    setActiveMarket(i);
    setOpenItem(null);
    setAnimateBars(false);
    setTimeout(() => setAnimateBars(true), 40);
  };

  useEffect(() => {
    const s1 = document.createElement("style"); s1.textContent = FONTS; document.head.appendChild(s1);
    const s2 = document.createElement("style"); s2.textContent = CSS;   document.head.appendChild(s2);
    return () => { document.head.removeChild(s1); document.head.removeChild(s2); };
  }, []);

  const pad   = mobile ? "0 14px 40px" : "24px 24px 48px";
  const hPad  = mobile ? "0 14px" : "0 24px";

  const Card = ({ children, style = {} }) => (
    <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", overflow: "hidden", ...style }}>{children}</div>
  );
  const SectionLabel = ({ children }) => (
    <p style={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 12 }}>{children}</p>
  );

  const CalRow = ({ e, idx }) => {
    const key    = `cal-${idx}`;
    const isOpen = openItem === key;

    if (mobile) {
      return (
        <div style={{ borderBottom: idx < calendarEvents.length - 1 ? "1px solid #f3f4f6" : "none" }}>
          <div className="cal-row" onClick={() => toggle(key)} style={{ padding: "12px 14px", background: isOpen ? "#fafafa" : "#fff", borderLeft: `3px solid ${isOpen ? e.color : "transparent"}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 600, color: "#6b7280" }}>{e.day} {e.date}</span>
                <ImpactBadge impact={e.impact} color={e.color} />
              </div>
              <span className={`chevron ${isOpen ? "open" : ""}`} style={{ fontSize: 12, color: isOpen ? e.color : "#d1d5db" }}>▾</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#111827", marginBottom: 3 }}>{e.event}</div>
            <div style={{ fontSize: 11, color: "#9ca3af" }}>{e.note}</div>
            <div style={{ display: "flex", gap: 16, marginTop: 7, flexWrap: "wrap" }}>
              <div><span style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af" }}>FORECAST  </span><span style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>{e.forecast}</span></div>
              <div><span style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af" }}>PREVIOUS  </span><span style={{ fontSize: 11, color: "#6b7280" }}>{e.previous}</span></div>
            </div>
          </div>
          <div className={`accordion-body ${isOpen ? "open" : "closed"}`}>
            <div style={{ padding: "12px 14px 14px", background: "#fafafa", borderTop: `1px solid ${e.color}20` }}>
              <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.75, borderLeft: `2px solid ${e.color}`, paddingLeft: 12 }}>{e.detail}</p>
            </div>
          </div>
        </div>
      );
    }

    const cols = tablet ? "70px 90px 1fr 120px 120px 20px" : "80px 100px 1fr 150px 150px 20px";
    return (
      <div style={{ borderBottom: idx < calendarEvents.length - 1 ? "1px solid #f3f4f6" : "none" }}>
        <div className="cal-row" onClick={() => toggle(key)} style={{ display: "grid", gridTemplateColumns: cols, gap: 12, padding: "13px 18px", alignItems: "center", background: isOpen ? "#fafafa" : "#fff", borderLeft: `3px solid ${isOpen ? e.color : "transparent"}` }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#374151" }}>{e.day}</div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 1 }}>{e.date}</div>
          </div>
          <ImpactBadge impact={e.impact} color={e.color} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{e.event}</div>
            <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{e.note}</div>
          </div>
          <div style={{ fontSize: 12, color: "#374151", fontWeight: 500, textAlign: "right" }}>{e.forecast}</div>
          <div style={{ fontSize: 12, color: "#6b7280", textAlign: "right" }}>{e.previous}</div>
          <span className={`chevron ${isOpen ? "open" : ""}`} style={{ fontSize: 12, color: isOpen ? e.color : "#d1d5db", textAlign: "center" }}>▾</span>
        </div>
        <div className={`accordion-body ${isOpen ? "open" : "closed"}`}>
          <div style={{ padding: "12px 18px 16px", paddingLeft: tablet ? 18 : 100, background: "#fafafa", borderTop: `1px solid ${e.color}20` }}>
            <div style={{ display: "flex", gap: 20, marginBottom: 10, flexWrap: "wrap" }}>
              <div><span style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af" }}>FORECAST  </span><span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{e.forecast}</span></div>
              <div><span style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af" }}>PREVIOUS  </span><span style={{ fontSize: 12, color: "#6b7280" }}>{e.previous}</span></div>
            </div>
            <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.75, borderLeft: `2px solid ${e.color}`, paddingLeft: 14 }}>{e.detail}</p>
          </div>
        </div>
      </div>
    );
  };

  const mktCols = mobile ? "repeat(3, 1fr)" : "repeat(5, 1fr)";

  return (
    <div style={{ fontFamily: "'Inter',sans-serif", background: "#f0f2f5", minHeight: "100vh", color: "#111827" }}>
      <Ticker />

      {/* HEADER */}
      <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: hPad }}>
        <div style={{ maxWidth: 1020, margin: "0 auto", minHeight: 56, display: "flex", flexDirection: mobile ? "column" : "row", alignItems: mobile ? "flex-start" : "center", justifyContent: "space-between", gap: 4, paddingTop: mobile ? 12 : 0, paddingBottom: mobile ? 12 : 0 }}>
          <div>
            <h1 style={{ fontSize: mobile ? 20 : 22, fontWeight: 800, color: "#111827", letterSpacing: "-0.02em" }}>Elite Macros</h1>
            <p style={{ fontSize: 12, color: "#6b7280", marginTop: 2 }}>Week of Mar 23–27, 2026 · Sunday prep report</p>
          </div>
          <div style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>Updated Sun Mar 22, 2026</div>
        </div>
      </div>

      <div style={{ maxWidth: 1020, margin: "0 auto", padding: pad }}>

        {/* ALERT */}
        <div className="fade-up" style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: mobile ? "10px 14px" : "12px 18px", marginBottom: 20, display: "flex", alignItems: "flex-start", gap: 10 }}>
          <span style={{ fontSize: 15, flexShrink: 0, marginTop: 1 }}>🚨</span>
          <p style={{ fontSize: mobile ? 12 : 13, color: "#991b1b", fontWeight: 500, lineHeight: 1.6 }}>
            <strong>War week 3+ + stagflation data week:</strong> Iran war (Strait of Hormuz + Qatar LNG) continues to dominate all 5 markets. PCE Inflation releases Friday Mar 27 at 8:30 AM ET — Forecast Core +2.8% YoY. A hot print (≥3.0%) = stagflation confirmed. A soft print (≤2.7%) = broad risk-on relief. G7 Strategic Reserve release (300–400M barrels) could drop any day and reshape everything.
          </p>
        </div>

        {/* 01 MACRO THEMES */}
        <div className="fade-up-1" style={{ marginBottom: 24 }}>
          <SectionLabel>01 / Key Macro Themes</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : tablet ? "repeat(2, 1fr)" : "repeat(3, 1fr)", gap: 10 }}>
            {macroThemes.map((t, i) => (
              <Card key={i}>
                <div style={{ padding: mobile ? "14px 14px" : "16px 18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8, marginBottom: 9 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", display: "flex", alignItems: "center", gap: 7 }}>
                      <span>{t.icon}</span>{t.title}
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 600, color: t.tagColor, background: t.tagBg, padding: "3px 8px", borderRadius: 20, whiteSpace: "nowrap", border: `1px solid ${t.tagColor}30`, flexShrink: 0 }}>
                      {t.tag}
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: "#4b5563", lineHeight: 1.65 }}>{t.text}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* 02 ECONOMIC CALENDAR */}
        <div className="fade-up-2" style={{ marginBottom: 24 }}>
          <SectionLabel>02 / Economic Calendar — Click Any Event for Detail</SectionLabel>
          <Card>
            {!mobile && (
              <div style={{ display: "grid", gridTemplateColumns: tablet ? "70px 90px 1fr 120px 120px 20px" : "80px 100px 1fr 150px 150px 20px", gap: 12, padding: "10px 18px", borderBottom: "1px solid #f3f4f6" }}>
                {["DATE", "IMPACT", "EVENT", "FORECAST", "PREVIOUS", ""].map((h, i) => (
                  <span key={i} style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", textAlign: i >= 3 ? "right" : "left" }}>{h}</span>
                ))}
              </div>
            )}
            {calendarEvents.map((e, i) => <CalRow key={i} e={e} idx={i} />)}
          </Card>
        </div>

        {/* 03 MARKET ANALYSIS */}
        <div className="fade-up-3">
          <SectionLabel>03 / Market-by-Market Analysis</SectionLabel>

          <div style={{ display: "grid", gridTemplateColumns: mktCols, gap: mobile ? 6 : 8, marginBottom: 14 }}>
            {markets.map((mk, i) => {
              const active = activeMarket === i;
              return (
                <button key={i} className="mkt-btn" onClick={() => handleMarketChange(i)} style={{ background: "#fff", border: active ? `2px solid ${mk.accent}` : "2px solid #e5e7eb", borderRadius: 10, padding: mobile ? "10px 4px" : "12px 6px", boxShadow: active ? "0 2px 14px rgba(0,0,0,0.1)" : "none" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: mobile ? 5 : 7 }}>
                    <mk.Icon size={mobile ? 24 : 28} />
                  </div>
                  <div style={{ fontSize: mobile ? 9 : 10, fontWeight: 700, color: active ? mk.accent : "#6b7280", letterSpacing: "0.02em" }}>{mk.name}</div>
                  <div style={{ fontSize: mobile ? 10 : 11, color: active ? "#374151" : "#9ca3af", marginTop: 2, fontWeight: active ? 600 : 400 }}>{mk.price}</div>
                </button>
              );
            })}
          </div>

          <Card>
            <div style={{ height: 3, background: m.accent }} />
            <div style={{ padding: mobile ? "16px 14px 14px" : "20px 22px 18px", borderBottom: "1px solid #f3f4f6" }}>
              <div style={{ display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", alignItems: mobile ? "flex-start" : "flex-start", gap: 14, marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <m.Icon size={mobile ? 36 : 40} />
                  <div>
                    <div style={{ fontSize: mobile ? 18 : 20, fontWeight: 800, color: "#111827", letterSpacing: "-0.02em" }}>{m.label}</div>
                    <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2, fontWeight: 500 }}>{m.name}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ textAlign: mobile ? "left" : "right" }}>
                    <div style={{ fontSize: mobile ? 19 : 22, fontWeight: 700, color: "#111827" }}>{m.price}</div>
                    <div style={{ fontSize: 12, color: m.changeUp === false ? "#dc2626" : m.changeUp === true ? "#16a34a" : "#6b7280", fontWeight: 600, marginTop: 1 }}>{m.change}</div>
                  </div>
                  <div style={{ padding: "7px 14px", borderRadius: 20, fontSize: 12, fontWeight: 700, color: m.biasColor, background: m.biasBg, border: `1px solid ${m.biasBorder}`, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
                    <span className="red-blink" style={{ width: 6, height: 6, borderRadius: "50%", background: m.biasColor, display: "inline-block" }} />
                    {m.bias}
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: 10 }}>
                <div style={{ background: "#f9fafb", borderRadius: 8, padding: "11px 13px", border: "1px solid #f3f4f6" }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 5 }}>KEY LEVELS</p>
                  <p style={{ fontSize: 12, color: "#374151", fontWeight: 500 }}>{m.keyLevel}</p>
                </div>
                <div style={{ background: "#f9fafb", borderRadius: 8, padding: "11px 13px", border: "1px solid #f3f4f6" }}>
                  <p style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 8 }}>BULL / BEAR SENTIMENT</p>
                  <SentimentBar value={m.sentiment} color={m.biasColor} animate={animateBars} />
                </div>
              </div>
            </div>

            <div style={{ padding: mobile ? "14px 14px" : "16px 22px" }}>
              <p style={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", letterSpacing: "0.06em", marginBottom: 10 }}>DRIVERS THIS WEEK — Tap any item to expand</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {m.drivers.map((d, i) => {
                  const key    = `driver-${activeMarket}-${i}`;
                  const isOpen = openItem === key;
                  return (
                    <div key={i} style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${isOpen ? m.accent + "70" : "#f3f4f6"}` }}>
                      <div className="driver-row" onClick={() => toggle(key)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: mobile ? "10px 12px" : "10px 14px", background: isOpen ? "#fafafa" : "#fff", gap: 10 }}>
                        <span style={{ fontSize: mobile ? 12 : 13, color: isOpen ? "#111827" : "#374151", lineHeight: 1.45, flex: 1, fontWeight: isOpen ? 600 : 400 }}>{d.short}</span>
                        <span className={`chevron ${isOpen ? "open" : ""}`} style={{ fontSize: 13, color: isOpen ? m.accent : "#d1d5db", flexShrink: 0 }}>▾</span>
                      </div>
                      <div className={`accordion-body ${isOpen ? "open" : "closed"}`}>
                        <div style={{ padding: mobile ? "11px 12px 13px" : "12px 14px 14px", background: "#fafafa", borderTop: `1px solid ${m.accent}25` }}>
                          <p style={{ fontSize: mobile ? 12 : 13, color: "#4b5563", lineHeight: 1.75, borderLeft: `2px solid ${m.accent}`, paddingLeft: 12 }}>{d.detail}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ margin: mobile ? "0 14px 16px" : "0 22px 22px", background: m.biasBg, borderRadius: 8, padding: "13px 15px", border: `1px solid ${m.biasBorder}`, borderLeft: `3px solid ${m.biasColor}` }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: m.biasColor, letterSpacing: "0.07em", marginBottom: 6 }}>◈ TRADING WATCH</p>
              <p style={{ fontSize: mobile ? 12 : 13, color: "#374151", lineHeight: 1.7 }}>{m.watch}</p>
            </div>
          </Card>
        </div>

        {/* footer */}
        <div style={{ marginTop: 28, display: "flex", flexDirection: mobile ? "column" : "row", justifyContent: "space-between", gap: 4 }}>
          <span style={{ fontSize: 11, color: "#d1d5db" }}>Elite Macros · Sun Mar 22, 2026 · For informational purposes only · Not financial advice</span>
          <span style={{ fontSize: 11, color: "#d1d5db" }}>Verify all prices with your broker before execution</span>
        </div>
      </div>
    </div>
  );
}
