import { z } from "zod";
import { isValidUUID4 } from "@/utils/helperFunctions";

export const addFromLinkSchema = z.object({
	shareLink: z.string().refine((val) => isValidUUID4(val), {
		message: "Must be a valid share link",
	}),
});

