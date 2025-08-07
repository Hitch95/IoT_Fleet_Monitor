import mqtt from 'mqtt';

// ---- CONFIGURATION ----
const MQTT_BROKER_URL = 'mqtt://broker.hivemq.com';
const VEHICLE_ID = 'TRACTOR-01';
const TELEMETRY_TOPIC = `fleet/telemetry/${VEHICLE_ID}`;
const PUBLISH_INTERVAL_MS = 5000; // Publishes every 5 seconds
// ---------------------

console.log(`[Simulator] Connecting to MQTT broker at ${MQTT_BROKER_URL}...`);
const client = mqtt.connect(MQTT_BROKER_URL);

client.on('connect', () => {
  console.log('[Simulator] Connected to MQTT broker!');
  // Starts publishing data at regular intervals
  setInterval(publishTelemetry, PUBLISH_INTERVAL_MS);
});

client.on('error', (error) => {
  console.error('[Simulator] MQTT connection error:', error);
  client.end(); // Stops the client in case of error
});

function generateTelemetryData() {
  const data = {
    vehicleId: VEHICLE_ID,
    timestamp: new Date().toISOString(),
    // Generates random values to simulate sensors
    fuelLevel: parseFloat((Math.random() * (80 - 20) + 20).toFixed(2)), // %
    engineTemp: parseFloat((Math.random() * (110 - 85) + 85).toFixed(2)), // °C
    gps: {
      lat: parseFloat((47.218371 + (Math.random() - 0.5) * 0.01).toFixed(6)),
      lng: parseFloat((-1.553621 + (Math.random() - 0.5) * 0.01).toFixed(6)),
    },
  };
  return data;
}

function publishTelemetry() {
  const telemetryData = generateTelemetryData();
  const payload = JSON.stringify(telemetryData);

  client.publish(TELEMETRY_TOPIC, payload, (error) => {
    if (error) {
      console.error('[Simulator] Failed to publish message:', error);
    } else {
      console.log(
        `[Simulator] Published message to ${TELEMETRY_TOPIC}:`,
        payload
      );
    }
  });
}

/*
We connect to the public HiveMQ broker.

When the connection is established (client.on('connect', ...)),
we start a setInterval that will call the publishTelemetry function
every 5 seconds.

generateTelemetryData creates a JavaScript object with simulated data.

publishTelemetry turns this object into a JSON string (JSON.stringify) and publishes it
to an MQTT topic specific to our vehicle.
*/
