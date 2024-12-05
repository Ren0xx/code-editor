import { z } from "zod";

import { MAX_FILE_SIZE } from "@/utils/constants";
import { extensionMap } from "@/utils/constants";

export const importFileSchema = (existingFileNames: string[]) =>
	z.object({
		file: z
			.custom<File>((file) => file instanceof File, {
				message: "Invalid file",
			})
			.refine((file) => file.size <= MAX_FILE_SIZE, {
				message: "File size must not exceed 5MB",
			})
			.refine(
				(file) => {
					const fileExtension = file.name
						.split(".")
						.pop()
						?.toLowerCase();
					return Object.values(extensionMap).includes(
						fileExtension ?? ""
					);
				},
				{
					message: `Invalid file type. Allowed types: ${Object.values(
						extensionMap
					).join(", ")}`,
				}
			)
			.refine(
				(file) => !existingFileNames.includes(file.name),
				"A file with this name already exists"
			),
	});

