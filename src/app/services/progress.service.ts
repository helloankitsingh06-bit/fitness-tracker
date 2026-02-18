import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface WorkoutSession {
  workoutId: number;
  dateISO: string;      // YYYY-MM-DD
  durationSec: number;  // seconds
}

@Injectable({ providedIn: 'root' })
export class ProgressService {
  private readonly sessionsKey = 'workout_sessions_v1';
  private readonly completedKey = 'completed_workouts';

  private sessionsSubject = new BehaviorSubject<WorkoutSession[]>(this.readSessions());
  sessions$ = this.sessionsSubject.asObservable();

  // ---------- helpers ----------
  private todayISO(): string {
    return new Date().toISOString().slice(0, 10);
  }

  private readSessions(): WorkoutSession[] {
    try {
      return JSON.parse(localStorage.getItem(this.sessionsKey) || '[]');
    } catch {
      return [];
    }
  }

  private writeSessions(sessions: WorkoutSession[]): void {
    localStorage.setItem(this.sessionsKey, JSON.stringify(sessions));
    this.sessionsSubject.next(sessions);
  }

  private readCompleted(): number[] {
    try {
      return JSON.parse(localStorage.getItem(this.completedKey) || '[]');
    } catch {
      return [];
    }
  }

  private writeCompleted(ids: number[]): void {
    localStorage.setItem(this.completedKey, JSON.stringify(ids));
  }

  // ---------- public API ----------
  markWorkoutCompleted(workoutId: number, durationSec: number): void {
    // 1) add to completed list (unique)
    const completed = this.readCompleted();
    if (!completed.includes(workoutId)) {
      completed.push(workoutId);
      this.writeCompleted(completed);
    }

    // 2) log a session for today
    const sessions = this.readSessions();
    sessions.push({
      workoutId,
      dateISO: this.todayISO(),
      durationSec: Math.max(0, Number(durationSec) || 0)
    });

    this.writeSessions(sessions);
  }

  // ---------- stats helpers ----------
  getCompletedCount(): number {
    return this.readCompleted().length;
  }

  getTotalTimeSec(): number {
    return this.readSessions().reduce((sum, s) => sum + (s.durationSec || 0), 0);
  }

  getTotalMinutes(): number {
    return Math.round(this.getTotalTimeSec() / 60);
  }

  // streak: consecutive days ending today with >= 1 session
  getStreakDays(): number {
    const sessions = this.readSessions();
    const daysSet = new Set(sessions.map(s => s.dateISO));

    let streak = 0;
    const d = new Date();

    while (true) {
      const iso = d.toISOString().slice(0, 10);
      if (!daysSet.has(iso)) break;
      streak++;
      d.setDate(d.getDate() - 1);
    }
    return streak;
  }

  // last N days (including today) summary for charts
  getLastNDays(n: number): { dateISO: string; count: number; minutes: number }[] {
    const sessions = this.readSessions();
    const map = new Map<string, { count: number; sec: number }>();

    for (const s of sessions) {
      const cur = map.get(s.dateISO) || { count: 0, sec: 0 };
      cur.count += 1;
      cur.sec += (s.durationSec || 0);
      map.set(s.dateISO, cur);
    }

    const out: { dateISO: string; count: number; minutes: number }[] = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      const v = map.get(iso) || { count: 0, sec: 0 };
      out.push({ dateISO: iso, count: v.count, minutes: Math.round(v.sec / 60) });
    }

    return out;
  }

  // optional: reset progress (useful for testing)
  clearAll(): void {
    localStorage.removeItem(this.sessionsKey);
    localStorage.removeItem(this.completedKey);
    this.sessionsSubject.next([]);
  }
}
