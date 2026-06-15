import PDFDocument from 'pdfkit';
import * as fs from 'fs';
import * as path from 'path';

const OUT_PATH = path.resolve(process.cwd(), 'FitAI_Training_Data.pdf');

const doc = new PDFDocument({
  size: 'A4',
  bufferPages: true,
  margins: { top: 60, bottom: 60, left: 65, right: 65 },
  info: {
    Title: 'FitAI — Complete Product Training Data',
    Author: 'FitAI',
    Subject: 'Noupe AI Chatbot Knowledge Base',
    Keywords: 'fitai, fitness, workout, AI, training data, chatbot',
  },
});

const stream = fs.createWriteStream(OUT_PATH);
doc.pipe(stream);

// ─── Color palette ──────────────────────────────────────────────────────────
const LIME   = '#85c400';
const BLACK  = '#0a0a0a';
const DGRAY  = '#1a1a1a';
const MGRAY  = '#444444';
const LGRAY  = '#888888';
const WHITE  = '#ffffff';
const ACCENT = '#adff2f';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function pageWidth() { return doc.page.width - 130; }

function coverPage() {
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(BLACK);

  // Accent bar
  doc.rect(0, 0, doc.page.width, 8).fill(LIME);

  // Logo area
  doc.rect(65, 80, 52, 52).fillColor(LIME).fill();
  doc
    .fillColor(BLACK)
    .font('Helvetica-Bold')
    .fontSize(26)
    .text('F', 65 + 15, 80 + 13, { lineBreak: false });

  // Title
  doc
    .fillColor(WHITE)
    .font('Helvetica-Bold')
    .fontSize(38)
    .text('FitAI', 130, 87, { lineBreak: false });

  doc
    .fillColor(LIME)
    .font('Helvetica-Bold')
    .fontSize(13)
    .text('POWERED BY AI', 65, 158);

  doc
    .fillColor(WHITE)
    .font('Helvetica-Bold')
    .fontSize(28)
    .text('Complete Product Training Data', 65, 190, { width: pageWidth() });

  doc
    .fillColor(LGRAY)
    .font('Helvetica')
    .fontSize(12)
    .text('Noupe AI Chatbot Knowledge Base — v1.0', 65, 248);

  // Horizontal rule
  doc.moveTo(65, 280).lineTo(doc.page.width - 65, 280).strokeColor(MGRAY).lineWidth(1).stroke();

  // Description
  doc
    .fillColor('#cccccc')
    .font('Helvetica')
    .fontSize(11)
    .text(
      'This document is the authoritative reference for the FitAI platform. ' +
      'It covers every page, feature, exercise, workout plan, meal plan, challenge, ' +
      'badge, and user-facing interaction so that an AI assistant can answer any ' +
      'question a FitAI user might ask — accurately and completely.',
      65, 300, { width: pageWidth(), lineGap: 5 }
    );

  // Table of Contents
  doc.moveDown(2);
  doc
    .fillColor(LIME)
    .font('Helvetica-Bold')
    .fontSize(13)
    .text('CONTENTS', 65, doc.y);

  doc.moveDown(0.5);
  const toc = [
    ['1', 'Product Overview & Mission'],
    ['2', 'Visual Design & Theme'],
    ['3', 'Application Architecture'],
    ['4', 'Pages & User Flows'],
    ['5', 'Exercise Library (Complete)'],
    ['6', 'Workout Plans (Complete)'],
    ['7', 'Meal Plans & Nutrition'],
    ['8', 'Community Challenges & XP'],
    ['9', 'Progress Tracking System'],
    ['10', 'Gamification: XP, Levels & Badges'],
    ['11', 'Rest Timer'],
    ['12', 'Profile & Settings'],
    ['13', 'AI Features & Noupe Integration'],
    ['14', 'FAQ — Questions Users Will Ask'],
  ];

  toc.forEach(([num, title]) => {
    doc
      .fillColor(LGRAY)
      .font('Helvetica')
      .fontSize(10)
      .text(`${num}.  ${title}`, 80, doc.y, { lineGap: 4 });
  });

  // Footer
  doc
    .fillColor(MGRAY)
    .font('Helvetica')
    .fontSize(9)
    .text('Confidential — FitAI Internal AI Training Document', 65, doc.page.height - 60, {
      width: pageWidth(),
      align: 'center',
    });
}

function h1(text: string) {
  // Full-width accent header band
  const y = doc.y;
  doc.rect(65, y, pageWidth(), 36).fillColor('#111').fill();
  doc.rect(65, y, 4, 36).fillColor(LIME).fill();
  doc
    .fillColor(WHITE)
    .font('Helvetica-Bold')
    .fontSize(16)
    .text(text, 80, y + 10, { lineBreak: false });
  doc.moveDown(1.8);
}

function h2(text: string) {
  doc.moveDown(0.6);
  doc
    .fillColor(LIME)
    .font('Helvetica-Bold')
    .fontSize(12)
    .text(text, 65, doc.y);
  doc.moveDown(0.3);
}

function h3(text: string) {
  doc.moveDown(0.3);
  doc
    .fillColor('#dddddd')
    .font('Helvetica-Bold')
    .fontSize(11)
    .text(text, 65, doc.y);
  doc.moveDown(0.2);
}

function body(text: string, indent = 0) {
  doc
    .fillColor('#cccccc')
    .font('Helvetica')
    .fontSize(10)
    .text(text, 65 + indent, doc.y, { width: pageWidth() - indent, lineGap: 3 });
  doc.moveDown(0.3);
}

function bullet(items: string[], indent = 10) {
  items.forEach(item => {
    doc
      .fillColor(LIME)
      .font('Helvetica-Bold')
      .fontSize(10)
      .text('•', 65 + indent, doc.y, { lineBreak: false });
    doc
      .fillColor('#cccccc')
      .font('Helvetica')
      .fontSize(10)
      .text(item, 65 + indent + 14, doc.y - 12, { width: pageWidth() - indent - 14, lineGap: 3 });
    doc.moveDown(0.25);
  });
}

function kv(label: string, value: string) {
  const y = doc.y;
  doc.fillColor(LGRAY).font('Helvetica-Bold').fontSize(9).text(label + ':', 65, y, { lineBreak: false, width: 120 });
  doc.fillColor('#cccccc').font('Helvetica').fontSize(10).text(value, 185, y, { width: pageWidth() - 120, lineGap: 2 });
  doc.moveDown(0.3);
}

function rule() {
  doc.moveDown(0.4);
  doc.moveTo(65, doc.y).lineTo(doc.page.width - 65, doc.y).strokeColor('#333').lineWidth(0.5).stroke();
  doc.moveDown(0.6);
}

function qaBlock(q: string, a: string) {
  doc.moveDown(0.3);
  doc.fillColor(LIME).font('Helvetica-Bold').fontSize(10).text('Q: ' + q, 65, doc.y, { width: pageWidth() });
  doc.moveDown(0.2);
  doc.fillColor('#cccccc').font('Helvetica').fontSize(10).text('A: ' + a, 65, doc.y, { width: pageWidth(), lineGap: 3 });
  doc.moveDown(0.5);
}

function pageHeader(text: string) {
  doc.addPage();
  // Dark background
  doc.rect(0, 0, doc.page.width, doc.page.height).fill('#0d0d0d');
  doc.rect(0, 0, doc.page.width, 4).fill(LIME);
  doc.moveDown(0.5);
}

// ─── COVER ───────────────────────────────────────────────────────────────────
coverPage();

// ─── SECTION 1: PRODUCT OVERVIEW ─────────────────────────────────────────────
pageHeader('Section 1');
h1('1. PRODUCT OVERVIEW & MISSION');

