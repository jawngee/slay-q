import {SlayQSupabaseDriver} from "@slay-pics/slay-q";
const config = useRuntimeConfig();

export const defaultRPCClient = new SlayQSupabaseDriver({
	supabaseUrl: config.supabaseUrl,
	supabaseServiceKey: config.supabaseServiceKey,
});
