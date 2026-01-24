import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';



@Component({
  selector: 'app-progress-tracker',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './progress-tracker.html',
  styleUrls: ['./progress-tracker.css']
})
export class ProgressTrackerComponent {}
