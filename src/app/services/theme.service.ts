import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private dark = false;

  toggle(): void {
    this.dark = !this.dark;
    document.body.classList.toggle('dark', this.dark);
    localStorage.setItem('theme', this.dark ? 'dark' : 'light');
  }

  applyTheme(): void {
    const savedTheme = localStorage.getItem('theme');
    this.dark = savedTheme === 'dark';
    document.body.classList.toggle('dark', this.dark);
  }

  isDark(): boolean {
    return this.dark;
  }
}