import express, { Request, Response } from 'express';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.get('/api/status', (req: Request, res: Response) => {
  res.send({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

export default app;
