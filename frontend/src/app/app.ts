import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TelemetryDashboard } from "./components/telemetry-dashboard/telemetry-dashboard";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TelemetryDashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'iot-fleet-monitor';
}
