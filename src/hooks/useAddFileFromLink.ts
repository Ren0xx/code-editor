"use client";

import { api } from "@/trpc/react";
import useGetSearchParams from "@/hooks/useGetSearchParams";
import { createFile } from "@/lib/code/codeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { type Language, type File } from "@/types/stateTypes";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const useAddFileFromLink = () => {
	const fileId = useGetSearchParams("shareLink");
	const router = useRouter();
	const dispatch = useAppDispatch();

	const filesNames = useAppSelector((state) =>
		state.code.files.map((file) => file.name)
	);

	const { data: fileData } = api.file.getFileByLinkId.useQuery(fileId ?? "", {
		enabled: !!fileId,
	});

	const [isFileAdded, setIsFileAdded] = useState(false);

	useEffect(() => {
		if (
			!fileData ||
			fileData === "Wrong link id format" ||
			!fileId ||
			isFileAdded
		) {
			return;
		}

		const firstPartOfUUID = fileId.split("-")[0]!;
		const fileName = `${firstPartOfUUID}.${fileData.name.split(".")[1]}`;

		if (filesNames.includes(fileName)) {
			router.replace(`/getFileFromLink?fileName=${fileName}&error=1`);
			return;
		}
		const file: File = {
			name: fileName,
			code: fileData.content,
			language: (fileData.language as Language) ?? "javascript",
		};

		dispatch(createFile(file));

		setIsFileAdded(true);

		router.replace(`/getFileFromLink?fileName=${fileName}`);
	}, [fileData, fileId, filesNames, isFileAdded, dispatch, router]);
};

export default useAddFileFromLink;

