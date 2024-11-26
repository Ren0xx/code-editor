"use client";

import { api } from "@/trpc/react";
import { createFile } from "@/lib/code/codeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { type Language, type File } from "@/types/stateTypes";
import { useRouter } from "next/navigation";
import { isValidUUID } from "@/utils/helperFunctions";

const useAddFileFromLink = (fileId:string) => {
	const router = useRouter();
	const dispatch = useAppDispatch();

	const filesNames = useAppSelector((state) =>
		state.code.files.map((file) => file.name)
	);

	const { data: fileData } = api.file.getFileByLinkId.useQuery(fileId, {
		enabled: isValidUUID(fileId),
	});
	const addFile = () => {
		if (!fileData || fileData === "Wrong link id format") {
			return "Wrong link format";
		}

		const firstPartOfUUID = fileId.split("-")[0]!;
		const fileName = `${firstPartOfUUID}.${fileData.name.split(".")[1]}`;

		//file already exits in local state
		if (filesNames.includes(fileName)) {
			router.push(`/fileAddInfo?fileName=${fileName}&error=1`);
			return;
		}
		const file: File = {
			name: fileName,
			code: fileData.content,
			language: (fileData.language as Language) ?? "javascript",
		};

		dispatch(createFile(file));

		router.push(`/fileAddInfo?fileName=${fileName}`);
	};
	return { addFile };
};

export default useAddFileFromLink;

