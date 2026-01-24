import { Injectable } from '@angular/core';
import { ProgressLog } from '../models/progress-log.model';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  progressLogs: ProgressLog[] = [];

  addLog(log: ProgressLog) {
    this.progressLogs.push(log);
  }

  getLogs() {
    return this.progressLogs;
  }
}
