import { Injectable } from '@angular/core';
import { WorkoutPlan } from '../models/workout-plan.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private workouts = [
    {
      id: 1,
      title: 'Beginner Full Body',
      level: 'Beginner',
      exercises: []
    },
    {
      id: 2,
      title: 'Intermediate Push Pull',
      level: 'Intermediate',
      exercises: []
    },
    {
      id: 3,
      title: 'Advanced Strength',
      level: 'Advanced',
      exercises: []
    }
  ];

  getWorkouts() {
    return this.workouts;
  }

  /** 👇 THIS FIXES YOUR ERROR */
  getWorkoutById(id: number) {
    return this.workouts.find(w => w.id === id);
  }
}
