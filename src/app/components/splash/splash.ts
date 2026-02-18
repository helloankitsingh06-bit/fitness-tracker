import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule   // needed if you use routerLink in HTML
  ],
  templateUrl: './splash.html',
  styleUrls: ['./splash.css']
})
export class SplashComponent {

  isExiting = false;

  constructor(private router: Router) {}

  enterApp(): void {
    this.isExiting = true;

    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 300); // 0.3 seconds
  }
}
