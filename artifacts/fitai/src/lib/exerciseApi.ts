import { exercises, Exercise } from './mockData';

export interface ExerciseFilterOptions {
  muscleGroup?: string;
  equipment?: string;
  difficulty?: string;
  searchQuery?: string;
}

/**
 * Exercise API Service
 * Supports fallback to curated high-definition video exercises
 * with live API key hooks for RapidAPI / ExerciseDB / YouTube Data API.
 */
export class ExerciseApiService {
  private static rapidApiKey = import.meta.env.VITE_EXERCISE_API_KEY || '';
  private static youtubeApiKey = import.meta.env.VITE_YOUTUBE_API_KEY || '';

  /**
   * Fetch exercises with filtering and smart search
   */
  static async fetchExercises(options: ExerciseFilterOptions = {}): Promise<Exercise[]> {
    const { muscleGroup = 'all', equipment = 'all', difficulty = 'all', searchQuery = '' } = options;

    // If an external ExerciseDB API key is configured, query the live API
    if (this.rapidApiKey) {
      try {
        const url = new URL('https://exercisedb.p.rapidapi.com/exercises');
        if (muscleGroup !== 'all') {
          url.pathname = `/exercises/bodyPart/${encodeURIComponent(muscleGroup)}`;
        }
        
        const response = await fetch(url.toString(), {
          headers: {
            'X-RapidAPI-Key': this.rapidApiKey,
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
          }
        });

        if (response.ok) {
          const apiData = await response.json();
          if (Array.isArray(apiData) && apiData.length > 0) {
            return apiData.map((item: any) => ({
              id: item.id || `ex-${Math.random()}`,
              name: item.name || 'Exercise',
              muscleGroup: item.target || item.bodyPart || 'full body',
              equipment: item.equipment || 'bodyweight',
              difficulty: 'intermediate',
              description: Array.isArray(item.instructions) ? item.instructions.join(' ') : (item.description || 'Proper form exercise demonstration.'),
              videoId: 'rT7DgCr-3pg', // Default video fallback
              duration: '3:00',
              tips: Array.isArray(item.instructions) ? item.instructions.slice(0, 3) : ['Keep core engaged', 'Control the movement']
            }));
          }
        }
      } catch (err) {
        console.warn('ExerciseDB API fetch failed, falling back to curated exercises:', err);
      }
    }

    // Default: Curated high-definition exercise library
    return exercises.filter((ex) => {
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        ex.name.toLowerCase().includes(query) ||
        ex.description.toLowerCase().includes(query) ||
        ex.muscleGroup.toLowerCase().includes(query) ||
        ex.equipment.toLowerCase().includes(query);

      const matchesMuscle = muscleGroup === 'all' || ex.muscleGroup.toLowerCase() === muscleGroup.toLowerCase();
      const matchesEquip = equipment === 'all' || ex.equipment.toLowerCase() === equipment.toLowerCase();
      const matchesDiff = difficulty === 'all' || ex.difficulty.toLowerCase() === difficulty.toLowerCase();

      return matchesSearch && matchesMuscle && matchesEquip && matchesDiff;
    });
  }

  /**
   * Return high-quality YouTube thumbnail
   */
  static getThumbnailUrl(videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }

  /**
   * Return responsive, clean YouTube embed URL
   */
  static getEmbedUrl(videoId: string, autoplay: boolean = true): string {
    return `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&rel=0&modestbranding=1&controls=1&playsinline=1`;
  }
}
