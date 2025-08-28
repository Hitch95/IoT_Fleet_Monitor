import express from 'express';
import TelemetryController from '../controllers/telemetry.controllers.js';

const router = express.Router();

router.get('/', TelemetryController.getAllTelemetry);
router.get('/:vehicleId', TelemetryController.getSpecificTelemetry);

export default router;
