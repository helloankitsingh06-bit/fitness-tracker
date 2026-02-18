import { Exercise } from './exercise.model';

export interface WorkoutPlan {
  id: number;
  title: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  desc: string;
  image: string;
  exercises: Exercise[];
}
