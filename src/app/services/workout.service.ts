import { Injectable } from '@angular/core';
import { WorkoutPlan } from '../models/workout-plan.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private workouts: WorkoutPlan[] = [
    {
      id: 1,
      title: 'Beginner Full Body',
      level: 'BEGINNER',
      desc: 'Perfect for beginner athletes',
      image: 'assets/workouts/beginner.jpg',
      exercises: [
        { name: 'Push-ups', sets: 3, reps: 10, image: 'assets/exercises/pushups.jpg' },
        { name: 'Squats', sets: 3, reps: 15, image: 'assets/exercises/squat.jpg' },
        { name: 'Plank', sets: 2, reps: '30 sec', image: 'assets/exercises/plank.jpg' },
        { name: 'Jumping Jacks', sets: 3, reps: 25, image: 'assets/exercises/jumping-jacks.jpg' },
        { name: 'Lunges', sets: 3, reps: 12, image: 'assets/exercises/lunges.jpg' }
      ]
    },

    {
      id: 2,
      title: 'Intermediate Full Body',
      level: 'INTERMEDIATE',
      desc: 'Perfect for intermediate athletes',
      image: 'assets/workouts/intermediate.jpg',
      exercises: [
        { name: 'Incline Push-ups', sets: 4, reps: 12, image: 'assets/exercises/pushups.jpg' },
        { name: 'Jump Squats', sets: 4, reps: 12, image: 'assets/exercises/squat.jpg' },
        { name: 'Mountain Climbers', sets: 3, reps: 30, image: 'assets/exercises/jumping-jacks.jpg' },
        { name: 'Plank Hold', sets: 3, reps: '45 sec', image: 'assets/exercises/plank.jpg' },
        { name: 'Reverse Lunges', sets: 3, reps: 14, image: 'assets/exercises/lunges.jpg' }
      ]
    },

    {
      id: 3,
      title: 'Advanced Strength',
      level: 'ADVANCED',
      desc: 'Perfect for advanced athletes',
      image: 'assets/workouts/advanced.jpg',
      exercises: [
        { name: 'Diamond Push-ups', sets: 5, reps: 12, image: 'assets/exercises/pushups.jpg' },
        { name: 'Pistol Squats', sets: 4, reps: 8, image: 'assets/exercises/squat.jpg' },
        { name: 'Plank to Push-up', sets: 4, reps: 12, image: 'assets/exercises/plank.jpg' },
        { name: 'Jumping Jacks (Fast)', sets: 4, reps: 40, image: 'assets/exercises/jumping-jacks.jpg' },
        { name: 'Walking Lunges', sets: 4, reps: 20, image: 'assets/exercises/lunges.jpg' }
      ]
    },

    {
      id: 4,
      title: 'HIIT Fat Burn',
      level: 'INTERMEDIATE',
      desc: 'High intensity fat burning workout',
      image: 'assets/workouts/intermediate.jpg',
      exercises: [
        { name: 'Jumping Jacks', sets: 4, reps: 40, image: 'assets/exercises/jumping-jacks.jpg' },
        { name: 'Mountain Climbers', sets: 4, reps: 30, image: 'assets/exercises/jumping-jacks.jpg' },
        { name: 'Squats', sets: 4, reps: 20, image: 'assets/exercises/squat.jpg' },
        { name: 'Push-ups', sets: 4, reps: 12, image: 'assets/exercises/pushups.jpg' },
        { name: 'Plank', sets: 3, reps: '45 sec', image: 'assets/exercises/plank.jpg' }
      ]
    },

    {
      id: 5,
      title: 'Core & Abs',
      level: 'BEGINNER',
      desc: 'Strengthen your core muscles',
      image: 'assets/workouts/beginner.jpg',
      exercises: [
        { name: 'Plank', sets: 3, reps: '30 sec', image: 'assets/exercises/plank.jpg' },
        { name: 'Leg Raises', sets: 3, reps: 12, image: 'assets/exercises/plank.jpg' },
        { name: 'Crunches', sets: 3, reps: 20, image: 'assets/exercises/plank.jpg' },
        { name: 'Mountain Climbers', sets: 3, reps: 20, image: 'assets/exercises/jumping-jacks.jpg' }
      ]
    },

    {
      id: 6,
      title: 'Upper Body Blast',
      level: 'ADVANCED',
      desc: 'Build upper body strength',
      image: 'assets/workouts/advanced.jpg',
      exercises: [
        { name: 'Push-ups', sets: 5, reps: 15, image: 'assets/exercises/pushups.jpg' },
        { name: 'Diamond Push-ups', sets: 4, reps: 12, image: 'assets/exercises/pushups.jpg' },
        { name: 'Plank to Push-up', sets: 4, reps: 10, image: 'assets/exercises/plank.jpg' }
      ]
    }
  ];

  getWorkouts(): WorkoutPlan[] {
    return this.workouts;
  }

  getWorkoutById(id: number): WorkoutPlan | undefined {
    return this.workouts.find(w => w.id === id);
  }
}
