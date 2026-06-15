import React from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function PoweredByAI({ className }: { className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 shadow-[0_0_15px_rgba(173,255,47,0.15)]", className)}>
      <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
      <span className="text-[10px] font-bold uppercase tracking-wider text-primary">Powered by AI</span>
    </div>
  );
}
