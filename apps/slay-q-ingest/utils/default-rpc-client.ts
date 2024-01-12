import {SlayQPostgresDriver} from "@slay-pics/slay-q-postgres";
import {SlayQSupabaseDriver} from "@slay-pics/slay-q-supabase";

const config = useRuntimeConfig();

export const defaultRPCClient =
	config.databaseUrl ? new SlayQPostgresDriver({
		connectionUrl: config.databaseUrl
	}) : new SlayQSupabaseDriver({
		supabaseUrl: config.supabaseUrl,
		supabaseServiceKey: config.supabaseServiceKey,
	});
