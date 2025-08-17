import express, { Request, Response } from 'express';
import cors from 'cors';

import telemetryRoutes from './routes/telemetry.route.js';

const app = express();

const allowedOrigins = [process.env.FRONTEND_URL || 'http://localhost:4200'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Authorize requests without origin (like Postman) in development
      if (!origin && process.env.NODE_ENV !== 'production') {
        return callback(null, true);
      }
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  })
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/api/status', (req: Request, res: Response) => {
  res.send({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/telemetry', telemetryRoutes);
// Express v5.1 syntax
app.all('/api/{*apiWildcard}', (req: Request, res: Response) => {
  res.status(404).send({
    error: 'Not Found',
  });
});

export default app;
