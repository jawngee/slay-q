import {calcSig} from "@slay-pics/signature";
import {H3Event} from "h3";

export async function validateRequest(event: H3Event) {
	const config = useRuntimeConfig(event);

	const body = await readBody(event);

	const sig = getHeader(event, "X-SlayQ-Signature");
	if (!sig) {
		return false;
	}
	const calculateSig = calcSig(body, config.slayQSecret);
	if (calculateSig !== sig) {
		return false;
	}

	return true;
}
