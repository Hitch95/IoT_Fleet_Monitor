import mqtt from 'mqtt';

// ---- CONFIGURATION ----
const MQTT_BROKER_URL = 'mqtt://broker.hivemq.com';
// List of vehicle IDs to simulate
const VEHICLE_IDS = ['TRACTOR-01', 'TRACTOR-02', 'HARVESTER-01', 'TRUCK-01'];
const PUBLISH_INTERVAL_MS = 5000; // Publishes every 5 seconds for each vehicle
// --------------------

console.log(`[Simulator] Connecting to MQTT broker at ${MQTT_BROKER_URL}...`);
const client = mqtt.connect(MQTT_BROKER_URL);

client.on('connect', () => {
  console.log('[Simulator] Connected to MQTT broker!');

  // Create a simulator for each vehicle
  VEHICLE_IDS.forEach((vehicleId) => {
    console.log(`[Simulator] Starting simulation for ${vehicleId}`);
    // Stagger the start time of each simulator to avoid simultaneous publishing
    const delay = Math.random() * PUBLISH_INTERVAL_MS;
    setTimeout(() => {
      setInterval(() => publishTelemetry(vehicleId), PUBLISH_INTERVAL_MS);
    }, delay);
  });
});

client.on('error', (error) => {
  console.error('[Simulator] MQTT connection error:', error);
  client.end();
});

function generateTelemetryData(vehicleId: string) {
  const data = {
    vehicleId: vehicleId,
    timestamp: new Date().toISOString(),
    // Generates random values to simulate sensors
    fuelLevel: parseFloat((Math.random() * (80 - 20) + 20).toFixed(2)), // %
    engineTemp: parseFloat((Math.random() * (110 - 85) + 85).toFixed(2)), // °C
    gps: {
      lat: parseFloat((47.218371 + (Math.random() - 0.5) * 0.02).toFixed(6)),
      lng: parseFloat((-1.553621 + (Math.random() - 0.5) * 0.02).toFixed(6)),
    },
  };
  return data;
}

function publishTelemetry(vehicleId: string) {
  const telemetryData = generateTelemetryData(vehicleId);
  const payload = JSON.stringify(telemetryData);
  const topic = `fleet/telemetry/${vehicleId}`;

  client.publish(topic, payload, (error) => {
    if (error) {
      console.error(`[Simulator] Failed to publish for ${vehicleId}:`, error);
    } else {
      console.log(`[Simulator] Published message to ${topic}:`, payload);
    }
  });
}
