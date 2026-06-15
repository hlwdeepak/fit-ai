import React from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Home, 
  Dumbbell, 
  Calendar, 
  LineChart, 
  Trophy, 
  Utensils, 
  Timer, 
  User, 
  LogOut 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getLocalUser, logoutUser } from '@/lib/localStorage';
import { useToast } from '@/hooks/use-toast';

const navItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Dumbbell, label: 'Exercises', href: '/exercises' },
  { icon: Calendar, label: 'Planner', href: '/workout-planner' },
  { icon: LineChart, label: 'Progress', href: '/progress' },
  { icon: Trophy, label: 'Challenges', href: '/challenges' },
  { icon: Utensils, label: 'Meals', href: '/meal-planner' },
  { icon: Timer, label: 'Timer', href: '/timer' },
  { icon: User, label: 'Profile', href: '/profile' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const user = getLocalUser();

  const handleLogout = () => {
    logoutUser();
    toast({ title: 'Logged out successfully' });
    setLocation('/');
  };

  // Hide nav on landing, login, signup
  const hideNav = ['/', '/login', '/signup'].includes(location);

  if (hideNav) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r bg-card/50 backdrop-blur-xl fixed inset-y-0 z-50">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Dumbbell className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight">FitAI</span>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto pb-24">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                <Icon className={cn("w-5 h-5", isActive ? "text-primary" : "")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t absolute bottom-0 w-full bg-card/50 backdrop-blur-xl">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
            data-testid="nav-logout"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 pb-20 md:pb-0">
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 border-t bg-card/80 backdrop-blur-xl z-50 flex items-center justify-around p-2 safe-area-bottom">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-xl min-w-[64px] transition-colors",
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5 mb-1" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
