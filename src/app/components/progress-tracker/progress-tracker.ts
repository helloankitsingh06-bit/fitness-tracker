import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-progress-tracker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progress-tracker.html',
  styleUrls: ['./progress-tracker.css']
})
export class ProgressTrackerComponent implements OnInit, OnDestroy {
  completedCount = 0;
  streakDays = 0;
  totalHours = 0;

  weekly: { dateISO: string; count: number; minutes: number }[] = [];
  maxCount = 1;

  private refreshId?: number;

  constructor(private progress: ProgressService) {}

  ngOnInit(): void {
    this.refresh();

    // ✅ auto update if user completes workout in another tab/page
    window.addEventListener('storage', this.onStorage);

    // ✅ auto update while app is open
    this.refreshId = window.setInterval(() => this.refresh(), 1000);
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.onStorage);
    if (this.refreshId) window.clearInterval(this.refreshId);
  }

  private onStorage = () => this.refresh();

  refresh() {
    this.completedCount = this.progress.getCompletedCount();
    this.streakDays = this.progress.getStreakDays();

    const totalSec = this.progress.getTotalTimeSec();
    this.totalHours = Math.round((totalSec / 3600) * 10) / 10; // 1 decimal

    this.weekly = this.progress.getLastNDays(7);
    this.maxCount = Math.max(1, ...this.weekly.map(d => d.count));
  }

  label(iso: string) {
    // shows "Mon", "Tue"...
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { weekday: 'short' });
  }

  barHeight(count: number) {
    return Math.round((count / this.maxCount) * 100);
  }
}
