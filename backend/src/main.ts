import app from './app';
import MqttService from './services/Mqtt.service';

const port = Number(process.env.PORT) || 3000;

new MqttService();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
