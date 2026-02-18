import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { WorkoutService } from '../../services/workout.service';
import { ProgressService } from '../../services/progress.service';
import { ProfileService } from '../../services/profile.service';
import { WorkoutPlan } from '../../models/workout-plan.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  private subs = new Subscription();

  // 👤 Profile
  name = 'Athlete';
  goal = 'Stay consistent';

  // 🏋️ Workouts
  workouts: WorkoutPlan[] = [];
  todayPick?: WorkoutPlan;

  // 📊 Stats
  completedDistinct = 0;
  streak = 0;
  totalMinutes = 0;

  weekly: { dateISO: string; count: number; minutes: number }[] = [];

  levelName: 'Bronze' | 'Silver' | 'Gold' | 'Elite' = 'Bronze';
  levelProgress = 0;

  constructor(
    private workoutService: WorkoutService,
    private progress: ProgressService,
    private profile: ProfileService
  ) {}

  ngOnInit(): void {

    // Load workouts
    this.workouts = this.workoutService.getWorkouts();

    // Live progress updates
    this.subs.add(
      this.progress.sessions$.subscribe(() => {
        this.refreshStats();
        this.pickTodayWorkout();
      })
    );

    // Live profile updates
    this.subs.add(
      this.profile.profile$.subscribe(p => {
        this.name = p?.name || 'Athlete';
        this.goal = p?.goal || 'Stay consistent';
      })
    );

    // Initial load
    this.refreshStats();
    this.pickTodayWorkout();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  // 🔥 Pick first incomplete workout
  pickTodayWorkout(): void {
    const completedIds: number[] =
      JSON.parse(localStorage.getItem('completed_workouts') || '[]');

    this.todayPick =
      this.workouts.find(w => !completedIds.includes(w.id)) || this.workouts[0];
  }

  // 📊 Refresh dashboard stats
  refreshStats(): void {
    const completed = this.progress.getCompletedCount();
    const streakDays = this.progress.getStreakDays();
    const minutes = this.progress.getTotalMinutes();

    this.animateValue('completedDistinct', completed);
    this.animateValue('streak', streakDays);
    this.animateValue('totalMinutes', minutes);

    // Weekly data (last 7 days)
    this.weekly = this.progress.getLastNDays(7);

    // 🏆 Simple level system
    if (minutes < 60) {
      this.levelName = 'Bronze';
      this.levelProgress = Math.round((minutes / 60) * 100);
    } else if (minutes < 180) {
      this.levelName = 'Silver';
      this.levelProgress = Math.round(((minutes - 60) / 120) * 100);
    } else if (minutes < 360) {
      this.levelName = 'Gold';
      this.levelProgress = Math.round(((minutes - 180) / 180) * 100);
    } else {
      this.levelName = 'Elite';
      this.levelProgress = 100;
    }
  }

  // ✨ Small counter animation
  animateValue(
    key: 'completedDistinct' | 'streak' | 'totalMinutes',
    target: number
  ): void {
    // start from current value (looks smoother than starting from 0 always)
    let current = (this as any)[key] as number;

    const diff = target - current;
    if (diff === 0) return;

    const steps = 15; // ~300ms total with 20ms interval
    const step = diff / steps;

    let i = 0;
    const interval = setInterval(() => {
      i++;
      current = current + step;

      if (i >= steps) {
        (this as any)[key] = target;
        clearInterval(interval);
        return;
      }

      (this as any)[key] = Math.round(current);
    }, 20);
  }
}
