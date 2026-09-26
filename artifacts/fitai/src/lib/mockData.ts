export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  difficulty: string;
  description: string;
  videoId: string;
  duration: string;
  tips: string[];
}

export const exercises: Exercise[] = [
  {
    id: "e1",
    name: "Barbell Bench Press",
    muscleGroup: "chest",
    equipment: "barbell",
    difficulty: "intermediate",
    description: "A premier upper-body compound exercise that develops the pectorals, anterior deltoids, and triceps.",
    videoId: "rT7DgCr-3pg",
    duration: "4:30",
    tips: ["Retract your shoulder blades and pinch them into the bench", "Keep feet planted flat on the floor", "Lower the bar to your mid-chest with control"]
  },
  {
    id: "e2",
    name: "Dumbbell Flyes",
    muscleGroup: "chest",
    equipment: "dumbbell",
    difficulty: "beginner",
    description: "An isolation exercise that targets the pectoral muscles with a deep horizontal stretch.",
    videoId: "eozdVDA78K0",
    duration: "3:45",
    tips: ["Maintain a slight bend at the elbows throughout", "Focus on a full chest stretch at the bottom", "Squeeze the chest at the top without clanging the dumbbells"]
  },
  {
    id: "e3",
    name: "Pull-ups",
    muscleGroup: "back",
    equipment: "bodyweight",
    difficulty: "advanced",
    description: "The gold-standard bodyweight exercise that builds wide lats, upper back strength, and biceps.",
    videoId: "eGo4IYlbE5g",
    duration: "5:12",
    tips: ["Initiate by depressing the scapulae before pulling", "Avoid excessive swinging or kipping", "Pull until your chin comfortably clears the bar"]
  },
  {
    id: "e4",
    name: "Barbell Squat",
    muscleGroup: "legs",
    equipment: "barbell",
    difficulty: "intermediate",
    description: "The king of lower body movements targeting the quadriceps, hamstrings, glutes, and core.",
    videoId: "bEv6CCg2BC8",
    duration: "6:20",
    tips: ["Keep your chest upright and brace your core", "Knees should track in line with your toes", "Hit at least parallel depth with hips level with knees"]
  },
  {
    id: "e5",
    name: "Leg Press",
    muscleGroup: "legs",
    equipment: "machine",
    difficulty: "beginner",
    description: "A machine-guided movement allowing heavy quadriceps and leg overload with reduced spine loading.",
    videoId: "IZxyjW7MPJQ",
    duration: "4:15",
    tips: ["Never fully lock out knees at the top", "Keep your lower back pressed firmly into the pad", "Control the negative descent smoothly"]
  },
  {
    id: "e6",
    name: "Overhead Press",
    muscleGroup: "shoulders",
    equipment: "barbell",
    difficulty: "intermediate",
    description: "A vertical compound pushing movement that develops deltoids, upper chest, and core stability.",
    videoId: "2yjwXTZQDDI",
    duration: "5:40",
    tips: ["Squeeze your glutes and brace your abs", "Press the bar in a straight vertical path", "Move your head back as bar passes, then forward at lockout"]
  },
  {
    id: "e7",
    name: "Dumbbell Lateral Raise",
    muscleGroup: "shoulders",
    equipment: "dumbbell",
    difficulty: "beginner",
    description: "The primary isolation exercise for creating wider, boulder shoulders by targeting lateral deltoids.",
    videoId: "3VcKaXpzqRo",
    duration: "3:50",
    tips: ["Lead with the elbows, not your hands", "Lean forward very slightly to align with the lateral deltoid plane", "Avoid swinging or shrugging with your traps"]
  },
  {
    id: "e8",
    name: "Bicep Curl",
    muscleGroup: "arms",
    equipment: "dumbbell",
    difficulty: "beginner",
    description: "Classic arm isolation exercise targeting the bicep brachii for peaked arm development.",
    videoId: "ykJmrZ5v0Oo",
    duration: "3:30",
    tips: ["Keep your elbows stationary at your sides", "Supinate your wrists (turn pinky up) as you curl", "Take 2-3 seconds on the lowering phase"]
  },
  {
    id: "e9",
    name: "Tricep Pushdown",
    muscleGroup: "arms",
    equipment: "machine",
    difficulty: "beginner",
    description: "A cable-based isolation exercise providing constant tension on the lateral and medial triceps heads.",
    videoId: "2-LAMcpzODU",
    duration: "4:10",
    tips: ["Keep your upper arms locked by your torso", "Fully extend your elbows at the bottom and squeeze", "Do not let your shoulders roll forward"]
  },
  {
    id: "e10",
    name: "Plank",
    muscleGroup: "core",
    equipment: "bodyweight",
    difficulty: "beginner",
    description: "An isometric core exercise that reinforces spinal stability, anti-extension, and endurance.",
    videoId: "pSHjTRCQxIw",
    duration: "3:15",
    tips: ["Form a straight line from your head down to your heels", "Tuck your pelvis and actively squeeze glutes and abs", "Breathe in a steady rhythm without holding your breath"]
  }
];

