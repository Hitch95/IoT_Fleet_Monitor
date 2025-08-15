export interface TelemetryData {
  id: string;
  vehicleId: string;
  timestamp: Date;
  fuelLevel: number;
  engineTemp: number;
  gpsLat: number;
  gpsLng: number;
  createdAt: Date;
  updatedAt: Date;
}