h2('What is FitAI?');
body(
  'FitAI is a production-ready, mobile-first web application designed for gym enthusiasts ' +
  'and serious athletes who want intelligent, data-driven fitness guidance. It is built as a ' +
  'comprehensive fitness companion that covers every stage of the training lifecycle — planning, ' +
  'execution, recovery, nutrition, and community accountability.'
);

h2('Core Mission');
body(
  '"Your AI-Powered Fitness Companion" — FitAI exists to stop people from guessing in the gym. ' +
  'It builds personalized workout plans, tracks every rep and PR, and adapts to the user\'s real ' +
  'life so they keep making progress no matter what.'
);

h2('Target Users');
bullet([
  'Gym beginners who need structured, guided programs',
  'Intermediate lifters who want to track progress and break plateaus',
  'Advanced athletes who need detailed analytics and progressive overload tracking',
  'Anyone who wants AI-assisted meal planning aligned to their training goals',
  'People who benefit from social accountability through community challenges',
]);

h2('Key Value Propositions');
bullet([
  'Personalized AI workout plans generated in seconds via a step-by-step wizard',
  'Full exercise library with 10 curated exercises covering every major muscle group',
  'Visual progress tracking with charts powered by Recharts',
  'Gamification: XP points, levels, badges, weekly challenges, and a global leaderboard',
  'Integrated meal planner with macro breakdowns for 3 goals',
  'Smart rest timer with AI-suggested rest periods',
  'Noupe AI chatbot integration point for real-time fitness Q&A',
]);

h2('Technology Stack');
kv('Frontend', 'React 18 + Vite 7');
kv('Styling', 'Tailwind CSS v4 + shadcn/ui components');
kv('Animations', 'Framer Motion (page transitions, scroll reveals, micro-interactions)');
kv('Routing', 'Wouter (lightweight client-side router)');
kv('Charts', 'Recharts (LineChart for progress tracking)');
kv('Forms', 'react-hook-form + Zod validation');
kv('State', 'React useState + localStorage (no backend — prototype mode)');
kv('Icons', 'Lucide React');
kv('Fonts', 'Outfit (display) + Inter (body) — Google Fonts');

h2('Platform Notes');
bullet([
  'FitAI is a prototype: all data is mock/local. No real backend or database exists.',
  'Authentication is simulated — login/signup stores a mock user in localStorage.',
  'Progress logs persist in localStorage across browser sessions.',
  'The app is fully responsive: mobile-first at 375px, tablet and desktop up to 1440px.',
  'Default theme is dark mode; light mode toggle is available in Profile > Settings.',
]);

// ─── SECTION 2: VISUAL DESIGN ────────────────────────────────────────────────
pageHeader('Section 2');
h1('2. VISUAL DESIGN & THEME');

h2('Design Philosophy');
body(
  'FitAI\'s design is dark, powerful, and energetic — "like a serious gym at midnight." ' +
  'It uses deep blacks and rich dark grays as the base, with electric lime green (#ADFF2F) ' +
  'as the single, vibrant accent color. This communicates performance, precision, and ambition.'
);

h2('Color System');
kv('Background (dark)', '#0a0a0a — near-black page background');
kv('Card (dark)', '#111111 — slightly lighter surface for cards');
kv('Secondary (dark)', '#1a1a1a — muted section backgrounds');
kv('Primary Accent', '#ADFF2F / hsl(84 100% 59%) — electric lime green');
kv('Primary Text (dark)', '#FAFAFA — near-white');
kv('Muted Text (dark)', '#888888 — secondary descriptions');
kv('Border (dark)', '#2a2a2a — subtle card borders');
kv('Background (light)', '#F8F9FA — clean off-white');
kv('Primary Accent', 'Same lime green in both modes');

h2('Typography');
kv('Display font', 'Outfit — headings, hero text, dashboard titles');
kv('Body font', 'Inter — body copy, UI labels, descriptions');
kv('Monospace', 'Built-in monospace — timer countdown display');

h2('Layout Patterns');
bullet([
  'Fixed top navbar on the landing page with a backdrop-blur glass effect',
  'Sidebar navigation on desktop (md and above breakpoint)',
  'Bottom navigation bar on mobile (below md breakpoint)',
  'Card-based layout for all feature content — consistent padding p-6 or p-7',
  'Grid system: 1 col mobile, 2 col tablet, 3 col desktop for exercise and feature grids',
  'Maximum content width of max-w-7xl centered with auto margins',
]);

h2('Animation System');
bullet([
  'Framer Motion fadeUp variants on all landing page sections (scroll-triggered)',
  'Page-level transitions: opacity + y-axis slide on route changes',
  'Staggered children animations on Dashboard cards (0.1s delay each)',
  'AnimatePresence for wizard step transitions (x-axis slide in/out)',
  'SVG circular progress stroke animation on the Rest Timer',
  'Pulsing glow effect on the AI chatbot placeholder and timer button',
]);

h2('"Powered by AI" Badge');
body(
  'A reusable <PoweredByAI> component appears on: the landing page hero, the dashboard AI ' +
  'insight card, the exercise library smart search, the workout planner header, the meal planner, ' +
  'and the rest timer. It is a small pill badge with a sparkle icon and "POWERED BY AI" text, ' +
  'styled with lime green color on a dark bordered background.'
);

// ─── SECTION 3: ARCHITECTURE ──────────────────────────────────────────────────
pageHeader('Section 3');
h1('3. APPLICATION ARCHITECTURE');

h2('File Structure');
const files = [
  ['src/App.tsx', 'Root router, ThemeProvider, Layout wrapper, all route definitions'],
  ['src/pages/Landing.tsx', 'Public landing / marketing page'],
  ['src/pages/Login.tsx', 'Login form with email + password + Google UI'],
  ['src/pages/Signup.tsx', 'Signup form with name, email, password, confirm'],
  ['src/pages/Dashboard.tsx', 'Authenticated home screen with stats and today\'s workout'],
  ['src/pages/Exercises.tsx', 'Searchable, filterable exercise library'],
  ['src/pages/WorkoutPlanner.tsx', 'Multi-step AI workout generation wizard'],
  ['src/pages/Progress.tsx', 'Workout logs, charts, and AI performance analysis'],
  ['src/pages/Challenges.tsx', 'Weekly challenges, XP rewards, and leaderboard'],
  ['src/pages/MealPlanner.tsx', 'Goal-based meal suggestions with macros'],
  ['src/pages/Timer.tsx', 'Animated rest timer with presets'],
  ['src/pages/Profile.tsx', 'User profile, settings, theme toggle, achievements'],
  ['src/components/Layout.tsx', 'Shell: sidebar (desktop), bottom nav (mobile), header'],
  ['src/components/ThemeProvider.tsx', 'Context provider for dark/light mode with localStorage'],
  ['src/components/PoweredByAI.tsx', 'Reusable "Powered by AI" badge component'],
  ['src/lib/mockData.ts', 'All static mock data: exercises, plans, challenges, meals, badges'],
  ['src/lib/localStorage.ts', 'Helpers for reading/writing progress logs to localStorage'],
];

files.forEach(([file, desc]) => {
  kv(file, desc);
});

h2('Routing Table');
const routes = [
  ['/', 'Landing page — public, no auth required'],
  ['/login', 'Login page — public'],
  ['/signup', 'Sign up page — public'],
  ['/dashboard', 'Dashboard — requires mock auth'],
  ['/exercises', 'Exercise library — accessible to all'],
  ['/workout-planner', 'Workout plan generator wizard'],
  ['/progress', 'Progress tracker with charts'],
  ['/challenges', 'Community challenges + leaderboard'],
  ['/meal-planner', 'Nutrition planner'],
  ['/timer', 'Rest timer'],
  ['/profile', 'Profile and settings'],
];

