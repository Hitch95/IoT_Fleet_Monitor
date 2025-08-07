import app from './app';
import sequelize from './config/database';
import TelemetryModel from './models/Telemetry';
import MqttService from './services/Mqtt.service';

const port = Number(process.env.PORT) || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection ok!');

    await sequelize.sync({ force: true });
    console.log('Database tables synchronized!');

    const Telemetry = TelemetryModel(sequelize);
    new MqttService(Telemetry);
    console.log('MQTT Service initialized!');
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
}

startServer();
