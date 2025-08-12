import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemetryDashboard } from './telemetry-dashboard';

describe('TelemetryDashboard', () => {
  let component: TelemetryDashboard;
  let fixture: ComponentFixture<TelemetryDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelemetryDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelemetryDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
