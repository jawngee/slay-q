export interface SlayQRPCError {
	message: string;
}

export type SlayQJobDefinition = {
	identifier: string;
	job_key: string;
	payload: any | null;
	queue_name?: string;
	run_at?: string;
	max_attempts?: number;
	priority?: number;
	flags?: string[];
	job_key_mode?: "replace" | "preserve_run_at" | "unsafe_dedupe";
};