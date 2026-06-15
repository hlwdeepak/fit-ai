import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainCircuit, CheckCircle2, ChevronRight, ArrowLeft, Copy, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { PoweredByAI } from '@/components/PoweredByAI';
import { useToast } from '@/hooks/use-toast';
import { workoutPlans } from '@/lib/mockData';

const STEPS = [
  { id: 'goal', title: 'Primary Goal' },
  { id: 'level', title: 'Experience' },
  { id: 'equipment', title: 'Equipment' },
  { id: 'days', title: 'Frequency' },
  { id: 'generating', title: 'AI Magic' }
];

export default function WorkoutPlanner() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    goal: '',
    level: '',
    equipment: '',
    days: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<any>(null);
  const { toast } = useToast();

  const handleNext = () => {
    if (step === 3) {
      // Generate step
      setIsGenerating(true);
      setStep(4);
      setTimeout(() => {
        setIsGenerating(false);
        // Mock matching logic
        const selectedPlan = workoutPlans.find(p => p.goal === formData.goal) || workoutPlans[0];
        setPlan(selectedPlan);
      }, 2000);
    } else {
      setStep(s => Math.min(s + 1, 4));
    }
  };

  const handleBack = () => setStep(s => Math.max(s - 1, 0));

  const canProceed = () => {
    switch(step) {
      case 0: return !!formData.goal;
      case 1: return !!formData.level;
      case 2: return !!formData.equipment;
      case 3: return !!formData.days;
      default: return false;
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`My FitAI Plan: ${plan.name} - ${plan.description}`);
    toast({ title: "Copied to clipboard" });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 mt-4 md:mt-8">
      <div className="text-center space-y-2">
        <div className="inline-flex justify-center mb-4">
          <PoweredByAI />
        </div>
        <h1 className="text-3xl font-display font-bold">AI Workout Generator</h1>
        <p className="text-muted-foreground">Let our intelligence build your perfect routine.</p>
      </div>

      {!plan ? (
        <Card className="border-primary/20 overflow-hidden relative">
          {/* Progress bar */}
          <div className="h-1 w-full bg-secondary">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: '0%' }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <CardContent className="p-6 sm:p-10 min-h-[400px] flex flex-col">
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div 
                  key="step0"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 space-y-6"
                >
                  <h2 className="text-2xl font-bold">What's your primary goal?</h2>
                  <RadioGroup value={formData.goal} onValueChange={(v) => setFormData({...formData, goal: v})} className="grid gap-3">
                    {['Muscle Gain', 'Fat Loss', 'Strength', 'Endurance'].map((g) => (
                      <div key={g} className="flex items-center space-x-3 border rounded-xl p-4 cursor-pointer hover:bg-secondary/50 transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                        <RadioGroupItem value={g.toLowerCase()} id={`goal-${g}`} />
                        <Label htmlFor={`goal-${g}`} className="flex-1 cursor-pointer font-medium">{g}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 space-y-6"
                >
                  <h2 className="text-2xl font-bold">What's your experience level?</h2>
                  <RadioGroup value={formData.level} onValueChange={(v) => setFormData({...formData, level: v})} className="grid gap-3">
                    {['Beginner', 'Intermediate', 'Advanced'].map((l) => (
                      <div key={l} className="flex items-center space-x-3 border rounded-xl p-4 cursor-pointer hover:bg-secondary/50 transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                        <RadioGroupItem value={l.toLowerCase()} id={`level-${l}`} />
                        <Label htmlFor={`level-${l}`} className="flex-1 cursor-pointer font-medium">{l}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 space-y-6"
                >
                  <h2 className="text-2xl font-bold">What equipment do you have?</h2>
                  <RadioGroup value={formData.equipment} onValueChange={(v) => setFormData({...formData, equipment: v})} className="grid gap-3">
                    {['Full Gym', 'Dumbbells Only', 'Bodyweight'].map((e) => (
                      <div key={e} className="flex items-center space-x-3 border rounded-xl p-4 cursor-pointer hover:bg-secondary/50 transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                        <RadioGroupItem value={e.toLowerCase()} id={`eq-${e}`} />
                        <Label htmlFor={`eq-${e}`} className="flex-1 cursor-pointer font-medium">{e}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex-1 space-y-6"
                >
                  <h2 className="text-2xl font-bold">How many days per week?</h2>
                  <RadioGroup value={formData.days} onValueChange={(v) => setFormData({...formData, days: v})} className="grid gap-3">
                    {['3 Days', '4 Days', '5 Days', '6 Days'].map((d) => (
                      <div key={d} className="flex items-center space-x-3 border rounded-xl p-4 cursor-pointer hover:bg-secondary/50 transition-colors [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5">
                        <RadioGroupItem value={d[0]} id={`day-${d}`} />
                        <Label htmlFor={`day-${d}`} className="flex-1 cursor-pointer font-medium">{d}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex-1 flex flex-col items-center justify-center text-center space-y-4"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                    <BrainCircuit className="w-16 h-16 text-primary relative z-10 animate-bounce" />
                  </div>
                  <h2 className="text-2xl font-bold">Synthesizing Your Plan</h2>
                  <p className="text-muted-foreground max-w-[250px]">Analyzing millions of data points to build your optimal routine...</p>
                </motion.div>
              )}
            </AnimatePresence>

            {step < 4 && (
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <Button 
                  variant="ghost" 
                  onClick={handleBack} 
                  disabled={step === 0}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button 
                  onClick={handleNext} 
                  disabled={!canProceed()}
                  className="gap-2"
                  data-testid="btn-wizard-next"
                >
                  {step === 3 ? 'Generate Plan' : 'Next'} <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="border-primary/50 overflow-hidden relative shadow-[0_0_50px_-12px_rgba(173,255,47,0.2)]">
            <div className="absolute top-0 right-0 p-4">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <CardContent className="p-8 space-y-8">
              <div className="space-y-2 pr-12">
                <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-foreground to-foreground/60">{plan.name}</h2>
                <p className="text-lg text-muted-foreground">{plan.description}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Goal', value: plan.goal },
                  { label: 'Level', value: plan.level },
                  { label: 'Days', value: `${plan.daysPerWeek}/week` },
                  { label: 'Equipment', value: formData.equipment }
                ].map((stat, i) => (
                  <div key={i} className="bg-secondary/50 rounded-xl p-4">
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
                    <p className="font-bold capitalize">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-primary" /> AI Notes
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  I selected this plan because it perfectly aligns with your {formData.goal} goal while accommodating your {formData.equipment} setup. The {formData.days}-day frequency allows for optimal recovery at your {formData.level} level. Focus on progressive overload and don't rush the weight increases.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button className="flex-1 gap-2" size="lg" data-testid="btn-save-plan">
                  <CheckCircle2 className="w-5 h-5" /> Start This Plan
                </Button>
                <Button variant="outline" className="flex-1 gap-2" size="lg" onClick={copyToClipboard} data-testid="btn-share-plan">
                  <Copy className="w-5 h-5" /> Copy Summary
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
