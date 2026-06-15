import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Flame, Star, Trophy, Activity, Target, BrainCircuit, Play, Dumbbell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { PoweredByAI } from '@/components/PoweredByAI';
import { mockUser } from '@/lib/mockData';

export default function Dashboard() {
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVars = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Welcome back, {mockUser.name.split(' ')[0]}</h1>
          <p className="text-muted-foreground">Let's crush today's goals.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-card border rounded-lg px-4 py-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Streak</p>
              <p className="font-bold">{mockUser.streak} Days</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-card border rounded-lg px-4 py-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Level {mockUser.level}</p>
              <p className="font-bold">{mockUser.xp} XP</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Tip */}
          <motion.div variants={itemVars}>
            <Card className="border-primary/20 bg-primary/5 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-4">
                <PoweredByAI />
              </div>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <BrainCircuit className="w-6 h-6 text-primary" />
                  </div>
                  <div className="space-y-2 max-w-[80%]">
                    <h3 className="font-bold text-lg">AI Insight</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Based on your last 3 workouts, your bench press form might be breaking down on the 4th set. Try dropping the weight by 5% and focus on a slow eccentric motion today.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Workout of the Day */}
          <motion.div variants={itemVars}>
            <Card>
              <CardHeader className="flex flex-row items-start justify-between pb-2">
                <div>
                  <CardTitle>Today's Plan</CardTitle>
                  <CardDescription>Push Day - Chest & Triceps</CardDescription>
                </div>
                <Button size="sm" className="gap-2" data-testid="btn-start-workout">
                  <Play className="w-4 h-4" fill="currentColor" /> Start
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mt-4">
                  {[
                    { name: 'Barbell Bench Press', sets: '4 sets x 8 reps' },
                    { name: 'Incline Dumbbell Press', sets: '3 sets x 10 reps' },
                    { name: 'Tricep Pushdowns', sets: '3 sets x 12 reps' },
                    { name: 'Lateral Raises', sets: '4 sets x 15 reps' },
                  ].map((ex, i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-secondary/50">
                      <span className="font-medium">{ex.name}</span>
                      <span className="text-sm text-muted-foreground">{ex.sets}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Access */}
          <motion.div variants={itemVars} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { title: 'Library', icon: Dumbbell, href: '/exercises', color: 'text-blue-500' },
              { title: 'Progress', icon: Activity, href: '/progress', color: 'text-green-500' },
              { title: 'Planner', icon: Target, href: '/workout-planner', color: 'text-purple-500' },
              { title: 'Challenges', icon: Trophy, href: '/challenges', color: 'text-yellow-500' },
            ].map((item, i) => (
              <Link key={i} href={item.href}>
                <Card className="hover:border-primary/50 transition-colors cursor-pointer hover:bg-secondary/20 active:scale-95 duration-200">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-2">
                    <item.icon className={`w-8 h-8 ${item.color}`} />
                    <span className="font-medium text-sm">{item.title}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </motion.div>
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          {/* Progress to Next Level */}
          <motion.div variants={itemVars}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Level Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm mb-2">
                  <span>Level {mockUser.level}</span>
                  <span>Level {mockUser.level + 1}</span>
                </div>
                <Progress value={65} className="h-2 mb-2" />
                <p className="text-xs text-muted-foreground text-right">1,500 XP needed</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Noupe Chatbot */}
          <motion.div variants={itemVars} className="h-full">
            <Card className="h-full min-h-[400px] flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  FitAI Assistant <PoweredByAI />
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col relative">
                <div id="noupe-ai-chatbot" className="absolute inset-4 mt-0 rounded-xl border border-dashed border-primary/20 bg-secondary/20 flex flex-col items-center justify-center text-center p-4">
                  <BrainCircuit className="w-8 h-8 text-primary/40 mb-2" />
                  <p className="text-sm text-muted-foreground">Noupe AI chatbot will be embedded here.</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
