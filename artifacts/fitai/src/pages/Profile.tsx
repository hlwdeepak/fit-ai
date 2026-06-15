import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Settings, Moon, Sun, Bell, Trophy, Shield, Dumbbell, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/ThemeProvider';
import { mockUser, badges } from '@/lib/mockData';
import { useToast } from '@/hooks/use-toast';

export default function Profile() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      name: mockUser.name,
      email: mockUser.email,
    }
  });

  const onSubmit = (data: any) => {
    toast({ title: "Profile updated successfully" });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center text-primary text-2xl font-bold uppercase">
          {mockUser.name.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold">{mockUser.name}</h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" /> Level {mockUser.level} Elite
          </p>
        </div>
      </div>

      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-grid">
          <TabsTrigger value="settings">Settings & Profile</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>
        
        <TabsContent value="settings" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Profile Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Settings className="w-5 h-5" /> Edit Profile</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" {...form.register('name')} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...form.register('email')} />
                  </div>
                  <Button type="submit" data-testid="btn-update-profile">Save Changes</Button>
                </form>
              </CardContent>
            </Card>

            {/* Preferences */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Shield className="w-5 h-5" /> App Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">Toggle application theme</p>
                    </div>
                    <Switch 
                      checked={theme === 'dark'} 
                      onCheckedChange={(c) => setTheme(c ? 'dark' : 'light')}
                      data-testid="switch-theme"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base flex items-center gap-2"><Bell className="w-4 h-4" /> Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Workout reminders</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-destructive/5 border-destructive/20">
                <CardContent className="p-6">
                  <h3 className="text-destructive font-bold mb-2">Danger Zone</h3>
                  <p className="text-sm text-muted-foreground mb-4">Permanently delete your account and all workout history.</p>
                  <Button variant="destructive" size="sm">Delete Account</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Trophy Case</CardTitle>
              <CardDescription>Badges earned during your fitness journey</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {badges.map((badge, i) => (
                  <div key={badge.id} className="flex flex-col items-center justify-center p-4 border rounded-xl bg-secondary/20 text-center gap-3 hover:border-primary/50 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      {i % 2 === 0 ? <Trophy className="w-6 h-6 text-primary" /> : <Star className="w-6 h-6 text-primary" />}
                    </div>
                    <div>
                      <p className="font-bold text-sm leading-tight">{badge.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-1">Earned Dec '23</p>
                    </div>
                  </div>
                ))}
                
                {/* Locked Badges */}
                <div className="flex flex-col items-center justify-center p-4 border border-dashed rounded-xl bg-background text-center gap-3 opacity-50">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                    <Dumbbell className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-bold text-sm leading-tight">Iron Master</p>
                    <p className="text-[10px] text-muted-foreground mt-1">Locked</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
