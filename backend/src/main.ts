import app from './app.js';
import sequelize from './config/database.js';
import { initTelemetry, Telemetry } from './models/Telemetry.js';
import MqttService from './services/mqtt.service.js';

const port = Number(process.env.PORT) || 3000;

async function startServer() {
  try {
    console.log('Attempting to authenticate with database...');
    await sequelize.authenticate();
    console.log('Database connection ok!');

    // Initialize the Telemetry model before sync
    console.log('Initializing Telemetry model...');
    initTelemetry(sequelize);
    console.log('Telemetry model initialized!');

    console.log('Synchronizing database tables...');
    await sequelize.sync({ force: true });
    console.log('Database tables synchronized!');

    console.log('Initializing MQTT Service...');
    const mqttServiceInstance = new MqttService(Telemetry);
    console.log('MQTT Service initialized!');

    // --- IMPORTANT: Make the instance available globally ---
    // Attach the instance to the app object.
    // Type assertion is used here for simplicity; a more robust approach might use module augmentation or a service locator.
    (app as any).mqttService = mqttServiceInstance;
    // --- End of making instance available ---

    const server = app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });

    server.on('error', (error) => {
      console.error('Server error:', error);
      process.exit(1);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();
