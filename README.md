# FeelDX Studio — Materials & Furniture Selection Assistant

A lightweight interior design prototype that allows users to select room types, customise material and furniture choices, and generate an AI-powered design summary.

**Live Demo:** https://feeldx-studio.vercel.app/
**GitHub:** https://github.com/christianandreiwebdev-ops/feeldx-studio

---

## Project Overview

FeelDX Studio is a single-page web application built as a practical exercise for the FeelDX design platform. Users can:

- Choose from **5 room types**: Kitchen, Bathroom, Living Room, Bedroom, and Laundry Room
- Select from curated **material and furniture options** per room (flooring, wall finish, benchtop, cabinetry, sofa, lighting, etc.)
- View a **live summary** of their selections with a real-time progress bar and cost estimate (Low / Medium / High)
- See **real-time compatibility warnings** (e.g. marble in wet areas, dark finish combinations)
- Generate an **AI-powered design summary** that streams live, covering aesthetic analysis, material compatibility, and recommended next steps

---

## Technologies Used

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Build Tool | Vite |
| Styling | Custom CSS (CSS Variables, Google Fonts) |
| Fonts | Playfair Display + Inter (Google Fonts) |
| Icons | Font Awesome 6 |
| AI API | Groq API (llama-3.1-8b-instant) — free tier |
| Serverless Function | Vercel Edge Function (`/api/chat.js`) |
| Deployment | Vercel |
| Version Control | Git + GitHub |

---

## Project Structure

```
feeldx-studio/
├── api/
│   └── chat.js              ← Vercel Edge Function (Groq AI proxy)
├── src/
│   ├── components/
│   │   ├── Header.jsx        ← Top navigation bar
│   │   ├── RoomSidebar.jsx   ← Room type selection
│   │   ├── MaterialGrid.jsx  ← Materials & furniture cards + progress bar
│   │   ├── SummaryPanel.jsx  ← Right sidebar (room visual + selections)
│   │   └── AiPanel.jsx       ← AI summary button + streaming output
│   ├── data/
│   │   └── rooms.js          ← Room and material data
│   ├── utils/
│   │   └── analysis.js       ← Cost estimate + rule-based design notes
│   ├── App.jsx               ← Root component + state management
│   ├── main.jsx              ← React entry point
│   └── index.css             ← Global styles
├── public/
├── index.html
├── package.json
└── vite.config.js
```

---

## Setup Instructions

### Prerequisites

- Node.js v18 or higher
- npm v9 or higher
- A free Groq API key from [console.groq.com](https://console.groq.com)

### Install Dependencies

```bash
git clone https://github.com/christianandreiwebdev-ops/feeldx-studio.git
cd feeldx-studio
npm install
```

---

## How to Run Locally

### Option A — With AI summary working (recommended)

**1. Start the local proxy** (handles API calls from your browser):

Make sure you have `proxy.js` in your project root. Open a terminal and run:
```bash
node proxy.js
```
You should see: `✅ FeelDX proxy running at http://localhost:3131`

**2. Start the React app** (open a second terminal):
```bash
npm run dev
```

**3. Open in browser:**
```
http://localhost:5173
```

### Option B — Without AI (UI only)

```bash
npm run dev
```
The app will run fully except the AI summary will show a fallback message.

---

## Environment Variables

For deployment on Vercel, add the following environment variable:

| Key | Value |
|---|---|
| `GROQ_API_KEY` | Your Groq API key from console.groq.com |

---

## How to Test the Application

### Manual Testing Checklist

1. **Room switching** — Click each of the 5 rooms. Confirm materials reset and the room visual updates correctly.
2. **Material selection** — Click option buttons. Confirm they highlight and the summary panel updates.
3. **Progress bar** — Select more items and confirm the percentage increases.
4. **Cost estimate** — Select premium materials (Granite, Marble, Hardwood) → should show "High". Select budget options (Vinyl, Laminate) → should show "Low".
5. **Compatibility warnings:**
   - Select Marble benchtop in Kitchen → marble maintenance warning appears
   - Select 2+ dark finishes → dark room warning appears
   - Leave Lighting unselected → lighting recommendation appears
6. **AI Summary** — Click "Generate AI Summary" → confirm text streams live in the panel.
7. **Room switch after AI** — Generate a summary, then switch rooms → confirm the AI panel resets completely.
8. **Responsive layout** — Resize browser to mobile width → room buttons become a horizontal scrollable tab bar.

---

## Assumptions Made

- Material and furniture options are hardcoded mock data — no external product database or CMS is used.
- Cost estimation is rule-based (keyword matching against known premium/budget items) rather than real pricing data.
- The Groq API is called via a Vercel Edge Function to keep the API key secure and avoid CORS issues.
- "None" is treated as a missing selection in the AI summary logic.
- The app targets modern browsers with native `fetch` and `ReadableStream` support.
- Room visual is a stylised icon placeholder — not a real 3D or photo render.

---

## AI Summary Logic

The AI summary combines two layers:

**1. Rule-based analysis (instant):**
- Cost estimate: Low / Medium / High based on material keywords
- Compatibility warnings: marble in kitchen, timber in bathroom, dark finish combinations
- Missing selections: flags any categories not yet chosen
- Premium pairing highlights: detects luxury material combinations

**2. AI-generated analysis (streamed via Groq):**
- Uses `llama-3.1-8b-instant` model
- Covers: overall aesthetic, material compatibility concerns, recommended next steps
- Streams token by token for a live typing effect

---

## Limitations & Possible Improvements

| Limitation | Possible Improvement |
|---|---|
| No persistent storage | Add localStorage or a backend (Supabase, Firebase) to save designs |
| Mock material data | Integrate a real product catalogue with images and pricing |
| No room visualisation | Add a mood board or 2D room sketch |
| No authentication | Add user accounts to save multiple room designs |
| English only | Add i18n / multilingual support |
| No accessibility audit | Add full ARIA labels and keyboard navigation |
| Groq free tier limits | Upgrade to paid tier or add multiple API key fallback |

---

## Deployment

The app is deployed on **Vercel** with automatic redeployment on every push to the `main` branch on GitHub.

### Deploy your own copy:

1. Fork the repository on GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add `GROQ_API_KEY` in Vercel → Settings → Environment Variables
4. Click Deploy

---

## Author

**Christian Andrei Panlilio**
GitHub: [@christianandreiwebdev-ops](https://github.com/christianandreiwebdev-ops)

---

*Built as a practical exercise for FeelDX. Scope is intentionally lightweight — core requirements prioritised.*
