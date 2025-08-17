import type { Request, Response } from 'express';
import MqttService from '../services/mqtt.service.js';

class TelemetryController {
  static async getAllTelemetry(req: Request, res: Response) {
    try {
      // --- Retrieve the MQTT service instance from the app object ---
      // req.app refers to the Express application instance
      // We attached the mqttService instance in main.ts
      const mqttServiceInstance = (req.app as any).mqttService as MqttService;

      // Check if the instance was successfully retrieved
      if (!mqttServiceInstance) {
        console.error(
          '[TelemetryController] MQTT Service instance not found on app object.'
        );
        return res
          .status(500)
          .json({ error: 'Internal Server Error - MQTT Service unavailable' });
      }
      // --- End of retrieving instance ---

      const telemetryData = await mqttServiceInstance.getAllTelemetry();
      res.json(telemetryData);
    } catch (error) {
      console.error(
        '[TelemetryController] Error fetching telemetry data:',
        error
      );
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default TelemetryController;
