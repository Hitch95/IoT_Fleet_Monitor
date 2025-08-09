import mqtt, { MqttClient } from 'mqtt';
import { Telemetry } from '../models/Telemetry';

class MqttService {
  private client: MqttClient;
  private TelemetryModel: typeof Telemetry;

  constructor(TelemetryModel: typeof Telemetry) {
    this.TelemetryModel = TelemetryModel;
    this.client = mqtt.connect(
      process.env.MQTT_URL || 'mqtt://broker.hivemq.com'
    );

    this.client.on('connect', () => {
      console.log('[MQTT] Connected to broker');
      this.client.subscribe('fleet/telemetry/#', (err) => {
        if (err) {
          console.error('[MQTT] Subscription error:', err);
        } else {
          console.log('[MQTT] Subscribed to fleet/telemetry/#');
        }
      });
    });

    this.client.on('message', async (topic, message) => {
      try {
        const payload = JSON.parse(message.toString());
        const now = new Date();
        await this.TelemetryModel.create({
          vehicleId: payload.vehicleId,
          gpsLat: payload.gpsLat ?? 0,
          gpsLng: payload.gpsLng ?? 0,
          fuelLevel: payload.fuelLevel,
          engineTemp: payload.engineTemp ?? 0,
          timestamp: payload.timestamp ? new Date(payload.timestamp) : now,
        });
        console.log(`[MQTT] Inserted telemetry for ${payload.vehicleId}`);
      } catch (err) {
        console.error('[MQTT] Message processing error:', err);
      }
    });
  }

  async getAllTelemetry() {
    try {
      const telemetryData = await this.TelemetryModel.findAll({
        order: [['timestamp', 'DESC']],
      });
      return telemetryData;
    } catch (error) {
      console.error('[MqttService] Error fetching all telemetry:', error);
      throw error;
    }
  }
}

export default MqttService;
