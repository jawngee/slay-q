import {z} from "zod";

export const ConfigSchema = z.object({
	queues: z.record(z.string(), z.object({
		concurrency: z.number(),
		alias: z.string().array().optional()
	}))
});

export type ConfigSchemaType = z.infer<typeof ConfigSchema>;
