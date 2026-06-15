import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Plus, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PoweredByAI } from '@/components/PoweredByAI';
import { progressLogs, getProgressLogs, addProgressLog } from '@/lib/localStorage';
import { useToast } from '@/hooks/use-toast';

// Format data for chart
const chartData = [
  { name: 'Week 1', weight: 185 },
  { name: 'Week 2', weight: 190 },
  { name: 'Week 3', weight: 190 },
  { name: 'Week 4', weight: 195 },
  { name: 'Week 5', weight: 200 },
];

export default function Progress() {
  const [logs, setLogs] = useState(() => {
    const local = getProgressLogs();
    if (local.length > 0) return local;
    // Fallback to mock data if empty
    import('@/lib/mockData').then(m => {
      if (getProgressLogs().length === 0) {
        m.progressLogs.forEach(l => addProgressLog(l));
        setLogs(m.progressLogs);
      }
    });
    return [];
  });
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newLog = {
      date: new Date().toISOString().split('T')[0],
      exercise: formData.get('exercise'),
      sets: Number(formData.get('sets')),
      reps: Number(formData.get('reps')),
      weight: Number(formData.get('weight')),
    };
    
    const updated = addProgressLog(newLog);
    setLogs(updated);
    setIsOpen(false);
    toast({ title: "Workout logged successfully!" });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Progress Tracking</h1>
          <p className="text-muted-foreground">Visualize your gains and track every rep.</p>
        </div>
        
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" data-testid="btn-add-log">
              <Plus className="w-4 h-4" /> Log Workout
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Log Exercise</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddLog} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="exercise">Exercise Name</Label>
                <Input id="exercise" name="exercise" required placeholder="e.g. Bench Press" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="sets">Sets</Label>
                  <Input id="sets" name="sets" type="number" required placeholder="3" min="1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reps">Reps</Label>
                  <Input id="reps" name="reps" type="number" required placeholder="8" min="1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (lbs)</Label>
                  <Input id="weight" name="weight" type="number" required placeholder="135" min="0" />
                </div>
              </div>
              <Button type="submit" className="w-full mt-4" data-testid="btn-submit-log">Save Log</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Section */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="space-y-1">
                <CardTitle>Bench Press 1RM Projection</CardTitle>
                <CardDescription>Estimated based on recent performance</CardDescription>
              </div>
              <TrendingUp className="w-5 h-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}lb`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                      itemStyle={{ color: 'hsl(var(--primary))' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ r: 4, fill: 'hsl(var(--background))', strokeWidth: 2 }}
                      activeDot={{ r: 6, fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* AI Insight */}
          <Card className="border-primary/20 bg-primary/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4"><PoweredByAI /></div>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="p-3 bg-primary/10 rounded-xl shrink-0 h-min">
                  <BrainCircuit className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Performance Analysis</h3>
                  <p className="text-muted-foreground">Your bench press has plateaued at 190lbs for two weeks. This indicates central nervous system fatigue. <strong className="text-foreground">Recommendation:</strong> Take a deload week on push movements, dropping volume by 40%.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Logs */}
        <Card className="flex flex-col h-full">
          <CardHeader>
            <CardTitle>Recent History</CardTitle>
            <CardDescription>Your latest tracked exercises</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-auto">
            <div className="space-y-4">
              {[...logs].reverse().map((log: any, i) => (
                <div key={log.id || i} className="flex justify-between items-center p-3 rounded-lg border bg-card hover:bg-secondary/20 transition-colors">
                  <div>
                    <p className="font-medium text-sm">{log.exercise}</p>
                    <p className="text-xs text-muted-foreground">{new Date(log.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-primary">{log.weight > 0 ? `${log.weight} lbs` : 'BW'}</p>
                    <p className="text-xs text-muted-foreground">{log.sets} × {log.reps}</p>
                  </div>
                </div>
              ))}
              {logs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No logs yet. Add your first workout!
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
