import { Component, Input, OnInit } from '@angular/core';
import { TelemetryData } from '../../models/telemetryModel';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-telemetry-card',
  imports: [DatePipe],
  templateUrl: './telemetry-card.html',
  styleUrls: ['./telemetry-card.css']
})
export class TelemetryCard implements OnInit {
  @Input({ required: true }) telemetryData!: TelemetryData;

  ngOnInit(): void {
    // Initialization logic here
  }
}
