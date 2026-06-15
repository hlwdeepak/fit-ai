import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, BrainCircuit, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PoweredByAI } from '@/components/PoweredByAI';
import { useToast } from '@/hooks/use-toast';

const PRESETS = [30, 60, 90, 120, 180];

export default function Timer() {
  const [timeLeft, setTimeLeft] = useState(90);
  const [initialTime, setInitialTime] = useState(90);
  const [isActive, setIsActive] = useState(false);
  const { toast } = useToast();

  const handleTimerComplete = useCallback(() => {
    setIsActive(false);
    toast({ 
      title: "Rest complete! 🔔", 
      description: "Time for your next set. Let's go!",
      duration: 5000,
      className: "border-primary bg-primary/10 text-primary-foreground"
    });
    // Trigger vibration if supported
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  }, [toast]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      handleTimerComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, handleTimerComplete]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(initialTime);
  };

  const setPreset = (seconds: number) => {
    setIsActive(false);
    setInitialTime(seconds);
    setTimeLeft(seconds);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((initialTime - timeLeft) / initialTime) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto space-y-8 pt-8"
    >
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-display font-bold">Rest Timer</h1>
        <p className="text-muted-foreground">Optimize your recovery between sets.</p>
      </div>

      <Card className="border-none shadow-none bg-transparent">
        <CardContent className="p-0 flex flex-col items-center">
          {/* AI Suggestion */}
          <div className="mb-8 flex items-center justify-center gap-2 bg-primary/10 text-primary border border-primary/20 px-4 py-2 rounded-full text-sm font-medium">
            <BrainCircuit className="w-4 h-4" /> 
            AI Suggests: 90s for hypertrophy goals
          </div>

          {/* Circle Timer */}
          <div className="relative w-64 h-64 flex items-center justify-center mb-8">
            {/* Background Circle */}
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke="hsl(var(--secondary))"
                strokeWidth="8"
              />
              {/* Progress Circle */}
              <circle
                cx="128"
                cy="128"
                r="120"
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeDasharray={2 * Math.PI * 120}
                strokeDashoffset={2 * Math.PI * 120 * (1 - progress / 100)}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            
            <div className="text-center z-10 font-mono">
              <span className="text-6xl font-bold tracking-tighter text-foreground">
                {formatTime(timeLeft)}
              </span>
            </div>
            
            {/* Pulse effect when active */}
            {isActive && (
              <div className="absolute inset-0 bg-primary/5 rounded-full animate-ping pointer-events-none -z-10" />
            )}
          </div>

          {/* Controls */}
          <div className="flex gap-4 mb-10 w-full justify-center">
            <Button 
              size="lg" 
              variant="outline" 
              className="w-16 h-16 rounded-full p-0"
              onClick={resetTimer}
              data-testid="btn-timer-reset"
            >
              <RotateCcw className="w-6 h-6" />
            </Button>
            <Button 
              size="lg" 
              className="w-20 h-20 rounded-full p-0 shadow-[0_0_20px_rgba(173,255,47,0.3)]"
              onClick={toggleTimer}
              data-testid="btn-timer-toggle"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isActive ? 'pause' : 'play'}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {isActive ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                </motion.div>
              </AnimatePresence>
            </Button>
          </div>

          {/* Presets */}
          <div className="grid grid-cols-5 gap-2 w-full">
            {PRESETS.map((p) => (
              <Button
                key={p}
                variant={initialTime === p && !isActive ? "default" : "outline"}
                size="sm"
                className="text-xs h-10 font-mono"
                onClick={() => setPreset(p)}
                data-testid={`btn-preset-${p}`}
              >
                {p >= 60 ? `${p/60}m` : `${p}s`}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
