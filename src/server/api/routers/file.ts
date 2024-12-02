import { z } from "zod";

import {
	createTRPCRouter,
	privateProcedure,
	publicProcedure,
} from "@/server/api/trpc";
import { files, users } from "@/server/db/schema";
import { MAX_CONTENT_LENGTH } from "@/utils/constants";
import { eq } from "drizzle-orm";
import { isValidUUID4 } from "@/utils/helperFunctions";
import { TRPCError } from "@trpc/server";

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
			const user = await ctx.db.query.users.findFirst({
				where: eq(users.id, ctx.currentUserId),
				columns: {
					remainingFileShare: true,
				},
			});
			// LIMIT REACHED
			if (user?.remainingFileShare === 0) {
				throw new TRPCError({
					code: "FORBIDDEN",
					message: "You have reached your share limit",
					
				});
			}

			const newFile = await ctx.db
				.insert(files)
				.values({
					name: input.name,
					content: input.content,
					language: input.language ?? null,
					ownerId: ctx.currentUserId,
				})
				.returning({ link: files.linkId });

			//ERROR WITH FILE SHARING
			const shareLink = newFile[0]?.link;
			if (!shareLink) {
				throw new TRPCError({
					code: "INTERNAL_SERVER_ERROR",
					message: "Failed to create share link",
				});
			}

			await ctx.db
				.update(users)
				.set({
					remainingFileShare: (user?.remainingFileShare ?? 0) - 1,
				})
				.where(eq(users.id, ctx.currentUserId));

			return {
				success: true,
				shareLink,
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