routes.forEach(([path, desc]) => {
  kv(path, desc);
});

h2('Data Storage');
body(
  'FitAI uses no backend database. All persistent state lives in the browser\'s localStorage. ' +
  'The localStorage.ts library provides three main functions:'
);
bullet([
  'getProgressLogs() — returns array of logged workout entries',
  'addProgressLog(entry) — appends a new log entry and persists to localStorage',
  'getMockUser() / setMockUser() — reads and writes the mock authenticated user',
]);
body(
  'Mock data for exercises, workout plans, challenges, meal plans, and badges lives in ' +
  'mockData.ts and is imported directly into components. It never changes unless the developer edits the file.'
);

// ─── SECTION 4: PAGES & USER FLOWS ───────────────────────────────────────────
pageHeader('Section 4');
h1('4. PAGES & USER FLOWS');

h2('4.1 Landing Page (/)');
body('The public-facing marketing page. Fully scrollable with 9 distinct sections:');
bullet([
  'Navbar — fixed, glass-blur, with "Log in" and "Sign up free" CTA buttons',
  'Hero — headline "Your AI-Powered Fitness Companion", subtext, two CTA buttons (Start for Free → /signup, Explore Exercises → /exercises), 5 avatar avatars with "Join 50,000+ athletes" trust line',
  'Stats Bar — 50K+ Active Athletes, 2M+ Workouts Logged, 98% Goal Achievement, 4.9 App Rating',
  'Features Grid — 6 feature cards (AI Workout Plans, Progress Analytics, Adaptive Training, Meal Planner, Challenges & XP, Smart Rest Timer)',
  'How It Works — 4 numbered steps with a connecting line: Set Your Goal → Get Your Plan → Train & Track → See Results',
  'Progress Callout — 4 sample stat cards (Bench Press +22 lbs, Total Volume 142K lbs, Workout Streak 34 days, Goal Progress 78%)',
  'Challenges Callout — 3 sample challenge cards with XP rewards and participant counts',
  'Testimonials — 3 user reviews with name, role, 5-star ratings, and quotes',
  '"What\'s Included" — checklist of 8 platform features with a CTA',
  'Noupe AI Chatbot placeholder — styled card with dashed border and <div id="noupe-ai-chatbot">',
  'Final CTA — "Ready to train smarter?" section with two buttons and footer',
]);

h2('4.2 Login Page (/login)');
bullet([
  'Email input field (type=email, required)',
  'Password input field (type=password, required)',
  '"Continue with Google" button — UI only, no real OAuth',
  '"Log in" submit button — on success stores mock user in localStorage and redirects to /dashboard',
  'Link to /signup for new users',
  'Form validated with react-hook-form + Zod',
]);

h2('4.3 Sign Up Page (/signup)');
bullet([
  'Full name input',
  'Email input',
  'Password input',
  'Confirm password input (must match password)',
  '"Continue with Google" button — UI only',
  '"Create Account" submit button — redirects to /dashboard',
  'Link to /login for returning users',
]);

h2('4.4 Dashboard (/dashboard)');
body('The authenticated home screen — the first thing a logged-in user sees.');
bullet([
  'Header: "Welcome back, [FirstName]" greeting, streak counter (14 days), level + XP display (Level 12, 4500 XP)',
  'AI Insight card: highlighted card with brain icon and a personalized training tip',
  '"Today\'s Plan" card: Push Day — Chest & Triceps with 4 exercises and a Start button',
  'Quick access grid: 4 shortcut cards linking to Library, Progress, Planner, Challenges',
  'Level Progress bar: shows progress to next level (65% complete, 1,500 XP needed)',
  'Noupe AI Chatbot panel: right column card with <div id="noupe-ai-chatbot"> inside',
]);

h2('4.5 Exercise Library (/exercises)');
bullet([
  'Page heading and subtitle',
  'Smart Search card (AI-badged) — text input filtering by name and description',
  'Example placeholder: "show chest exercises with dumbbells for beginners"',
  '3 filter dropdowns: Muscle Group, Equipment, Difficulty — all client-side with useState',
  '"Clear Filters" button — appears only when any filter is active',
  'Responsive grid (1 → 2 → 3 columns) of exercise cards',
  'Each card contains: YouTube demo video embed, exercise name, difficulty badge, description, muscle group tag, equipment tag',
  'Empty state: "No exercises found matching your criteria."',
]);

h2('4.6 Workout Planner (/workout-planner)');
bullet([
  'Step 0 — Primary Goal: Muscle Gain | Fat Loss | Strength | Endurance (radio buttons)',
  'Step 1 — Experience Level: Beginner | Intermediate | Advanced',
  'Step 2 — Equipment: Full Gym | Dumbbells Only | Bodyweight',
  'Step 3 — Days Per Week: 3 | 4 | 5 | 6',
  'Step 4 — "Synthesizing Your Plan" loading animation (2 second delay)',
  'Result card: plan name, description, 4 stat tiles (goal/level/days/equipment), AI Notes paragraph, two buttons: "Start This Plan" and "Copy Summary"',
  'Progress bar at top of wizard card animates from 0% to 100% across steps',
]);

h2('4.7 Progress Tracker (/progress)');
bullet([
  '"Log Workout" button opens a modal dialog with fields: exercise name, sets, reps, weight (lbs)',
  'Bench Press 1RM Projection chart: LineChart with weekly data (185→200 lbs over 5 weeks)',
  'AI Performance Analysis card: plateau detection with deload recommendation',
  '"Recent History" sidebar: reverse-chronological log of exercises with date, sets × reps, weight',
  'All logs persist in localStorage so they survive page refresh',
]);

h2('4.8 Community Challenges (/challenges)');
bullet([
  '5 active weekly challenges: 100 Pushups a Day (500 XP), Run 5k (300 XP), 7-Day Plank Challenge (400 XP), Squat Your Bodyweight (600 XP), No Sugar Week (200 XP)',
  'Each challenge shows: type badge, participant count, title, XP reward, and a "Complete Challenge" button',
  'Completing a challenge triggers a toast notification with XP earned and changes the button to "Completed"',
  'Global Leaderboard sidebar: top 5 users with XP — current user (Alex Fitness) is highlighted at rank 3',
  'Streak encouragement card: "You\'re in the top 15% of users this week."',
]);

h2('4.9 Meal Planner (/meal-planner)');
bullet([
  'Goal selector with 3 radio options: Muscle Gain, Fat Loss, Maintenance',
  'Macro overview icons: Protein, Carbs, Fats',
  'Daily meal suggestions update dynamically based on selected goal',
  'Each meal entry shows: meal name (Breakfast/Lunch/Dinner), food suggestion, macro breakdown (P/C/F grams)',
  'Hydration reminder footer card: "Aim for at least 3-4 liters of water per day"',
]);

h2('4.10 Rest Timer (/timer)');
bullet([
  'AI suggestion pill: "AI Suggests: 90s for hypertrophy goals"',
  'Large SVG circular timer: 256×256px with lime green progress stroke',
  'MM:SS countdown display in monospace font',
  'Controls: circular Reset button, large circular Play/Pause button with animated icon swap',
  '5 preset buttons: 30s, 1m, 1m30s, 2m, 3m',
  'On completion: toast notification "Rest complete! Time for your next set." + device vibration (if supported)',
]);

