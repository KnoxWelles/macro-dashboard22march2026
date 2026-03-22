# Elite Macros Dashboard

Weekly macro trading briefing dashboard for XAUUSD, XAGUSD, NAS100, BTCUSD, and Crude Oil (WTI).

## Setup

**Requirements:** Node.js 16+ and npm

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm start
```

The dashboard will open at **http://localhost:3000**

## Build for production

```bash
npm run build
```

## Updating weekly data

All market data, calendar events, drivers, and macro themes live in `src/App.js`.

The key data arrays to update each week:
- `markets[]` — prices, bias, key levels, sentiment, drivers per market
- `calendarEvents[]` — economic calendar with forecasts and detail text
- `macroThemes[]` — the 6 top macro theme cards
- `Ticker` component items — the scrolling ticker tape

## Structure

```
elite-macros/
├── public/
│   └── index.html
├── src/
│   ├── index.js     ← React entry point
│   └── App.js       ← All dashboard logic and data
├── package.json
└── README.md
```

---
*For informational purposes only. Not financial advice.*
