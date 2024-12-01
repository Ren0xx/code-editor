import { z } from "zod";

import {
	createTRPCRouter,
	privateProcedure,
	publicProcedure,
} from "@/server/api/trpc";
import { files } from "@/server/db/schema";
import { MAX_CONTENT_LENGTH } from "@/utils/constants";
import { eq } from "drizzle-orm";
import { isValidUUID4 } from "@/utils/helperFunctions";

export const fileRouter = createTRPCRouter({
	shareFile: privateProcedure
		.input(
			z.object({
				name: z.string().min(1),
				content: z.string().min(1).max(MAX_CONTENT_LENGTH),
				language: z.string().optional(),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const newFile = await ctx.db
				.insert(files)
				.values({
					name: input.name,
					content: input.content,
					language: input.language ?? null,
					ownerId: ctx.currentUserId,
				})
				.returning({ link: files.linkId });

			return {
				shareLink: newFile[0]?.link,
				success: !!newFile[0]?.link,
			};
		}),
	getFileByLinkId: publicProcedure
		.input(z.string())
		.query(async ({ ctx, input }) => {
			if (!isValidUUID4(input)) {
				return "Wrong link id format";
			}
			const file = await ctx.db.query.files.findFirst({
				where: eq(files.linkId, input),
				columns: {
					name: true,
					content: true,
					language: true,
				},
			});
			return file ?? "File not found";
		}),
});