h2('4.11 Profile & Settings (/profile)');
bullet([
  'User avatar: circular initials (AF for Alex Fitness), Level 12 Elite badge',
  'Two tabs: "Settings & Profile" and "Achievements"',
  'Settings tab: Edit Profile form (name + email), App Preferences card (dark mode toggle, push notifications toggle)',
  'Danger Zone: "Delete Account" button (UI only)',
  'Achievements tab: 5 earned badges (First Workout, 7-Day Streak, 1000 XP Club, Strength Master, Early Bird) + 1 locked badge (Iron Master)',
]);

// ─── SECTION 5: EXERCISE LIBRARY ─────────────────────────────────────────────
pageHeader('Section 5');
h1('5. EXERCISE LIBRARY — COMPLETE CATALOGUE');

body('FitAI includes 10 curated exercises covering all major muscle groups. Each exercise has a video demo, description, muscle group tag, equipment tag, and difficulty rating.');

rule();

const exercises = [
  { id: 'E1', name: 'Barbell Bench Press', muscle: 'Chest', equipment: 'Barbell', difficulty: 'Intermediate', desc: 'A compound pushing exercise targeting the pectoralis major, anterior deltoids, and triceps. Performed lying on a flat bench, gripping the barbell at shoulder-width, lowering to the chest and pressing back up. Considered the gold-standard upper body strength exercise.' },
  { id: 'E2', name: 'Dumbbell Flyes', muscle: 'Chest', equipment: 'Dumbbell', difficulty: 'Beginner', desc: 'An isolation exercise targeting the pectoral muscles. Performed lying on a flat bench, holding dumbbells above the chest with slightly bent elbows, lowering them in a wide arc and squeezing back together. Excellent for chest development and stretching the pecs under load.' },
  { id: 'E3', name: 'Pull-ups', muscle: 'Back', equipment: 'Bodyweight', difficulty: 'Advanced', desc: 'A challenging upper-body compound exercise targeting the latissimus dorsi and biceps. Hanging from a bar with an overhand grip, pulling the body up until the chin passes the bar. One of the best indicators of relative upper-body strength.' },
  { id: 'E4', name: 'Barbell Squat', muscle: 'Legs', equipment: 'Barbell', difficulty: 'Intermediate', desc: 'The king of lower-body compound exercises. The barbell rests across the upper traps or rear delts. The athlete squats to at least parallel depth, targeting quadriceps, hamstrings, glutes, and erector spinae. Builds overall lower-body mass and strength.' },
  { id: 'E5', name: 'Leg Press', muscle: 'Legs', equipment: 'Machine', difficulty: 'Beginner', desc: 'A machine-based lower-body exercise where the user pushes a weighted platform away using both legs. Safer for beginners due to spinal support. Targets quads primarily, with secondary activation of hamstrings and glutes depending on foot placement.' },
  { id: 'E6', name: 'Overhead Press', muscle: 'Shoulders', equipment: 'Barbell', difficulty: 'Intermediate', desc: 'A standing compound press where the barbell is pressed vertically from shoulder height to lockout overhead. Primarily targets the anterior and medial deltoids, with significant triceps and upper trap involvement. Also builds core stability.' },
  { id: 'E7', name: 'Dumbbell Lateral Raise', muscle: 'Shoulders', equipment: 'Dumbbell', difficulty: 'Beginner', desc: 'An isolation exercise for the medial (side) deltoid head. Performed standing, raising dumbbells laterally to shoulder height with slightly bent elbows. Creates the "capped shoulders" aesthetic. Best performed with controlled tempo and moderate weight.' },
  { id: 'E8', name: 'Bicep Curl', muscle: 'Arms', equipment: 'Dumbbell', difficulty: 'Beginner', desc: 'The classic arm isolation exercise. Holding dumbbells at the sides, curling both or alternating arms up toward the shoulder while keeping elbows fixed. Targets the biceps brachii and brachialis. Can be performed seated or standing.' },
  { id: 'E9', name: 'Tricep Pushdown', muscle: 'Arms', equipment: 'Machine', difficulty: 'Beginner', desc: 'A cable machine isolation exercise for the triceps. Gripping a straight or V-bar attachment, the user pushes it downward while keeping elbows pinned to the sides. Excellent for tricep hypertrophy and finishing a push-day session.' },
  { id: 'E10', name: 'Plank', muscle: 'Core', equipment: 'Bodyweight', difficulty: 'Beginner', desc: 'A foundational static core stabilization exercise. Holding a straight-body position face-down, supported on forearms and toes. Builds deep core stability, transverse abdominis strength, and spinal endurance. Duration-based: typically 30–60+ seconds.' },
];

exercises.forEach((ex) => {
  h3(`${ex.id}: ${ex.name}`);
  kv('Muscle Group', ex.muscle);
  kv('Equipment', ex.equipment);
  kv('Difficulty', ex.difficulty);
  body(ex.desc, 0);
  rule();
});

h2('Filter Options Available');
kv('By Muscle Group', 'All, Chest, Back, Legs, Shoulders, Arms, Core');
kv('By Equipment', 'All, Barbell, Dumbbell, Bodyweight, Machine');
kv('By Difficulty', 'All, Beginner, Intermediate, Advanced');
body('Users can also use the Smart Search bar to search by keyword (exercise name or description).');

// ─── SECTION 6: WORKOUT PLANS ────────────────────────────────────────────────
pageHeader('Section 6');
h1('6. WORKOUT PLANS — COMPLETE CATALOGUE');

body('The AI Workout Generator creates one of 3 sample plans based on the user\'s goal, level, equipment, and days per week.');

rule();

const plans = [
  {
    id: 'WP1', name: 'Push/Pull/Legs Hypertrophy', goal: 'Muscle Gain', level: 'Intermediate',
    days: 6,
    desc: 'A 6-day PPL split optimized for maximum muscle hypertrophy. Each week the trainee performs two Push days (chest, shoulders, triceps), two Pull days (back, biceps), and two Leg days. This high-frequency approach ensures each muscle group is trained twice per week for optimal protein synthesis stimulus.',
    when: 'Selected when the user\'s goal is "muscle gain".',
    structure: [
      'Day 1 (Push): Bench Press, Incline DB Press, OHP, Lateral Raise, Tricep Pushdown',
      'Day 2 (Pull): Barbell Row, Pull-ups, Face Pull, Bicep Curl, Hammer Curl',
      'Day 3 (Legs): Barbell Squat, Romanian Deadlift, Leg Press, Leg Curl, Calf Raise',
      'Day 4–6: Repeat with variation in exercise selection',
    ],
  },
  {
    id: 'WP2', name: 'Full Body Strength', goal: 'Strength', level: 'Beginner',
    days: 3,
    desc: 'A 3-day full-body program built around the major compound lifts. Designed for beginners and anyone returning from a break. Each session trains the entire body with emphasis on progressive overload across the squat, hinge, push, and pull movement patterns. Rest days between each session allow full recovery.',
    when: 'Selected when goal is "strength" OR when user is a beginner.',
    structure: [
      'Day 1 (Mon): Barbell Squat 3×5, Bench Press 3×5, Barbell Row 3×5',
      'Day 2 (Wed): Deadlift 1×5, Overhead Press 3×5, Pull-ups 3×max',
      'Day 3 (Fri): Barbell Squat 3×5, Bench Press 3×5, Barbell Row 3×5',
    ],
  },
  {
    id: 'WP3', name: 'HIIT Fat Burner', goal: 'Fat Loss', level: 'Intermediate',
    days: 4,
    desc: 'A 4-day high-intensity interval training program designed to maximize caloric expenditure and metabolic conditioning. Combines resistance training with cardio intervals to create an "afterburn" (EPOC) effect that continues burning calories for hours post-workout.',
    when: 'Selected when the user\'s goal is "fat loss".',
    structure: [
      'Day 1: Lower body HIIT circuits — squat jumps, lunges, box steps, sled push',
      'Day 2: Upper body conditioning — push-ups, rows, burpees, battle ropes',
      'Day 3: Rest or active recovery',
      'Day 4: Full body HIIT — deadlifts, jump rope, KB swings, plank variations',
      'Day 5: Cardio intervals — 20 min HIIT on bike or treadmill',
    ],
  },
];

