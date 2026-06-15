import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, Star, Flame, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { challenges as mockChallenges } from '@/lib/mockData';

export default function Challenges() {
  const { toast } = useToast();
  const [completed, setCompleted] = useState<string[]>([]);

  const handleJoin = (id: string) => {
    if (completed.includes(id)) return;
    toast({ title: "Challenge Started!", description: "Track your progress to earn XP." });
  };

  const handleComplete = (id: string, xp: number) => {
    if (completed.includes(id)) return;
    setCompleted([...completed, id]);
    toast({ 
      title: "Challenge Completed! 🎉", 
      description: `You earned +${xp} XP`,
      className: "border-primary bg-primary/10 text-primary-foreground"
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Community Challenges</h1>
          <p className="text-muted-foreground">Compete, earn XP, and level up together.</p>
        </div>
        <div className="flex items-center gap-2 bg-card border rounded-lg px-4 py-2">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="font-bold">4,500 XP Total</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Challenges List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" /> Active This Week
          </h2>
          
          <div className="grid gap-4">
            {mockChallenges.map((challenge) => {
              const isDone = completed.includes(challenge.id);
              
              return (
                <Card key={challenge.id} className={`overflow-hidden transition-all ${isDone ? 'border-primary/50 bg-primary/5' : ''}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center p-6 gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center shrink-0">
                      <Trophy className={`w-8 h-8 ${isDone ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="capitalize">{challenge.type}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Users className="w-3 h-3" /> {challenge.participants.toLocaleString()}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold">{challenge.title}</h3>
                      <p className="text-sm text-muted-foreground font-medium text-primary">Reward: +{challenge.xp} XP</p>
                    </div>

                    <div className="shrink-0 w-full sm:w-auto">
                      {isDone ? (
                        <Button variant="outline" className="w-full text-primary border-primary bg-primary/10 gap-2 cursor-default" data-testid={`btn-completed-${challenge.id}`}>
                          <CheckCircle2 className="w-4 h-4" /> Completed
                        </Button>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <Button className="w-full gap-2" onClick={() => handleComplete(challenge.id, challenge.xp)} data-testid={`btn-complete-${challenge.id}`}>
                            Complete Challenge
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-primary/20 bg-card">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg">Global Leaderboard</CardTitle>
              <CardDescription>Top earners this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Sarah J.", xp: 12400, rank: 1 },
                  { name: "Mike T.", xp: 11200, rank: 2 },
                  { name: "Alex Fitness", xp: 4500, rank: 3, isUser: true },
                  { name: "Chris D.", xp: 4200, rank: 4 },
                  { name: "Emma W.", xp: 3800, rank: 5 },
                ].map((user) => (
                  <div key={user.rank} className={`flex items-center justify-between p-2 rounded-lg ${user.isUser ? 'bg-primary/10 border border-primary/20' : ''}`}>
                    <div className="flex items-center gap-3">
                      <span className={`w-6 text-center font-bold ${user.rank <= 3 ? 'text-primary' : 'text-muted-foreground'}`}>
                        #{user.rank}
                      </span>
                      <span className={`font-medium ${user.isUser ? 'text-primary' : ''}`}>{user.name}</span>
                    </div>
                    <span className="font-bold text-sm">{user.xp.toLocaleString()} XP</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/50 border-none">
            <CardContent className="p-6 text-center space-y-4">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <Flame className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg">Keep it up!</h3>
              <p className="text-sm text-muted-foreground">You're in the top 15% of users this week. Complete one more challenge to break into the top 10%.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
