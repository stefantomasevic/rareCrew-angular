import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyTrackingComponent } from './hourly-tracking.component';

describe('HourlyTrackingComponent', () => {
  let component: HourlyTrackingComponent;
  let fixture: ComponentFixture<HourlyTrackingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HourlyTrackingComponent]
    });
    fixture = TestBed.createComponent(HourlyTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
