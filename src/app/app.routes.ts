import { Routes } from '@angular/router';

export const routes: Routes = [

  // 🌟 Redirect root → welcome
  { 
    path: '', 
    redirectTo: 'welcome', 
    pathMatch: 'full' 
  },

  // 👋 Welcome Page
  {
    path: 'welcome',
    loadComponent: () =>
      import('./components/splash/splash')
        .then(m => m.SplashComponent)
  },

  // 🏠 Dashboard
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard')
        .then(m => m.DashboardComponent)
  },

  // 🏋️ Workouts List
  {
    path: 'workouts',
    loadComponent: () =>
      import('./components/workout-list/workout-list')
        .then(m => m.WorkoutListComponent)
  },

  // 📋 Workout Detail
  {
    path: 'workout/:id',
    loadComponent: () =>
      import('./components/workout-detail/workout-detail')
        .then(m => m.WorkoutDetailComponent)
  },

  // 📈 Progress
  {
    path: 'progress',
    loadComponent: () =>
      import('./components/progress-tracker/progress-tracker')
        .then(m => m.ProgressTrackerComponent)
  },

  // 👤 Profile
  {
    path: 'profile',
    loadComponent: () =>
      import('./components/profile/profile')
        .then(m => m.ProfileComponent)
  },

  // ❌ Fallback
  {
    path: '**',
    redirectTo: 'welcome'
  }

];
