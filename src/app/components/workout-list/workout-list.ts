imports: [
  CommonModule,
  RouterModule,
  MatCardModule,
  MatButtonModule
]

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { WorkoutService } from '../../services/workout.service';
import { WorkoutPlan } from '../../models/workout-plan.model';
@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './workout-list.html',
  styleUrls: ['./workout-list.css']
})
export class WorkoutListComponent implements OnInit {
  workouts: WorkoutPlan[] = [];
  constructor(private workoutService: WorkoutService) {}
  ngOnInit(): void {
    this.workouts = this.workoutService.getWorkouts();
  }
}
