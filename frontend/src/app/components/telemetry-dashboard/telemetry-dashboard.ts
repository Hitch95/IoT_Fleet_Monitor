import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { TelemetryData } from '../../models/telemetryModel';
import { TelemetryCard } from '../telemetry-card/telemetry-card';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-telemetry-dashboard',
  imports: [TelemetryCard, AsyncPipe],
  templateUrl: './telemetry-dashboard.html',
  styleUrl: './telemetry-dashboard.css'
})
export class TelemetryDashboard implements OnInit {
  telemetryDataList$: Observable<TelemetryData[]> | null = null;

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchTelemetryData();
  }

  fetchTelemetryData(): void {
    this.telemetryDataList$ = this.apiService.getAllTelemetryData();
  }
}