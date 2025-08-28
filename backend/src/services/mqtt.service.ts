import mqtt, { MqttClient } from 'mqtt';
import { Telemetry } from '../models/Telemetry.js';
import TelemetrySchema from '../zod-shema/TelemetrySchema.js';

class MqttService {
  private readonly client: MqttClient;
  private readonly TelemetryModel: typeof Telemetry;

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
        const result = TelemetrySchema.safeParse(payload);

        if (result.success) {
          const { gps, ...rest } = result.data;
          await this.TelemetryModel.create({
            ...rest,
            gpsLat: gps.lat,
            gpsLng: gps.lng,
          });
          console.log(`[MQTT] Inserted telemetry for ${result.data.vehicleId}`);
        } else {
          console.error('[MQTT] Invalid data received:', result.error);
        }
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

  async getSpecificTelemetry(vehicleId?: string) {
    try {
      const telemetryData = await this.TelemetryModel.findAll({
        where: { vehicleId: vehicleId },
      });
      return telemetryData;
    } catch (error) {
      console.error(
        '[MqttService] Error fetching specific vehicle by id:',
        error
      );
      throw error;
    }
  }
}

export default MqttService;