plans.forEach((plan) => {
  h3(`${plan.id}: ${plan.name}`);
  kv('Primary Goal', plan.goal);
  kv('Level', plan.level);
  kv('Days Per Week', String(plan.days));
  kv('When Generated', plan.when);
  body(plan.desc);
  h3('Sample Structure:');
  bullet(plan.structure, 0);
  rule();
});

h2('How Plan Selection Works');
body(
  'The wizard matches the user\'s stated goal to the closest plan. If goal = "muscle gain" → WP1. ' +
  'If goal = "strength" → WP2. If goal = "fat loss" → WP3. If goal = "endurance", the fallback is WP1. ' +
  'Future versions will generate truly dynamic plans; in the prototype, these 3 plans serve as templates.'
);

// ─── SECTION 7: MEAL PLANS ────────────────────────────────────────────────────
pageHeader('Section 7');
h1('7. MEAL PLANS & NUTRITION');

body(
  'FitAI\'s Meal Planner provides daily meal suggestions tailored to three primary goals. ' +
  'Each suggestion includes a macro breakdown showing approximate protein (P), carbohydrates (C), and fats (F) in grams.'
);

rule();

h2('Goal: Muscle Gain (Caloric Surplus)');
h3('Breakfast');
body('Oatmeal with protein powder, berries, and peanut butter');
kv('Macros', 'P: 35g, C: 60g, F: 15g');
body('High-carb, high-protein breakfast to fuel morning workouts and kick-start muscle protein synthesis.');

h3('Lunch');
body('Chicken breast, sweet potato, and broccoli');
kv('Macros', 'P: 45g, C: 50g, F: 5g');
body('Lean protein with complex carbs and micronutrient-rich vegetables. Classic muscle-building plate.');

h3('Dinner');
body('Salmon, quinoa, and asparagus');
kv('Macros', 'P: 40g, C: 45g, F: 18g');
body('Omega-3 rich protein supports joint health and inflammation reduction post-training. Quinoa provides complete amino acids.');

rule();

h2('Goal: Fat Loss (Caloric Deficit)');
h3('Breakfast');
body('Egg white scramble with spinach and tomatoes');
kv('Macros', 'P: 25g, C: 5g, F: 2g');
body('Very low calorie, high protein breakfast that preserves lean muscle while in a deficit.');

h3('Lunch');
body('Grilled turkey salad with vinaigrette');
kv('Macros', 'P: 35g, C: 15g, F: 10g');
body('Lean protein with fiber-rich vegetables and healthy fats from olive oil. Keeps hunger at bay.');

h3('Dinner');
body('White fish with cauliflower rice');
kv('Macros', 'P: 30g, C: 20g, F: 8g');
body('White fish (cod or tilapia) is extremely low in calories and high in protein. Cauliflower rice replaces carb-heavy white rice.');

rule();

h2('Goal: Maintenance (Body Recomposition)');
h3('Breakfast');
body('Greek yogurt with almonds and honey');
kv('Macros', 'P: 20g, C: 30g, F: 12g');
body('Balanced, convenient breakfast. Greek yogurt provides casein protein for sustained release.');

h3('Lunch');
body('Beef wrap with mixed greens');
kv('Macros', 'P: 30g, C: 40g, F: 15g');
body('Moderate protein, balanced macros. Good pre-workout lunch option.');

h3('Dinner');
body('Chicken stir-fry with mixed vegetables');
kv('Macros', 'P: 35g, C: 35g, F: 10g');
body('High-protein, versatile dinner with micronutrient-dense vegetables. Works for any training goal.');

rule();

h2('Hydration Guidance');
body('FitAI recommends athletes drink at least 3–4 liters of water per day, with increased intake around the workout window. Staying hydrated is critical for performance, recovery, and nutrient transport.');

h2('Pre- and Post-Workout Nutrition (General Principles)');
h3('Pre-Workout (60–90 minutes before):');
bullet([
  'Muscle Gain: complex carbs + moderate protein (e.g., oats + protein shake)',
  'Fat Loss: light protein + minimal carbs (e.g., egg whites + small fruit)',
  'Maintenance: balanced snack (e.g., banana + peanut butter)',
]);
h3('Post-Workout (within 30–60 minutes):');
bullet([
  'Protein is the priority to initiate muscle protein synthesis',
  'Muscle Gain: fast-acting carbs + whey protein shake',
  'Fat Loss: lean protein only (e.g., chicken breast, tuna)',
  'Maintenance: protein + moderate carbs to replenish glycogen',
]);

// ─── SECTION 8: CHALLENGES ───────────────────────────────────────────────────
pageHeader('Section 8');
h1('8. COMMUNITY CHALLENGES & XP SYSTEM');

body(
  'FitAI\'s Community Challenges feature drives accountability and competitive motivation through ' +
  'weekly fitness challenges, XP rewards, and a global leaderboard. Challenges are described as ' +
  '"AI-curated" — in the prototype, 5 static challenges are always active.'
);

rule();

h2('Active Weekly Challenges (Prototype Data)');

const challenges = [
  { id: 'C1', title: '100 Pushups a Day', type: 'Strength', xp: 500, participants: 1240, desc: 'Complete 100 push-ups in a single day. Can be split across multiple sets throughout the day. Targets chest, triceps, and anterior delts.' },
  { id: 'C2', title: 'Run 5k', type: 'Endurance', xp: 300, participants: 890, desc: 'Complete a 5-kilometer run at any pace, outdoors or on a treadmill. Builds cardiovascular base and mental toughness.' },
  { id: 'C3', title: '7-Day Plank Challenge', type: 'Core', xp: 400, participants: 2100, desc: 'Complete a plank hold every day for 7 consecutive days. Duration goals progress from 30 seconds on day 1 to 90+ seconds by day 7.' },
  { id: 'C4', title: 'Squat Your Bodyweight', type: 'Strength', xp: 600, participants: 450, desc: 'Perform a barbell back squat with a load equal to your own bodyweight for at least one rep. Celebrates the milestone of squatting bodyweight, a key strength benchmark.' },
  { id: 'C5', title: 'No Sugar Week', type: 'Nutrition', xp: 200, participants: 3200, desc: 'Go 7 consecutive days without added sugar. Promotes dietary discipline and blood sugar regulation. Particularly useful during fat loss phases.' },
];

challenges.forEach((c) => {
  h3(`${c.id}: ${c.title}`);
  kv('Challenge Type', c.type);
  kv('XP Reward', `+${c.xp} XP`);
  kv('Current Participants', c.participants.toLocaleString());
  body(c.desc);
  rule();
});

h2('Global Leaderboard (Sample Data)');
kv('#1 — Sarah J.', '12,400 XP');
kv('#2 — Mike T.', '11,200 XP');
kv('#3 — Alex Fitness (current user)', '4,500 XP');
kv('#4 — Chris D.', '4,200 XP');
kv('#5 — Emma W.', '3,800 XP');

