import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import {
  Dumbbell, ArrowRight, Zap, BrainCircuit, Activity, Trophy,
  Users, Flame, ChevronRight, CheckCircle2, Star, Target,
  BarChart3, Clock, Utensils, ShieldCheck, TrendingUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PoweredByAI } from '@/components/PoweredByAI';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }
  })
};

const STATS = [
  { value: '50K+', label: 'Active Athletes' },
  { value: '2M+', label: 'Workouts Logged' },
  { value: '98%', label: 'Goal Achievement' },
  { value: '4.9', label: 'App Rating' },
];

const FEATURES = [
  {
    icon: BrainCircuit,
    title: 'AI Workout Plans',
    desc: 'Tell FitAI your goal, experience, and schedule. It generates a fully personalized program that evolves week over week.',
  },
  {
    icon: Activity,
    title: 'Progress Analytics',
    desc: 'Track every set, rep, and PR. Beautiful charts show your strength curves and body composition changes over time.',
  },
  {
    icon: Zap,
    title: 'Adaptive Training',
    desc: 'Missed a session? FitAI reshuffles your week automatically so you never fall off the plan.',
  },
  {
    icon: Utensils,
    title: 'Meal Planner',
    desc: 'Get pre- and post-workout meal suggestions tailored to your calorie target and macronutrient goals.',
  },
  {
    icon: Trophy,
    title: 'Challenges & XP',
    desc: 'Compete in weekly challenges, earn XP, and climb leaderboards. Fitness that keeps you accountable.',
  },
  {
    icon: Clock,
    title: 'Smart Rest Timer',
    desc: 'AI-suggested rest periods based on your last set intensity. Never rest too long or too short again.',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Set Your Goal',
    desc: 'Tell FitAI what you want — build muscle, burn fat, or improve endurance. Takes 60 seconds.',
  },
  {
    step: '02',
    title: 'Get Your Plan',
    desc: 'Receive a fully personalized workout and nutrition plan built around your schedule and equipment.',
  },
  {
    step: '03',
    title: 'Train & Track',
    desc: 'Log workouts, track PRs, and watch FitAI adjust your plan in real time as you improve.',
  },
  {
    step: '04',
    title: 'See Results',
    desc: 'Monitor progress with analytics that clearly show you how far you\'ve come — and what\'s next.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Marcus Reid',
    role: 'Powerlifter, 3 years',
    rating: 5,
    quote: 'I\'ve tried every fitness app out there. FitAI is the only one that actually adjusts when my life gets busy. Gained 18 lbs of muscle in 6 months.',
  },
  {
    name: 'Sofia Marchetti',
    role: 'Marathon runner',
    rating: 5,
    quote: 'The meal planner alone is worth it. FitAI pairs my nutrition to my training load automatically — no more guessing before a long run.',
  },
  {
    name: 'Devon Clarke',
    role: 'Beginner, lost 30 lbs',
    rating: 5,
    quote: 'I had zero gym experience. FitAI walked me through every exercise with clear instructions. I never felt lost or overwhelmed.',
  },
];

