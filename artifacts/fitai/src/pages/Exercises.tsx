import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Play, BrainCircuit, Sparkles, CheckCircle2, Clock, Dumbbell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { PoweredByAI } from '@/components/PoweredByAI';
import { Exercise } from '@/lib/mockData';
import { ExerciseApiService } from '@/lib/exerciseApi';

export default function Exercises() {
  const [searchQuery, setSearchQuery] = useState('');
  const [muscleGroup, setMuscleGroup] = useState('all');
  const [equipment, setEquipment] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [exercisesList, setExercisesList] = useState<Exercise[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    ExerciseApiService.fetchExercises({
      searchQuery,
      muscleGroup,
      equipment,
      difficulty,
    }).then((data) => {
      if (isMounted) {
        setExercisesList(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [searchQuery, muscleGroup, equipment, difficulty]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 max-w-7xl mx-auto pb-12"
    >
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <h1 className="text-3xl font-display font-bold">Exercise Video Library</h1>
          <Badge variant="outline" className="text-primary border-primary/30 gap-1 text-xs">
            <Sparkles className="w-3 h-3 text-primary" /> HD Video Demos
          </Badge>
        </div>
        <p className="text-muted-foreground">
          Master proper lifting technique with curated video tutorials and AI form tips.
        </p>
      </div>

      {/* Smart Search */}
      <Card className="border-primary/20 bg-primary/5">
        <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 items-center">
          <div className="p-3 bg-primary/10 rounded-xl shrink-0">
            <BrainCircuit className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 w-full space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-sm sm:text-base">Smart Exercise Search</span>
              <PoweredByAI />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder='Try: "chest exercises with dumbbells" or "squat"' 
                className="pl-9 bg-background border-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-smart-search"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
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

        <div className="ml-auto text-xs text-muted-foreground">
          Showing <span className="font-semibold text-foreground">{exercisesList.length}</span> exercises
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {exercisesList.map((ex) => (
            <motion.div 
              key={ex.id} 
              layout 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Card 
                className="h-full flex flex-col hover:border-primary/60 transition-all duration-300 group overflow-hidden cursor-pointer bg-card/60 backdrop-blur shadow-sm hover:shadow-md hover:shadow-primary/5"
                onClick={() => setSelectedExercise(ex)}
              >
                {/* Video Thumbnail with Play Button */}
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img 
                    src={ExerciseApiService.getThumbnailUrl(ex.videoId)} 
                    alt={ex.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-13 h-13 rounded-full bg-primary/90 text-primary-foreground shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Duration Tag */}
                  <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded bg-black/80 text-[11px] font-medium text-white backdrop-blur-sm">
                    <Clock className="w-3 h-3" /> {ex.duration}
                  </div>

                  {/* Muscle Tag */}
                  <div className="absolute top-2.5 left-2.5">
                    <Badge variant="secondary" className="capitalize text-xs bg-black/60 text-white backdrop-blur-sm border-white/10">
                      {ex.muscleGroup}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="flex-1 pb-2">
                  <div className="flex justify-between items-start gap-2">
                    <CardTitle className="leading-tight group-hover:text-primary transition-colors text-lg">
                      {ex.name}
                    </CardTitle>
                    <Badge variant="outline" className="capitalize shrink-0 text-xs">
                      {ex.difficulty}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-2 mt-2 text-xs leading-relaxed">
                    {ex.description}
                  </CardDescription>
                </CardHeader>

                <CardFooter className="pt-2 pb-4 flex justify-between items-center text-xs text-muted-foreground border-t border-border/40">
                  <div className="flex items-center gap-1.5 capitalize">
                    <Dumbbell className="w-3.5 h-3.5 text-primary" /> {ex.equipment}
                  </div>
                  <span className="text-primary font-medium group-hover:underline flex items-center gap-1">
                    Watch Form Demo &rarr;
                  </span>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {exercisesList.length === 0 && !isLoading && (
          <div className="col-span-full py-16 text-center text-muted-foreground bg-card rounded-xl border border-dashed">
            <Dumbbell className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-medium text-foreground">No exercises found</p>
            <p className="text-sm mt-1">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>

      {/* Interactive Video Player Dialog */}
      <Dialog open={!!selectedExercise} onOpenChange={(open) => !open && setSelectedExercise(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-background border-border/60">
          {selectedExercise && (
            <div>
              {/* Responsive Video Embed */}
              <div className="aspect-video w-full bg-black">
                <iframe
                  src={ExerciseApiService.getEmbedUrl(selectedExercise.videoId, true)}
                  title={`${selectedExercise.name} Form Tutorial`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              {/* Video Info & Form Cues */}
              <div className="p-6 space-y-4">
                <DialogHeader className="text-left space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                      {selectedExercise.name}
                    </DialogTitle>
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="capitalize">
                        {selectedExercise.muscleGroup}
                      </Badge>
                      <Badge variant="outline" className="capitalize">
                        {selectedExercise.equipment}
                      </Badge>
                      <Badge className="bg-primary/20 text-primary hover:bg-primary/30 border-none capitalize">
                        {selectedExercise.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <DialogDescription className="text-sm text-muted-foreground leading-relaxed pt-1">
                    {selectedExercise.description}
                  </DialogDescription>
                </DialogHeader>

                {/* Form Tips Section */}
                {selectedExercise.tips && selectedExercise.tips.length > 0 && (
                  <div className="pt-2 border-t border-border/50">
                    <h4 className="text-sm font-semibold flex items-center gap-1.5 mb-2.5 text-primary">
                      <CheckCircle2 className="w-4 h-4" /> AI Coaching & Key Form Cues
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {selectedExercise.tips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2 bg-muted/50 p-2.5 rounded-lg border border-border/30">
                          <span className="font-bold text-primary shrink-0">{idx + 1}.</span>
                          <span className="text-foreground/90">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