body(
  'The leaderboard resets weekly. Users earn XP by completing challenges. The current user (Alex Fitness) ' +
  'is displayed in the leaderboard with a highlighted row and is described as being in the "top 15% of users this week."'
);

h2('XP Earning Summary');
bullet([
  '100 Pushups a Day: +500 XP',
  'Run 5k: +300 XP',
  '7-Day Plank Challenge: +400 XP',
  'Squat Your Bodyweight: +600 XP',
  'No Sugar Week: +200 XP',
  'Maximum weekly XP from challenges: 2,000 XP',
]);

// ─── SECTION 9: PROGRESS TRACKING ───────────────────────────────────────────
pageHeader('Section 9');
h1('9. PROGRESS TRACKING SYSTEM');

body(
  'The Progress Tracker is FitAI\'s analytics hub. Users log workouts manually and view their ' +
  'progress over time via charts. AI-generated analysis text provides actionable coaching insights.'
);

h2('Progress Log Entry Fields');
kv('Exercise Name', 'Free-text string (e.g., "Barbell Bench Press")');
kv('Date', 'Auto-populated as today\'s date (YYYY-MM-DD)');
kv('Sets', 'Integer number of sets performed');
kv('Reps', 'Integer number of reps per set');
kv('Weight', 'Weight in pounds (use 0 for bodyweight exercises)');

h2('Default Progress Log Entries (Mock Data)');
const logs = [
  { date: '2023-10-01', exercise: 'Barbell Bench Press', sets: 3, reps: 8, weight: 185 },
  { date: '2023-10-03', exercise: 'Barbell Squat', sets: 3, reps: 6, weight: 225 },
  { date: '2023-10-05', exercise: 'Pull-ups', sets: 3, reps: 10, weight: 0 },
  { date: '2023-10-08', exercise: 'Barbell Bench Press', sets: 3, reps: 8, weight: 190 },
  { date: '2023-10-10', exercise: 'Barbell Squat', sets: 3, reps: 6, weight: 235 },
];

logs.forEach(l => {
  body(`${l.date}: ${l.exercise} — ${l.sets} sets × ${l.reps} reps @ ${l.weight > 0 ? l.weight + ' lbs' : 'Bodyweight'}`);
});

h2('Bench Press Chart Data (1RM Projection)');
body('The Progress page displays a line chart showing estimated bench press 1RM over 5 weeks:');
const chartData = [
  { week: 'Week 1', weight: 185 },
  { week: 'Week 2', weight: 190 },
  { week: 'Week 3', weight: 190 },
  { week: 'Week 4', weight: 195 },
  { week: 'Week 5', weight: 200 },
];
chartData.forEach(d => body(`${d.week}: ${d.weight} lbs`));

h2('AI Performance Analysis Messages');
body('The following AI analysis text appears on the Progress page:');
body(
  '"Your bench press has plateaued at 190lbs for two weeks. This indicates central nervous system ' +
  'fatigue. Recommendation: Take a deload week on push movements, dropping volume by 40%."',
  10
);
body(
  'On the Dashboard, the AI Insight card reads: "Based on your last 3 workouts, your bench press form ' +
  'might be breaking down on the 4th set. Try dropping the weight by 5% and focus on a slow eccentric motion today."',
  10
);
body('These messages are static in the prototype but represent the type of AI coaching FitAI will provide when a real AI engine is integrated.');

h2('Body Measurements (Planned)');
body('The Progress page includes a body measurements section (UI placeholder in the prototype). Future versions will track: weight, body fat %, chest, waist, hips, arms, and legs measurements over time.');

// ─── SECTION 10: GAMIFICATION ────────────────────────────────────────────────
pageHeader('Section 10');
h1('10. GAMIFICATION: XP, LEVELS & BADGES');

h2('XP System');
body(
  'FitAI uses an experience points (XP) system to reward consistent training and challenge completion. ' +
  'XP accumulates over time and determines the user\'s level. The mock user (Alex Fitness) starts at Level 12 with 4,500 XP.'
);

kv('Current User XP', '4,500');
kv('Current Level', '12 (Elite)');
kv('XP to Next Level', '1,500 XP needed for Level 13');
kv('Progress', '65% of the way to Level 13');

h2('Leveling System');
bullet([
  'Each level requires incrementally more XP than the last',
  'Level progression is shown as a progress bar on both the Dashboard and Profile pages',
  'Level title at Level 12 is "Elite" — indicating high experience',
  'Higher levels unlock new badges and challenge types (future feature)',
]);

h2('Badge System — Complete Catalogue');
body('Users earn badges as milestones and achievements. All 5 earned badges are displayed in the Profile > Achievements tab.');

const badges = [
  { id: 'B1', name: 'First Workout', desc: 'Awarded for logging your very first workout in FitAI. Entry-level achievement to encourage new users.' },
  { id: 'B2', name: '7-Day Streak', desc: 'Awarded for logging workouts or visiting the app for 7 consecutive days. Encourages daily habit formation.' },
  { id: 'B3', name: '1000 XP Club', desc: 'Awarded when the user accumulates 1,000 XP total. Marks the transition from casual to committed user.' },
  { id: 'B4', name: 'Strength Master', desc: 'Awarded for demonstrating consistent progress in compound strength exercises (e.g., squatting bodyweight or benching 225 lbs).' },
  { id: 'B5', name: 'Early Bird', desc: 'Awarded for completing 5 workouts before 8:00 AM. Celebrates dedication and morning training consistency.' },
  { id: 'B6', name: 'Iron Master (LOCKED)', desc: 'A locked badge not yet earned by the user. Requirements are not shown in the UI — building anticipation.' },
];

badges.forEach(b => {
  h3(b.name);
  body(b.desc);
});

h2('Streak System');
body(
  'FitAI tracks workout streaks — consecutive days of training activity. The mock user has a ' +
  '14-day streak displayed prominently on the Dashboard header. A streak counter with a flame icon ' +
  'creates urgency to maintain the streak. Future: streak breaks reset the counter; streak shields can protect it.'
);

// ─── SECTION 11: REST TIMER ───────────────────────────────────────────────────
pageHeader('Section 11');
h1('11. REST TIMER');

body(
  'The Rest Timer at /timer gives athletes a precision tool for managing recovery between sets. ' +
  'AI suggests an optimal rest duration based on the user\'s training goal.'
);

h2('AI Suggestion');
body('"AI Suggests: 90s for hypertrophy goals" — this message appears in a lime green pill badge above the timer. Rest period guidance is based on the training goal set in the user\'s profile.');

h2('Rest Duration Science (behind the AI suggestions)');
bullet([
  '30 seconds — appropriate for light isolation work, supersets targeting different muscles, or endurance circuits',
  '60 seconds — standard for moderate hypertrophy work (10–15 rep range)',
  '90 seconds — optimal for hypertrophy (8–12 rep range); allows partial ATP-PC system recovery',
  '2 minutes — heavy hypertrophy / power sets (6–8 reps)',
  '3 minutes — strength-focused sets (1–5 reps); allows near-complete CNS and phosphocreatine recovery',
]);

h2('Timer Controls');
kv('Preset Buttons', '30s, 1m, 1m30s (default), 2m, 3m');
kv('Play/Pause', 'Large circular button — toggles the countdown');
kv('Reset', 'Smaller circular button — resets to the current preset duration');
kv('Completion', 'Toast notification: "Rest complete! Time for your next set." + device vibration on mobile');
kv('Visual', 'SVG circle with lime green arc that depletes as time counts down');

// ─── SECTION 12: PROFILE & SETTINGS ──────────────────────────────────────────
pageHeader('Section 12');
h1('12. PROFILE & SETTINGS');

