import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TelemetryData } from '../../models/telemetryModel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-telemetry-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './telemetry-card.html',
  styleUrls: ['./telemetry-card.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TelemetryCard {
  @Input({ required: true }) telemetryData!: TelemetryData;
}
