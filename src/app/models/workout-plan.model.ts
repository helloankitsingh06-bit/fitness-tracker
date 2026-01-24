import { Exercise } from './exercise.model';

export interface WorkoutPlan {
  id: number;
  title: string;
  level: string;
  exercises: Exercise[];
}