const PLAN_FEATURES = [
  'Unlimited workout plans',
  'AI progress analytics',
  'Exercise video library',
  'Meal planner & macros',
  'Community challenges',
  'Smart rest timer',
  'Badge & XP system',
  'Dark & light mode',
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden selection:bg-primary/30">

      {/* ── Navbar ── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Dumbbell className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl tracking-tight">FitAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#testimonials" className="hover:text-foreground transition-colors">Reviews</a>
          </div>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" data-testid="btn-login-nav">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" data-testid="btn-signup-nav">Sign up free</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-40 pb-28 px-6 flex flex-col items-center text-center overflow-hidden">
        {/* background glow */}
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-primary/15 blur-[140px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-64 left-1/4 w-[300px] h-[300px] bg-primary/8 blur-[100px] rounded-full pointer-events-none -z-10" />

        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="mb-6">
          <PoweredByAI />
        </motion.div>

        <motion.h1
          custom={1} variants={fadeUp} initial="hidden" animate="visible"
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-6 max-w-5xl"
        >
          Your AI-Powered{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-primary/50">
            Fitness Companion
          </span>
        </motion.h1>

        <motion.p
          custom={2} variants={fadeUp} initial="hidden" animate="visible"
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed"
        >
          Stop guessing in the gym. FitAI builds personalized workout plans, tracks every rep and PR,
          and adapts to your real life — so you keep making progress no matter what.
        </motion.p>

        <motion.div
          custom={3} variants={fadeUp} initial="hidden" animate="visible"
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <Link href="/signup">
            <Button size="lg" className="gap-2 group px-8 text-base" data-testid="btn-get-started">
              Start for Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/exercises">
            <Button size="lg" variant="outline" className="px-8 text-base" data-testid="btn-explore">
              Explore Exercises
            </Button>
          </Link>
        </motion.div>

        {/* Trust line */}
        <motion.div
          custom={4} variants={fadeUp} initial="hidden" animate="visible"
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <div className="flex -space-x-2">
            {['M', 'S', 'D', 'K', 'R'].map((l, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center text-xs font-bold text-primary"
              >
                {l}
              </div>
            ))}
          </div>
          <span>Join <strong className="text-foreground">50,000+</strong> athletes already training smarter</span>
        </motion.div>
      </section>

      {/* ── Stats Bar ── */}
      <section className="py-12 px-6 border-y border-border/50 bg-card/30">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              custom={i} variants={fadeUp} initial="hidden"
              whileInView="visible" viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            custom={0} variants={fadeUp} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">Everything you need</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">Built for serious athletes</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              FitAI isn't a workout app. It's a full training system — plans, nutrition, analytics, and community in one place.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                custom={i} variants={fadeUp} initial="hidden"
                whileInView="visible" viewport={{ once: true }}
                className="group bg-card rounded-2xl border border-border hover:border-primary/40 p-7 transition-all hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <f.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="py-28 px-6 bg-secondary/20 border-y border-border/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            custom={0} variants={fadeUp} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">Simple process</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">How FitAI works</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              From zero to your first AI-generated workout in under two minutes.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* connector line */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            {HOW_IT_WORKS.map((step, i) => (
              <motion.div
                key={i}
                custom={i} variants={fadeUp} initial="hidden"
                whileInView="visible" viewport={{ once: true }}
                className="relative flex flex-col items-center text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 z-10">
                  <span className="text-primary font-bold text-lg">{step.step}</span>
                </div>
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deep Feature Callout: Progress ── */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            custom={0} variants={fadeUp} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">Progress tracking</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              See exactly how strong you're getting
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Every workout you log feeds FitAI's analytics engine. Watch strength curves climb,
              track personal records, and get AI suggestions like "increase bench press by 5% next week."
            </p>
            <ul className="space-y-4 mb-10">
              {[
                'Strength curves for every exercise',
                'Body measurement tracking',
                'Weekly volume heatmaps',
                'AI-generated weekly reports',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/signup">
              <Button className="gap-2 group" data-testid="btn-cta-progress">
                Start tracking <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            custom={1} variants={fadeUp} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: TrendingUp, label: 'Bench Press', value: '+22 lbs', sub: 'Last 90 days', color: 'text-primary' },
              { icon: BarChart3, label: 'Total Volume', value: '142K lbs', sub: 'This month', color: 'text-primary' },
              { icon: Flame, label: 'Workout Streak', value: '34 days', sub: 'Personal best', color: 'text-primary' },
              { icon: Target, label: 'Goal Progress', value: '78%', sub: 'Muscle gain', color: 'text-primary' },
            ].map((card, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl p-5">
                <card.icon className={`w-6 h-6 ${card.color} mb-3`} />
                <div className="text-xs text-muted-foreground mb-1">{card.label}</div>
                <div className="text-2xl font-bold mb-1">{card.value}</div>
                <div className="text-xs text-muted-foreground">{card.sub}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Deep Feature Callout: Challenges ── */}
      <section className="py-28 px-6 bg-secondary/20 border-y border-border/50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            custom={1} variants={fadeUp} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
            className="order-2 lg:order-1 space-y-4"
          >
            {[
              { label: '30-Day Push-Up Challenge', xp: '500 XP', participants: '2,341', done: true },
              { label: '10K Steps Daily', xp: '300 XP', participants: '5,892', done: false },
              { label: 'Deadlift 2x Bodyweight', xp: '750 XP', participants: '1,104', done: false },
            ].map((c, i) => (
              <div key={i} className={`bg-card border rounded-xl p-5 flex items-center justify-between transition-all ${c.done ? 'border-primary/40' : 'border-border'}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${c.done ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    {c.done ? <CheckCircle2 className="w-4 h-4" /> : <Trophy className="w-4 h-4 text-muted-foreground" />}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{c.label}</div>
                    <div className="text-xs text-muted-foreground">{c.participants} athletes competing</div>
                  </div>
                </div>
                <span className="text-primary text-sm font-bold">{c.xp}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            custom={0} variants={fadeUp} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">Community</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Compete, earn XP, and never skip leg day
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Weekly AI-curated challenges keep your training fresh. Earn XP, unlock badges, and climb
              the leaderboard alongside thousands of athletes worldwide.
            </p>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">150+</div>
                <div className="text-xs text-muted-foreground mt-1">Challenges completed</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">8,500</div>
                <div className="text-xs text-muted-foreground mt-1">XP earned on avg</div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">12</div>
                <div className="text-xs text-muted-foreground mt-1">New badges/month</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            custom={0} variants={fadeUp} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">Real results</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">Athletes who changed their training</h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Don't take our word for it. Here's what real FitAI users say.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                custom={i} variants={fadeUp} initial="hidden"
                whileInView="visible" viewport={{ once: true }}
                className="bg-card border border-border rounded-2xl p-7 flex flex-col"
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-foreground mb-6 flex-1">"{t.quote}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="py-28 px-6 bg-secondary/20 border-y border-border/50">
        <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            custom={0} variants={fadeUp} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">Everything included</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              One app. Every tool you need to get jacked.
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              No upsells, no locked features. Every FitAI capability is available from day one,
              completely free during the prototype phase.
            </p>
            <Link href="/signup">
              <Button size="lg" className="gap-2 group" data-testid="btn-cta-included">
                Create your free account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            custom={1} variants={fadeUp} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 gap-3"
          >
            {PLAN_FEATURES.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-card border border-border rounded-xl px-5 py-3">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
                <span className="text-sm font-medium">{item}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Noupe AI Chatbot ── */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            custom={0} variants={fadeUp} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
          >
            <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-4 block">AI assistant</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-5">Ask anything. Get expert answers instantly.</h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto">
              Form checks, substitute exercises, nutrition questions — your AI coach is always on call.
            </p>
          </motion.div>

          <motion.div
            custom={1} variants={fadeUp} initial="hidden"
            whileInView="visible" viewport={{ once: true }}
            className="relative rounded-2xl border border-primary/20 bg-card p-1 shadow-2xl shadow-primary/10"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold tracking-wide flex items-center gap-1.5">
              <BrainCircuit className="w-3.5 h-3.5" /> AI-Powered
            </div>
            {/* Noupe AI Chatbot Integration Point */}
            <div id="noupe-ai-chatbot" className="rounded-xl border border-dashed border-primary/30 p-12 flex flex-col items-center justify-center bg-background/50 min-h-[260px]">
              <BrainCircuit className="w-12 h-12 text-primary/30 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Noupe AI Chatbot</h3>
              <p className="text-sm text-muted-foreground max-w-sm">
                Noupe AI chatbot will be embedded here. Ask for form checks, substitute exercises, or nutrition advice instantly.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <motion.div
          custom={0} variants={fadeUp} initial="hidden"
          whileInView="visible" viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center relative z-10"
        >
          <PoweredByAI className="mb-6 mx-auto" />
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Ready to train smarter?
          </h2>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            Join thousands of athletes who've already stopped guessing and started progressing with FitAI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="gap-2 group px-10 text-base" data-testid="btn-final-cta">
                Start for Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="px-10 text-base" data-testid="btn-view-demo">
                View Demo
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-6">No credit card required. Free forever during beta.</p>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-10 px-6 border-t border-border/50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold tracking-tight">FitAI</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Built with AI. Train with intelligence.
          </p>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">50,000+ athletes worldwide</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
