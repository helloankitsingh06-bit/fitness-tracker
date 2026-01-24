import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/workout-list/workout-list')
        .then(m => m.WorkoutListComponent)
  },
  {
    path: 'workout/:id',
    loadComponent: () =>
      import('./components/workout-detail/workout-detail')
        .then(m => m.WorkoutDetailComponent)
  },
  {
    path: 'progress',
    loadComponent: () =>
      import('./components/progress-tracker/progress-tracker')
        .then(m => m.ProgressTrackerComponent)
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/profile/profile')
        .then(m => m.ProfileComponent)
  }
];
