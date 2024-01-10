import {z} from "zod";

export const SlayQEmptyEvent = z.object({});
export type SlayQEmptyEventType = z.infer<typeof SlayQEmptyEvent>;

export const SlayQReceiveEventPayloadSchema = z.object({
	job_key: z.string(),
	retry: z.number(),
	time: z.number(),
	event: z.string(),
	data: z.any(),
	cache: z.any().optional(),
});
export type SlayQReceiveEventPayload = z.infer<typeof SlayQReceiveEventPayloadSchema>;
