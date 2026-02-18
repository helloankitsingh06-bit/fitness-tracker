import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Goal = 'Lose Fat' | 'Build Muscle' | 'Maintain' | 'Improve Stamina';

interface UserProfile {
  name: string;
  goal: Goal;
  age: number | null;
  heightCm: number | null;
  weightKg: number | null;
  targetWeightKg: number | null;
  workoutsPerWeek: number | null;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {
  private key = 'user_profile';

  profile: UserProfile = {
    name: '',
    goal: 'Improve Stamina',
    age: null,
    heightCm: null,
    weightKg: null,
    targetWeightKg: null,
    workoutsPerWeek: 3
  };

  savedMsg = '';
  errorMsg = '';

  goals: Goal[] = ['Lose Fat', 'Build Muscle', 'Maintain', 'Improve Stamina'];

  ngOnInit(): void {
    const raw = localStorage.getItem(this.key);
    if (raw) {
      try {
        this.profile = { ...this.profile, ...JSON.parse(raw) };
      } catch {}
    }
  }

  get bmi(): number | null {
    const h = this.profile.heightCm;
    const w = this.profile.weightKg;
    if (!h || !w) return null;
    const meters = h / 100;
    return Math.round((w / (meters * meters)) * 10) / 10;
  }

  get bmiLabel(): string {
    const b = this.bmi;
    if (b == null) return '';
    if (b < 18.5) return 'Underweight';
    if (b < 25) return 'Normal';
    if (b < 30) return 'Overweight';
    return 'Obese';
  }

  private clearMsgs() {
    this.savedMsg = '';
    this.errorMsg = '';
  }

  save() {
    this.clearMsgs();

    if (!this.profile.name.trim()) {
      this.errorMsg = 'Please enter your name.';
      return;
    }

    localStorage.setItem(this.key, JSON.stringify(this.profile));
    this.savedMsg = '✅ Profile saved!';
    setTimeout(() => (this.savedMsg = ''), 2000);
  }

  reset() {
    this.clearMsgs();
    localStorage.removeItem(this.key);
    this.profile = {
      name: '',
      goal: 'Improve Stamina',
      age: null,
      heightCm: null,
      weightKg: null,
      targetWeightKg: null,
      workoutsPerWeek: 3
    };
    this.savedMsg = 'Profile cleared.';
    setTimeout(() => (this.savedMsg = ''), 2000);
  }
}
