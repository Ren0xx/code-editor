"use client";

import { createFile } from "@/lib/code/codeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { type Language, type File } from "@/types/stateTypes";
import { type RouterOutputs } from "@/trpc/react";

type FileData = RouterOutputs["file"]["getFileByLinkId"];

const useAddFileFromLink = (shareLink: string) => {
	const dispatch = useAppDispatch();

	const filesNames = useAppSelector((state) =>
		state.code.files.map((file) => file.name)
	);

	const handleAddFile = async (fileData: FileData) => {
		if (!fileData || fileData === "Wrong link id format") {
			return "Wrong link format";
		}
		if (fileData === "File not found") {
			return "File not found";
		}
		const firstPartOfUUID = shareLink.split("-")[0]!;
		const fileName = `${firstPartOfUUID}.${fileData.name.split(".")[1]}`;

		if (filesNames.includes(fileName)) {
			return "File with that name already exists";
		}

		const file: File = {
			name: fileName,
			code: fileData.content,
			language: (fileData.language as Language) ?? "javascript",
		};

		dispatch(createFile(file));
		return "File added successfully";
	};
	return { handleAddFile };
};

export default useAddFileFromLink;

