import * as z from 'zod/mini';

const TelemetrySchema = z.object({
  vehicleId: z.string(),
  timestamp: z.coerce.date(),
  fuelLevel: z.number(),
  engineTemp: z.number(),
  gps: z.object({
    lng: z.number(),
    lat: z.number(),
  }),
});

export default TelemetrySchema;
