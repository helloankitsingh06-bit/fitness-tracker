import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { WorkoutService } from '../../services/workout.service';

@Component({
  selector: 'app-workout-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workout-detail.html',
  styleUrls: ['./workout-detail.css']
})
export class WorkoutDetailComponent implements OnInit {

  workout: any;

  constructor(
    private route: ActivatedRoute,
    private workoutService: WorkoutService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.workout = this.workoutService.getWorkoutById(id);
  }
}
