import {z} from "zod";

export interface SlayQRPCError {
	message: string;
}

export const SlayQJobDefinitionSchema = z.object({
	identifier: z.string(),
	job_key: z.string(),
	payload: z.any().nullable(),
	queue_name: z.string().optional(),
	run_at: z.string().optional(),
	max_attempts: z.number().optional(),
	priority: z.number().optional(),
	flags: z.string().array().optional(),
	job_key_mode: z.enum(["replace", "preserve_run_at", "unsafe_dedupe"]).optional()
});

export type SlayQJobDefinition = z.infer<typeof SlayQJobDefinitionSchema>;
