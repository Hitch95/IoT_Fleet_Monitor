import mqtt from 'mqtt';

// ---- CONFIGURATION ----
const MQTT_BROKER_URL = 'mqtt://broker.hivemq.com';
const VEHICLE_ID = 'TRACTOR-01';
const TELEMETRY_TOPIC = `fleet/telemetry/${VEHICLE_ID}`;
const PUBLISH_INTERVAL_MS = 5000; // Publie toutes les 5 secondes
// ---------------------

console.log(`[Simulator] Connecting to MQTT broker at ${MQTT_BROKER_URL}...`);
const client = mqtt.connect(MQTT_BROKER_URL);

client.on('connect', () => {
  console.log('[Simulator] Connected to MQTT broker!');
  // Lance la publication des données à intervalle régulier
  setInterval(publishTelemetry, PUBLISH_INTERVAL_MS);
});

client.on('error', (error) => {
  console.error('[Simulator] MQTT connection error:', error);
  client.end(); // Arrête le client en cas d'erreur
});

function generateTelemetryData() {
  const data = {
    vehicleId: VEHICLE_ID,
    timestamp: new Date().toISOString(),
    // Génère des valeurs aléatoires pour simuler les capteurs
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
On se connecte au broker public HiveMQ.

Quand la connexion est établie (client.on('connect', ...)), 
on lance un setInterval qui appellera la fonction publishTelemetry 
toutes les 5 secondes.

generateTelemetryData crée un objet JavaScript avec des données simulées.

publishTelemetry transforme cet objet en une chaîne 
de caractères JSON (JSON.stringify) et le publie sur 
un topic MQTT spécifique à notre véhicule.
*/
