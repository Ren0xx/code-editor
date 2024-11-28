import { z } from "zod";
import { filePattern } from "@/utils/constants";

export const createOrRenameSchema = (existingFileNames: string[]) =>
	z.object({
		fileName: z
			.string()
			.refine(
				(name) => filePattern.test(name),
				"Invalid file name format."
			)
			.refine(
				(name) => !existingFileNames.includes(name),
				"A file with this name already exists"
			),
	});

