import {SlayQSupabaseDriver} from "@slay-pics/slay-q";
import {SlayQPostgresDriver} from "./postgres-driver";

const config = useRuntimeConfig();

export const defaultRPCClient =
	config.databaseUrl ? new SlayQPostgresDriver({
		connectionUrl: config.databaseUrl
	}) : new SlayQSupabaseDriver({
		supabaseUrl: config.supabaseUrl,
		supabaseServiceKey: config.supabaseServiceKey,
	});
