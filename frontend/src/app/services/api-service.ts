import { HttpClient, httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TelemetryData } from '../models/telemetryModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly backendUrl = 'http://localhost:3000/api/telemetry';
  resource = httpResource<TelemetryData>(() => this.backendUrl);

  // Constructor to inject HttpClient
  constructor(private readonly http: HttpClient) {}

  // Get all telemetry data
  getAllTelemetryData(): Observable<TelemetryData[]> {
    return this.http.get<TelemetryData[]>(this.backendUrl);
  }

  // Get telemetry data by ID
  getTelemetryDataById(id: string): Observable<TelemetryData> {
    return this.http.get<TelemetryData>(`${this.backendUrl}/${id}`);
  }

  // Create new telemetry data
  createTelemetryData(data: TelemetryData): Observable<TelemetryData> {
    return this.http.post<TelemetryData>(this.backendUrl, data);
  }

  // Update telemetry data by ID
  updateTelemetryData(id: string, data: TelemetryData): Observable<TelemetryData> {
    return this.http.put<TelemetryData>(`${this.backendUrl}/${id}`, data);
  }

  // Delete telemetry data by ID
  deleteTelemetryData(id: string): Observable<void> {
    return this.http.delete<void>(`${this.backendUrl}/${id}`);
  }
}
