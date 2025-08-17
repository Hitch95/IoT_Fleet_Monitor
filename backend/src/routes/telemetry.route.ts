import express from 'express';
import TelemetryController from '../controllers/telemetry.controllers.js';

const router = express.Router();

router.get('/', TelemetryController.getAllTelemetry);

export default router;