export const workoutPlans = [
  {
    id: "wp1",
    name: "Push/Pull/Legs Hypertrophy",
    goal: "muscle gain",
    level: "intermediate",
    daysPerWeek: 6,
    description: "A 6-day split designed for maximum muscle growth."
  },
  {
    id: "wp2",
    name: "Full Body Strength",
    goal: "strength",
    level: "beginner",
    daysPerWeek: 3,
    description: "A 3-day full body routine focusing on compound movements."
  },
  {
    id: "wp3",
    name: "HIIT Fat Burner",
    goal: "fat loss",
    level: "intermediate",
    daysPerWeek: 4,
    description: "High-intensity interval training for rapid fat loss."
  }
];

export const progressLogs = [
  { id: "pl1", date: "2023-10-01", exercise: "Barbell Bench Press", sets: 3, reps: 8, weight: 185 },
  { id: "pl2", date: "2023-10-03", exercise: "Barbell Squat", sets: 3, reps: 6, weight: 225 },
  { id: "pl3", date: "2023-10-05", exercise: "Pull-ups", sets: 3, reps: 10, weight: 0 },
  { id: "pl4", date: "2023-10-08", exercise: "Barbell Bench Press", sets: 3, reps: 8, weight: 190 },
  { id: "pl5", date: "2023-10-10", exercise: "Barbell Squat", sets: 3, reps: 6, weight: 235 }
];

export const challenges = [
  { id: "c1", title: "100 Pushups a Day", xp: 500, participants: 1240, type: "strength" },
  { id: "c2", title: "Run 5k", xp: 300, participants: 890, type: "endurance" },
  { id: "c3", title: "7-Day Plank Challenge", xp: 400, participants: 2100, type: "core" },
  { id: "c4", title: "Squat Your Bodyweight", xp: 600, participants: 450, type: "strength" },
  { id: "c5", title: "No Sugar Week", xp: 200, participants: 3200, type: "nutrition" }
];

export const mockUser = {
  id: "u1",
  name: "Alex Fitness",
  email: "alex@example.com",
  level: 12,
  xp: 4500,
  streak: 14,
  goal: "muscle gain"
};

export const badges = [
  { id: "b1", name: "First Workout", icon: "Trophy" },
  { id: "b2", name: "7-Day Streak", icon: "Flame" },
  { id: "b3", name: "1000 XP Club", icon: "Star" },
  { id: "b4", name: "Strength Master", icon: "Dumbbell" },
  { id: "b5", name: "Early Bird", icon: "Sun" }
];

export const mealPlans = {
  "muscle gain": [
    { meal: "Breakfast", suggestion: "Oatmeal with protein powder, berries, and peanut butter", macros: "P: 35g, C: 60g, F: 15g" },
    { meal: "Lunch", suggestion: "Chicken breast, sweet potato, and broccoli", macros: "P: 45g, C: 50g, F: 5g" },
    { meal: "Dinner", suggestion: "Salmon, quinoa, and asparagus", macros: "P: 40g, C: 45g, F: 18g" }
  ],
  "fat loss": [
    { meal: "Breakfast", suggestion: "Egg white scramble with spinach and tomatoes", macros: "P: 25g, C: 5g, F: 2g" },
    { meal: "Lunch", suggestion: "Grilled turkey salad with vinaigrette", macros: "P: 35g, C: 15g, F: 10g" },
    { meal: "Dinner", suggestion: "White fish with cauliflower rice", macros: "P: 30g, C: 20g, F: 8g" }
  ],
  "maintenance": [
    { meal: "Breakfast", suggestion: "Greek yogurt with almonds and honey", macros: "P: 20g, C: 30g, F: 12g" },
    { meal: "Lunch", suggestion: "Beef wrap with mixed greens", macros: "P: 30g, C: 40g, F: 15g" },
    { meal: "Dinner", suggestion: "Chicken stir-fry with mixed vegetables", macros: "P: 35g, C: 35g, F: 10g" }
  ]
};