h2('Mock User Profile Data');
kv('Name', 'Alex Fitness');
kv('Email', 'alex@example.com');
kv('Level', '12');
kv('XP', '4,500');
kv('Streak', '14 days');
kv('Primary Goal', 'Muscle Gain');

h2('Editable Profile Fields');
bullet([
  'Full Name (text input)',
  'Email address (email input)',
  'Both fields are pre-filled from mockData and can be updated',
  '"Save Changes" triggers a success toast: "Profile updated successfully"',
]);

h2('App Preferences');
kv('Dark Mode Toggle', 'Switch — toggles dark/light theme. Syncs to localStorage. Default: dark.');
kv('Push Notifications', 'Switch — UI only, no real notifications. Default: enabled.');

h2('Danger Zone');
body('"Delete Account" button is present but performs no action in the prototype. It is styled in the destructive (red) color scheme with a warning message about permanent data loss.');

h2('Theme Behavior');
bullet([
  'ThemeProvider wraps the entire app and manages a "theme" state value ("dark" or "light")',
  'Theme is persisted in localStorage under the key "fitai-theme"',
  'On mount, the ThemeProvider reads from localStorage and applies the class "dark" to document.documentElement',
  'The dark/light toggle on the Profile page calls setTheme() from the useTheme() hook',
]);

// ─── SECTION 13: AI FEATURES ─────────────────────────────────────────────────
pageHeader('Section 13');
h1('13. AI FEATURES & NOUPE AI INTEGRATION');

h2('FitAI\'s AI Philosophy');
body(
  'FitAI is described as "AI-powered" throughout the product. In the prototype, AI features are ' +
  'represented by static text outputs and smart UI patterns that simulate AI behavior. The platform ' +
  'is architecturally ready for a real AI engine to replace these static values. The Noupe AI chatbot ' +
  'is the primary real-AI integration point.'
);

h2('Current AI-Simulated Features');
bullet([
  'AI Insight on Dashboard: "Based on your last 3 workouts, your bench press form might be breaking down on the 4th set..."',
  'AI Performance Analysis on Progress: plateau detection + deload recommendation',
  'AI Workout Generator: the wizard generates a "personalized" plan from static templates based on user inputs',
  'AI Notes on generated plan: paragraph explaining why the specific plan was chosen for the user',
  'AI Suggestion on Rest Timer: "AI Suggests: 90s for hypertrophy goals"',
  'Smart Search on Exercise Library: labeled as AI-powered (client-side keyword filtering)',
  '"Powered by AI" badge: appears on 6+ locations throughout the app',
  'Adjustment suggestion on Progress: "increase bench press by 5% next week"',
]);

h2('Noupe AI Chatbot Integration Point');
body(
  'FitAI contains two dedicated mounting points for the Noupe AI chatbot. Both are implemented as ' +
  'div elements with the id "noupe-ai-chatbot" — the standard mounting convention for embedding external chatbot widgets.'
);

h3('Location 1: Landing Page (/), Noupe AI Section');
body(
  'A full-width section with the heading "Ask anything. Get expert answers instantly." ' +
  'and the subtext "Form checks, substitute exercises, nutrition questions — your AI coach is always on call." ' +
  'The chatbot div is styled with a dashed border, min-height of 260px, and centered placeholder content.'
);

h3('Location 2: Dashboard (/dashboard), Right Column');
body(
  'A card in the right sidebar column titled "FitAI Assistant" with a "Powered by AI" badge. ' +
  'The chatbot div fills the card with min-height ~400px. This is the in-app persistent access point ' +
  'so users can ask questions without leaving the dashboard.'
);

h2('Embedding the Noupe Chatbot');
body('To embed the Noupe AI chatbot into FitAI:');
bullet([
  'Locate the two <div id="noupe-ai-chatbot"> elements in Landing.tsx and Dashboard.tsx',
  'Follow Noupe\'s embedding instructions (typically a script tag + initialization call)',
  'The existing styling (border, rounded corners, background) wraps the chatbot for visual consistency',
  'No other code changes are needed — the integration points are purpose-built and production-ready',
]);

h2('Questions Noupe AI Should Be Able to Answer About FitAI');
bullet([
  'How do I generate a workout plan? → Go to /workout-planner and complete the 4-step wizard',
  'How do I log a workout? → Visit /progress and click "Log Workout"',
  'What exercises does FitAI have? → 10 exercises across chest, back, legs, shoulders, arms, and core',
  'How do I earn XP? → Complete community challenges at /challenges',
  'What is my current level? → Level 12, shown on the dashboard',
  'How do I change to light mode? → Visit /profile > Settings > dark mode toggle',
  'What meal plan should I follow? → Visit /meal-planner and select your goal',
  'How long should I rest between sets? → Use the timer at /timer (AI suggests 90s for hypertrophy)',
  'What badges can I earn? → First Workout, 7-Day Streak, 1000 XP Club, Strength Master, Early Bird',
]);

// ─── SECTION 14: FAQ ─────────────────────────────────────────────────────────
pageHeader('Section 14');
h1('14. FAQ — QUESTIONS USERS WILL ASK');

body(
  'This section is the primary training data for the Noupe AI chatbot. It covers every question ' +
  'a FitAI user is likely to ask, with accurate, detailed answers grounded in the actual product.'
);

rule();

h2('General App Questions');
qaBlock('What is FitAI?', 'FitAI is an AI-powered fitness web app that helps you discover exercises, generate personalized workout plans, track your progress, follow community challenges, and get nutrition guidance — all in one place.');
qaBlock('Is FitAI free to use?', 'Yes, FitAI is completely free during the prototype phase. All features are available with no credit card required.');
qaBlock('Do I need to create an account to use FitAI?', 'You can browse the exercise library without an account. For the dashboard, progress tracking, workout planner, and challenges, you\'ll need to sign up.');
qaBlock('Does FitAI work on my phone?', 'Yes. FitAI is mobile-first and works on any device — phone, tablet, or desktop. On mobile you\'ll see a bottom navigation bar instead of a sidebar.');
qaBlock('Is my data saved?', 'Your progress logs and settings are saved locally in your browser. This means they persist across visits but won\'t carry over if you use a different browser or device.');

h2('Exercise Library Questions');
qaBlock('How many exercises are in the library?', 'FitAI currently has 10 exercises covering all major muscle groups: chest, back, legs, shoulders, arms, and core.');
qaBlock('Can I search for exercises?', 'Yes. Use the Smart Search bar at the top of the Exercise Library page. You can search by name, description, or natural language like "chest exercises with dumbbells for beginners".');
qaBlock('How do I filter exercises by muscle group?', 'Use the Muscle Group dropdown filter. Options include: All, Chest, Back, Legs, Shoulders, Arms, and Core.');
qaBlock('What equipment options are available?', 'You can filter exercises by: Barbell, Dumbbell, Bodyweight, and Machine.');
qaBlock('What does each exercise card show?', 'Each card shows a video demo, the exercise name, difficulty badge (Beginner/Intermediate/Advanced), a brief description, muscle group tag, and equipment tag.');

h2('Workout Plan Questions');
qaBlock('How does the Workout Plan Generator work?', 'Go to /workout-planner and answer 4 questions: your goal, experience level, available equipment, and how many days per week you can train. FitAI then generates a personalized workout plan.');
qaBlock('What workout plans are available?', '3 plans: Push/Pull/Legs Hypertrophy (muscle gain, 6 days/week), Full Body Strength (strength/beginner, 3 days/week), and HIIT Fat Burner (fat loss, 4 days/week).');
qaBlock('Which plan should I pick for muscle gain?', 'FitAI will recommend the Push/Pull/Legs Hypertrophy plan — a 6-day split that trains each muscle group twice per week for maximum growth stimulus.');
qaBlock('I\'m a beginner — what plan is best for me?', 'FitAI will recommend the Full Body Strength plan — a 3-day program focused on compound lifts with full recovery between sessions. Perfect for building a strong foundation.');
qaBlock('Can I share my workout plan?', 'Yes. After the plan is generated, click "Copy Summary" to copy the plan details to your clipboard, which you can then share anywhere.');

