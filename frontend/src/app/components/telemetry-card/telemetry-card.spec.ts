import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelemetryCard } from './telemetry-card';

describe('TelemetryCard', () => {
  let component: TelemetryCard;
  let fixture: ComponentFixture<TelemetryCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelemetryCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelemetryCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
