import { Component, inject, Signal, ChangeDetectionStrategy } from '@angular/core';
import { ApiService } from '../../services/api-service';
import { TelemetryData } from '../../models/telemetryModel';
import { TelemetryCard } from '../telemetry-card/telemetry-card';
import { KeyValuePipe } from '@angular/common';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

interface GroupedTelemetryData {
  [key: string]: TelemetryData[];
}

@Component({
  selector: 'app-telemetry-dashboard',
  imports: [TelemetryCard, KeyValuePipe],
  templateUrl: './telemetry-dashboard.html',
  styleUrl: './telemetry-dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class TelemetryDashboard {
  private readonly apiService = inject(ApiService);
  protected telemetryDataList: Signal<GroupedTelemetryData | undefined> = toSignal(
    this.apiService.getAllTelemetryData().pipe(
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
    )
  );
}