h2('Progress Tracking Questions');
qaBlock('How do I log a workout?', 'Go to /progress and click the "Log Workout" button. Fill in the exercise name, number of sets, reps, and weight, then click Save.');
qaBlock('Are my workout logs saved permanently?', 'They are saved in your browser\'s localStorage, so they persist across page refreshes. They won\'t sync across devices or browsers.');
qaBlock('What does the progress chart show?', 'The chart shows your estimated Bench Press 1RM (one-rep max) progression over 5 weeks, giving you a visual view of your strength curve.');
qaBlock('What does the AI suggest on the Progress page?', 'FitAI analyzes your recent logs and provides coaching insights, such as detecting plateaus and recommending a deload week when progress stalls.');
qaBlock('What are bodyweight exercises logged as?', 'Enter 0 in the weight field for bodyweight exercises. FitAI displays these as "BW" in the log.');

h2('Challenges & XP Questions');
qaBlock('How do I complete a challenge?', 'Go to /challenges, find a challenge you want to complete, and click the "Complete Challenge" button. You\'ll receive an XP reward and a confirmation toast.');
qaBlock('How much XP do challenges reward?', '100 Pushups a Day: 500 XP, Run 5k: 300 XP, 7-Day Plank Challenge: 400 XP, Squat Your Bodyweight: 600 XP, No Sugar Week: 200 XP.');
qaBlock('Where is the leaderboard?', 'On the /challenges page in the right sidebar. It shows the top 5 users by XP for the current week. Your position is highlighted.');
qaBlock('What is my current ranking?', 'The mock user (Alex Fitness) is ranked #3 on the global leaderboard with 4,500 XP.');
qaBlock('How do I level up?', 'Earn XP by completing challenges. The dashboard shows your progress bar to the next level. The current user needs 1,500 more XP to reach Level 13.');

h2('Meal Planner Questions');
qaBlock('How does the Meal Planner work?', 'Go to /meal-planner and select your primary goal (Muscle Gain, Fat Loss, or Maintenance). FitAI instantly shows a daily meal plan with breakfast, lunch, and dinner suggestions and macro breakdowns.');
qaBlock('What should I eat for muscle gain?', 'For muscle gain: Breakfast — oatmeal with protein powder, berries, and peanut butter (P:35g C:60g F:15g). Lunch — chicken breast, sweet potato, broccoli (P:45g C:50g F:5g). Dinner — salmon, quinoa, asparagus (P:40g C:45g F:18g).');
qaBlock('What should I eat for fat loss?', 'For fat loss: Breakfast — egg white scramble with spinach and tomatoes (P:25g C:5g F:2g). Lunch — grilled turkey salad with vinaigrette (P:35g C:15g F:10g). Dinner — white fish with cauliflower rice (P:30g C:20g F:8g).');
qaBlock('How much water should I drink?', 'FitAI recommends 3–4 liters of water per day, especially around your workout window.');

h2('Rest Timer Questions');
qaBlock('How do I use the Rest Timer?', 'Go to /timer. Select a preset duration (30s, 1m, 1m30s, 2m, or 3m), then press the Play button. It counts down and notifies you when rest is over.');
qaBlock('How long should I rest between sets?', 'FitAI\'s AI suggests 90 seconds for hypertrophy goals. For strength training (heavy compound lifts), rest 2–3 minutes. For endurance circuits, 30–60 seconds is appropriate.');
qaBlock('Does the timer make a sound when it ends?', 'Yes — a toast notification pops up saying "Rest complete! Time for your next set." On mobile devices that support it, your phone will also vibrate.');

h2('Profile & Account Questions');
qaBlock('How do I switch to light mode?', 'Go to /profile, select the "Settings & Profile" tab, and toggle the "Dark Mode" switch to off. The change applies instantly and is remembered.');
qaBlock('How do I update my profile information?', 'Go to /profile > Settings & Profile tab. Edit your name or email in the "Edit Profile" form and click "Save Changes".');
qaBlock('What badges have I earned?', 'The current mock user has earned: First Workout, 7-Day Streak, 1000 XP Club, Strength Master, and Early Bird. One badge (Iron Master) is still locked.');
qaBlock('What is my current streak?', 'The mock user has a 14-day streak, shown on the Dashboard with an orange flame icon.');
qaBlock('How do I delete my account?', 'Go to /profile > Settings & Profile > Danger Zone and click "Delete Account". Note: in the prototype, this button does not perform any real action.');

h2('Technical & Troubleshooting Questions');
qaBlock('Why did my logged workouts disappear?', 'Progress logs are stored in your browser\'s localStorage. They can be cleared if you clear your browser data, use private/incognito mode, or switch to a different browser.');
qaBlock('Can I use FitAI offline?', 'The app loads from the web, so an initial internet connection is required. Once loaded, most features (timer, exercise library, progress logs) work without an active connection since data is stored locally.');
qaBlock('Why is the AI chatbot showing as a placeholder?', 'The Noupe AI chatbot is an external integration that will be embedded once fully configured. The placeholder marks exactly where it will appear. The app is ready for the integration.');
qaBlock('How do I navigate between pages?', 'On desktop: use the sidebar on the left. On mobile: use the bottom navigation bar. You can also navigate directly to any page by entering its URL path.');

// ─── FINAL PAGE: DOCUMENT INFO ────────────────────────────────────────────────
doc.addPage();
doc.rect(0, 0, doc.page.width, doc.page.height).fill(BLACK);
doc.rect(0, 0, doc.page.width, 4).fill(LIME);

doc.moveDown(3);
doc.fillColor(LIME).font('Helvetica-Bold').fontSize(18).text('FitAI Training Data — End of Document', 65, doc.y, { align: 'center', width: pageWidth() });
doc.moveDown(1);
doc.fillColor(LGRAY).font('Helvetica').fontSize(11).text('This document covers 100% of FitAI\'s features, pages, data, and user interactions.', 65, doc.y, { align: 'center', width: pageWidth() });
doc.moveDown(0.5);
doc.fillColor(LGRAY).font('Helvetica').fontSize(11).text('Generated: June 15, 2026', 65, doc.y, { align: 'center', width: pageWidth() });
doc.moveDown(0.5);
doc.fillColor(LGRAY).font('Helvetica').fontSize(11).text('Version: 1.0', 65, doc.y, { align: 'center', width: pageWidth() });

// Page numbers — injected before end() so bufferPages can flush them
const range = doc.bufferedPageRange();
const totalPages = range.count - 1; // exclude cover page
for (let i = 0; i < range.count; i++) {
  doc.switchToPage(range.start + i);
  if (i > 0) {
    doc
      .fillColor(MGRAY)
      .font('Helvetica')
      .fontSize(8)
      .text(
        `FitAI Training Data — Page ${i} of ${totalPages}`,
        65,
        doc.page.height - 40,
        { width: pageWidth(), align: 'center' }
      );
  }
}

doc.end();

stream.on('finish', () => {
  console.log(`PDF generated: ${OUT_PATH}`);
});

stream.on('error', (err) => {
  console.error('PDF generation error:', err);
  process.exit(1);
});
