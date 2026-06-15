import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Play, BrainCircuit } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { exercises } from '@/lib/mockData';
import { PoweredByAI } from '@/components/PoweredByAI';

export default function Exercises() {
  const [searchQuery, setSearchQuery] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('all');
  const [equipment, setEquipment] = useState('all');
  const [difficulty, setDifficulty] = useState('all');

  const filteredExercises = useMemo(() => {
    return exercises.filter(ex => {
      const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           ex.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMuscle = muscleGroup === 'all' || ex.muscleGroup === muscleGroup;
      const matchesEquip = equipment === 'all' || ex.equipment === equipment;
      const matchesDiff = difficulty === 'all' || ex.difficulty === difficulty;
      
      return matchesSearch && matchesMuscle && matchesEquip && matchesDiff;
    });
  }, [searchQuery, muscleGroup, equipment, difficulty]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-display font-bold">Exercise Library</h1>
        <p className="text-muted-foreground">Master your form with our curated database.</p>
      </div>

      {/* Smart Search */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-center">
          <div className="p-3 bg-primary/10 rounded-xl shrink-0">
            <BrainCircuit className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 w-full space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Smart Search</span>
              <PoweredByAI />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder='Try: "show chest exercises with dumbbells for beginners"' 
                className="pl-9 bg-background border-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-smart-search"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Filter className="w-4 h-4" /> Filters:
        </div>
        <Select value={muscleGroup} onValueChange={setMuscleGroup}>
          <SelectTrigger className="w-[140px]" data-testid="select-muscle">
            <SelectValue placeholder="Muscle Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Muscles</SelectItem>
            <SelectItem value="chest">Chest</SelectItem>
            <SelectItem value="back">Back</SelectItem>
            <SelectItem value="legs">Legs</SelectItem>
            <SelectItem value="shoulders">Shoulders</SelectItem>
            <SelectItem value="arms">Arms</SelectItem>
            <SelectItem value="core">Core</SelectItem>
          </SelectContent>
        </Select>

        <Select value={equipment} onValueChange={setEquipment}>
          <SelectTrigger className="w-[140px]" data-testid="select-equipment">
            <SelectValue placeholder="Equipment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Equipment</SelectItem>
            <SelectItem value="barbell">Barbell</SelectItem>
            <SelectItem value="dumbbell">Dumbbell</SelectItem>
            <SelectItem value="bodyweight">Bodyweight</SelectItem>
            <SelectItem value="machine">Machine</SelectItem>
          </SelectContent>
        </Select>

        <Select value={difficulty} onValueChange={setDifficulty}>
          <SelectTrigger className="w-[140px]" data-testid="select-difficulty">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
        
        {(muscleGroup !== 'all' || equipment !== 'all' || difficulty !== 'all' || searchQuery !== '') && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              setMuscleGroup('all');
              setEquipment('all');
              setDifficulty('all');
              setSearchQuery('');
            }}
            data-testid="btn-clear-filters"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredExercises.map((ex) => (
          <motion.div key={ex.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="h-full flex flex-col hover:border-primary/50 transition-colors group overflow-hidden">
              <div className="aspect-video bg-muted relative group cursor-pointer">
                <iframe 
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=0&showinfo=0&rel=0&autoplay=0&loop=0&mute=0" 
                  title={ex.name}
                  className="w-full h-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity"
                  frameBorder="0"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity bg-black/20">
                  <div className="w-12 h-12 rounded-full bg-background/80 backdrop-blur flex items-center justify-center">
                    <Play className="w-5 h-5 text-foreground ml-1" />
                  </div>
                </div>
              </div>
              <CardHeader className="flex-1 pb-2">
                <div className="flex justify-between items-start gap-2">
                  <CardTitle className="leading-tight">{ex.name}</CardTitle>
                  <Badge variant="secondary" className="capitalize shrink-0">{ex.difficulty}</Badge>
                </div>
                <CardDescription className="line-clamp-2 mt-2">{ex.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-2 flex gap-2">
                <Badge variant="outline" className="capitalize">{ex.muscleGroup}</Badge>
                <Badge variant="outline" className="capitalize">{ex.equipment}</Badge>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
        {filteredExercises.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground bg-card rounded-xl border border-dashed">
            No exercises found matching your criteria.
          </div>
        )}
      </div>
    </motion.div>
  );
}
