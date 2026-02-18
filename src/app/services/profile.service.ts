import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type UserProfile = {
  name: string;
  goal: string;
};

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private readonly key = 'profile_v1';

  private profileSubject = new BehaviorSubject<UserProfile>(this.loadProfile());
  profile$ = this.profileSubject.asObservable();

  private loadProfile(): UserProfile {
    try {
      return JSON.parse(localStorage.getItem(this.key) || '{"name":"","goal":""}');
    } catch {
      return { name: '', goal: '' };
    }
  }

  saveProfile(profile: UserProfile) {
    localStorage.setItem(this.key, JSON.stringify(profile));
    this.profileSubject.next(profile);
  }
}
