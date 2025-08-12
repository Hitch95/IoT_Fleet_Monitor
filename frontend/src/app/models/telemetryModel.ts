export interface TelemetryData {
  id: string;
  timestamp: Date;
  deviceId: string;
  temperature: number;
  humidity: number;
  location: {
    latitude: number;
    longitude: number;
  };
}
