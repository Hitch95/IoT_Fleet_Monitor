import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { TelemetryData } from '../../models/telemetryModel';
import { TelemetryCard } from '../telemetry-card/telemetry-card';
import { AsyncPipe, KeyValuePipe } from '@angular/common';
import { map, Observable } from 'rxjs';

interface GroupedTelemetryData {
  [key: string]: TelemetryData[];
}

@Component({
  selector: 'app-telemetry-dashboard',
  imports: [TelemetryCard, AsyncPipe, KeyValuePipe],
  templateUrl: './telemetry-dashboard.html',
  styleUrl: './telemetry-dashboard.css'
})
export class TelemetryDashboard implements OnInit {
  telemetryDataList$: Observable<GroupedTelemetryData> | null =  null;

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchTelemetryData();
  }

  fetchTelemetryData(): void {
    this.telemetryDataList$ = this.apiService.getAllTelemetryData().pipe(
      map((data: TelemetryData[]) => {
        return data.reduce((accumulator: GroupedTelemetryData, item) => {
          const key = item.vehicleId;

          if (!accumulator[key]) {
            accumulator[key] = [];
          };

          accumulator[key].push(item);
          return accumulator;
        }, {});
      })
    );
  }
}