import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { ProgressService } from '../../services/progress.service';
import { WorkoutService } from '../../services/workout.service';
import { WorkoutPlan } from '../../models/workout-plan.model';

@Component({
  selector: 'app-workout-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './workout-detail.html',
  styleUrls: ['./workout-detail.css']
})
export class WorkoutDetailComponent implements OnInit, OnDestroy {

  workout?: WorkoutPlan;

  // ⏱️ TIMER
  time = 0;
  intervalId?: number;
  isRunning = false;

  // ✅ COMPLETION
  completed = false;

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService,
    private progress: ProgressService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.workout = this.workoutService.getWorkoutById(id);

    if (!this.workout) {
      alert('Workout not found');
      return;
    }

    // ✅ completion from ONE key only
    const completedWorkouts: number[] =
      JSON.parse(localStorage.getItem('completed_workouts') || '[]');

    this.completed = completedWorkouts.includes(this.workout.id);
  }

  ngOnDestroy(): void {
    this.pauseTimer();
  }

  // ⏱️ TIMER METHODS
  startTimer(): void {
    if (this.isRunning) return;

    this.isRunning = true;
    this.intervalId = window.setInterval(() => {
      this.time++;
    }, 1000);
  }

  pauseTimer(): void {
    this.isRunning = false;

    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  resetTimer(): void {
    this.pauseTimer();
    this.time = 0;
  }

  get formattedTime(): string {
    const minutes = Math.floor(this.time / 60);
    const seconds = this.time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  // ✅ MARK COMPLETED
  markCompleted(): void {
    if (!this.workout) return;

    this.completed = true;

    // ✅ store completion list so Progress page works
    const completedWorkouts: number[] =
      JSON.parse(localStorage.getItem('completed_workouts') || '[]');

    if (!completedWorkouts.includes(this.workout.id)) {
      completedWorkouts.push(this.workout.id);
    }

    localStorage.setItem('completed_workouts', JSON.stringify(completedWorkouts));

    // ✅ IMPORTANT: log into progress system (time included)
    this.progress.markWorkoutCompleted(this.workout.id, this.time);

    // optional: stop timer when completed
    this.pauseTimer();
  }
}
