import mqtt, { MqttClient } from 'mqtt';
import { Telemetry } from '../models/Telemetry';

const MQTT_BROKER_URL = 'mqtt://broker.hivemq.com';
const TOPIC_TO_SUSCRIBE = 'fleet/telemetry/#';

interface CreateTelemetryData {
  vehicleId: string;
  timestamp: Date;
  fuelLevel: number;
  engineTemp: number;
  gps: {
    lat: number;
    lng: number;
  };
}

class MqttService {
  private client: MqttClient;
  private Telemetry: typeof Telemetry;

  constructor(TelemetryModel: typeof Telemetry) {
    this.Telemetry = TelemetryModel;
    console.log(`[MqttService] Connection with broker: ${MQTT_BROKER_URL}`);
    this.client = mqtt.connect(MQTT_BROKER_URL);
    // We start configuring our “listeners” as soon as the object is created
    this.setupEventHandlers();
  }

  async createMessage(data: CreateTelemetryData): Promise<void> {
    const message = JSON.stringify(data);
    this.client.publish(TOPIC_TO_SUSCRIBE, message, (err) => {
      if (err) {
        console.error('Error publishing message:', err);
      } else {
        console.log('Message published successfully');
      }
    });
  }

  private setupEventHandlers(): void {
    // This manager is activated when the connection is successful.
    this.client.on('connect', () => {
      console.log('[MqttService] Successfully connected to the MQTT broker!');

      this.client.subscribe(TOPIC_TO_SUSCRIBE, (err) => {
        if (err) {
          console.error('Error subscribing to topic:', err);
        } else {
          console.log('Subscribed to topic successfully');
        }
      });
    });

    // This manager is activated every time a message arrives on a topic to which you are subscribed.
    this.client.on('message', async (topic, payload) => {
      try {
        const messageString = payload.toString();
        const jsonData = JSON.parse(messageString);
        console.log(
          `Received message: ${JSON.stringify(
            jsonData
          )}. Received topic: ${topic}.`
        );
        const savedMessage = await this.Telemetry.create({
          vehicleId: jsonData.vehicleId,
          timestamp: new Date(jsonData.timestamp),
          fuelLevel: jsonData.fuelLevel,
          engineTemp: jsonData.engineTemp,
          gpsLat: jsonData.gps.lat,
          gpsLng: jsonData.gps.lng,
        });
        console.log(`Message saved to database: ${savedMessage.id}`);
      } catch (error) {
        console.error('Failed to parse JSON:', error);
      }
    });

    this.client.on('error', (error) => {
      console.error('[MqttService] An error happened:', error);
    });
  }
}

export default MqttService;
