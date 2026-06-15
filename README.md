# FitAI — Your AI-Powered Fitness Companion

> A production-ready, mobile-first fitness web app prototype powered by AI assistance. Built with React + Vite, Tailwind CSS, and Framer Motion.

![FitAI Banner](https://img.shields.io/badge/FitAI-Powered%20by%20AI-84cc16?style=for-the-badge&logo=lightning&logoColor=black)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss)

---

## 🚀 Live Demo

**[View Live App](https://mobile-first-prototype--hlwdeepakk.replit.app/)** — Try the app now!

---

## What is FitAI?

FitAI is a comprehensive gym enthusiast platform that helps users:

- **Discover exercises** with video demos and smart filtering
- **Generate workout plans** via an AI-powered step-by-step wizard
- **Track progress** with charts and AI-driven performance analysis
- **Follow community challenges** and earn XP on a global leaderboard
- **Plan meals** aligned to their fitness goal with macro breakdowns
- **Time rest periods** with an AI-suggested smart rest timer
- **Chat with Noupe AI** — a real-time AI chatbot embedded directly in the app

---

## Screenshots

| Landing Page | Dashboard | Exercise Library |
|---|---|---|
| Hero with "Powered by AI" badge, stats bar, features grid, testimonials, and Noupe AI chatbot section | Today's workout, streak, XP level, AI insight, quick-access cards | Searchable grid of 10 exercises with video demos and smart filters |

| Workout Planner | Progress Tracker | Community Challenges |
|---|---|---|
| 4-step wizard collecting goal, level, equipment, and days | Line charts, workout log history, AI plateau detection | Weekly challenges with XP rewards and a global leaderboard |

---

## Features

### Core Pages
| Route | Page | Description |
|---|---|---|
| `/` | Landing Page | High-converting marketing page with 9 sections and Noupe AI chatbot |
| `/login` | Login | Email + password form with Google button UI |
| `/signup` | Sign Up | Full registration form with validation |
| `/dashboard` | Dashboard | Home screen with streak, XP, AI insight, today's workout |
| `/exercises` | Exercise Library | 10 exercises with smart search and 3 filter dimensions |
| `/workout-planner` | AI Workout Generator | Multi-step wizard outputting one of 3 personalized plans |
| `/progress` | Progress Tracker | Recharts line graph, workout logs, AI performance analysis |
| `/challenges` | Community Challenges | 5 weekly challenges, XP rewards, global leaderboard |
| `/meal-planner` | Nutrition Planner | Goal-based meal suggestions with macro breakdowns |
| `/timer` | Rest Timer | SVG circular countdown with presets and AI-suggested duration |
| `/profile` | Profile & Settings | Edit profile, dark mode toggle, achievements/badges |

### AI-Assisted Features
- **AI Insight** on the dashboard — personalized coaching tips
- **AI Performance Analysis** on the progress page — plateau detection + recommendations
- **AI Workout Generator** — wizard that personalizes plans based on 4 inputs
- **AI Notes** on generated plans — explains why the plan was chosen
- **AI Rest Suggestion** — recommended rest duration on the timer page
- **Smart Search** — natural language exercise search
- **Noupe AI Chatbot** — floating button powered by Noupe AI, visible on every page

### Gamification
- XP points earned by completing challenges
- Level system with progress bar (mock user: Level 12, 4,500 XP)
- 5 earned badges + locked badges to unlock
- 14-day workout streak tracker
- Global leaderboard with weekly rankings

---

## Tech Stack

| Category | Technology |
|---|---|
| Frontend | React 18 + Vite 7 |
| Language | TypeScript 5.9 |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Animations | Framer Motion |
| Routing | Wouter |
| Charts | Recharts |
| Forms | react-hook-form + Zod |
| Icons | Lucide React |
| Fonts | Outfit + Inter (Google Fonts) |
| Package manager | pnpm workspaces |
| AI Chatbot | Noupe AI (embedded script) |

---

## Project Structure

```
fitai/
├── artifacts/
│   ├── fitai/                    # Main React + Vite web app
│   │   ├── src/
│   │   │   ├── App.tsx           # Router + ThemeProvider + Layout
│   │   │   ├── pages/
│   │   │   │   ├── Landing.tsx
│   │   │   │   ├── Login.tsx
│   │   │   │   ├── Signup.tsx
│   │   │   │   ├── Dashboard.tsx
│   │   │   │   ├── Exercises.tsx
│   │   │   │   ├── WorkoutPlanner.tsx
│   │   │   │   ├── Progress.tsx
│   │   │   │   ├── Challenges.tsx
│   │   │   │   ├── MealPlanner.tsx
│   │   │   │   ├── Timer.tsx
│   │   │   │   └── Profile.tsx
│   │   │   ├── components/
│   │   │   │   ├── Layout.tsx        # Shell: sidebar + bottom nav
│   │   │   │   ├── ThemeProvider.tsx  # Dark/light mode context
│   │   │   │   └── PoweredByAI.tsx   # Reusable AI badge
│   │   │   ├── lib/
│   │   │   │   ├── mockData.ts       # All static mock data
│   │   │   │   └── localStorage.ts   # Progress log persistence
│   │   │   └── index.css             # Tailwind + dark theme variables
│   │   └── index.html                # Noupe AI script injected here
│   └── api-server/                   # Express API (baseline, unused in prototype)
├── scripts/
│   └── src/
│       └── generate-fitai-pdf.ts     # Generates Noupe AI training data PDF
├── lib/                              # Shared workspace libraries
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm 9+

### Install dependencies
```bash
pnpm install
```

### Run the app (development)
```bash
pnpm --filter @workspace/fitai run dev
```

The app will be available at `http://localhost:<PORT>`.

### Run the API server
```bash
pnpm --filter @workspace/api-server run dev
```

### Full typecheck
```bash
pnpm run typecheck
```

### Generate Noupe AI training data PDF
```bash
pnpm --filter @workspace/scripts run generate-fitai-pdf
```

---

## Noupe AI Integration

The Noupe AI chatbot is integrated at two levels:

**1. Floating button (global)**
The embed script is loaded in `artifacts/fitai/index.html`:
```html
<script src='https://www.noupe.com/embed/019eca9c9729717cb1f6b7f98d5a76686e20.js'></script>
```
This renders a floating chat button on every page of the app.

**2. In-layout placeholders**
Two dedicated `<div id="noupe-ai-chatbot">` mounting points exist:
- **Landing page** (`/`) — in the "Ask FitAI Anything" section
- **Dashboard** (`/dashboard`) — in the right column assistant panel

**Training Data**
A comprehensive PDF (`scripts/FitAI_Training_Data.pdf`) documents the entire FitAI platform for use as Noupe AI knowledge base training data. It includes:
- All 10 exercises with full descriptions
- All 3 workout plans with weekly structure
- All 3 meal plans with macro breakdowns
- All 5 challenges with XP rewards
- 60+ Q&A pairs covering every user question

---

## Mock Data

All data is local/static — no backend database is required for the prototype.

**Exercises:** 10 exercises across chest, back, legs, shoulders, arms, and core

**Workout Plans:**
- Push/Pull/Legs Hypertrophy — muscle gain, 6 days/week
- Full Body Strength — strength/beginner, 3 days/week
- HIIT Fat Burner — fat loss, 4 days/week

**Mock User:** Alex Fitness — Level 12, 4,500 XP, 14-day streak, goal: Muscle Gain

**Challenges:** 100 Pushups a Day, Run 5k, 7-Day Plank, Squat Bodyweight, No Sugar Week

---

## Deployment

This project is configured for deployment on [Replit](https://replit.com). The app is served via a global reverse proxy with path-based routing.

To deploy on other platforms, build the Vite app:
```bash
pnpm --filter @workspace/fitai run build
```
Then serve the `artifacts/fitai/dist` directory with any static file host (Vercel, Netlify, Cloudflare Pages, etc.).

---

## License

MIT — free to use, modify, and distribute.

---

<p align="center">
  Built with AI. Train with intelligence. &nbsp;|&nbsp; <strong>FitAI</strong>
</p>
