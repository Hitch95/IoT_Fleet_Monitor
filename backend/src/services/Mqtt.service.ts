import mqtt, { MqttClient } from 'mqtt';

const MQTT_BROKER_URL = 'mqtt://broker.hivemq.com';
const TOPIC_TO_SUSCRIBE = 'fleet/telemetry/#';

class MqttService {
  private client: MqttClient;

  constructor() {
    console.log(`[MqttService] Connexion au broker: ${MQTT_BROKER_URL}`);
    this.client = mqtt.connect(MQTT_BROKER_URL);
    // We start configuring our “listeners” as soon as the object is created
    this.setupEventHandlers();
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
    this.client.on('message', (topic, payload) => {
      try {
        const messageString = payload.toString();
        const jsonData = JSON.parse(messageString);
        console.log(`Received message: ${jsonData}. Received topic: ${topic}.`);
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
