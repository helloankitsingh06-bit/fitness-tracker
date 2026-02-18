import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressTrackerComponent } from './progress-tracker';

describe('ProgressTracker', () => {
  let component: ProgressTrackerComponent;
  let fixture: ComponentFixture<ProgressTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
