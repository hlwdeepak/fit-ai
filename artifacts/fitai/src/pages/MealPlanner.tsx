import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Droplet, Apple, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { mealPlans } from '@/lib/mockData';
import { PoweredByAI } from '@/components/PoweredByAI';

type Goal = keyof typeof mealPlans;

export default function MealPlanner() {
  const [goal, setGoal] = useState<Goal>('muscle gain');

  const currentPlan = mealPlans[goal];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Nutrition Planner</h1>
          <p className="text-muted-foreground">Fuel your body for optimal performance.</p>
        </div>
        <PoweredByAI />
      </div>

      {/* Goal Selector */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" /> Select Your Primary Goal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={goal} 
            onValueChange={(v) => setGoal(v as Goal)} 
            className="grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              { id: 'muscle gain', label: 'Muscle Gain', desc: 'Caloric surplus' },
              { id: 'fat loss', label: 'Fat Loss', desc: 'Caloric deficit' },
              { id: 'maintenance', label: 'Maintenance', desc: 'Body recomposition' }
            ].map((g) => (
              <div key={g.id} className="relative">
                <RadioGroupItem value={g.id} id={`goal-${g.id}`} className="peer sr-only" />
                <Label 
                  htmlFor={`goal-${g.id}`} 
                  className="flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer hover:bg-secondary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all"
                >
                  <span className="font-bold mb-1 capitalize">{g.label}</span>
                  <span className="text-xs text-muted-foreground">{g.desc}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Macros Overview */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Protein', icon: Apple, color: 'text-red-500' },
          { label: 'Carbs', icon: Utensils, color: 'text-blue-500' },
          { label: 'Fats', icon: Droplet, color: 'text-yellow-500' },
        ].map((macro, i) => (
          <Card key={i} className="bg-secondary/30 border-none">
            <CardContent className="p-4 flex flex-col items-center justify-center text-center">
              <macro.icon className={`w-6 h-6 mb-2 ${macro.color}`} />
              <p className="font-bold uppercase tracking-wider text-sm">{macro.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Meal Plan */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          Daily Menu Suggestion
        </h2>
        
        <div className="grid gap-4">
          {currentPlan.map((meal, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card>
                <div className="flex flex-col sm:flex-row sm:items-center p-6 gap-4">
                  <div className="w-24 shrink-0">
                    <p className="font-bold text-lg text-primary">{meal.meal}</p>
                  </div>
                  <div className="flex-1 border-l sm:pl-6 pl-0 border-border">
                    <p className="font-medium text-foreground mb-2">{meal.suggestion}</p>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
                      {meal.macros}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      
      <Card className="border-dashed bg-transparent">
        <CardContent className="p-6 text-center space-y-2">
          <p className="text-muted-foreground text-sm">
            Hydration is key. Aim for at least 3-4 liters of water per day, especially around your workout window.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
