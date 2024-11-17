"use client";

import { api } from "@/trpc/react";
import useGetSearchParams from "@/hooks/useGetSearchParams";

import { createFile } from "@/lib/code/codeSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { type Language, type File } from "@/types/stateTypes";
import { useCallback, useEffect } from "react";
import useIsRootRoute from "@/hooks/useIsRootRoute";

const useAddFileFromLink = () => {
	const fileId = useGetSearchParams("shareLink") ?? "";
	const dispatch = useAppDispatch();
	const filesNames = useAppSelector((state) => state.code.files).map(
		(file) => file.name
	);
	const isRootRoute = useIsRootRoute();

	const { data: fileData } = api.file.getFileByLinkId.useQuery(fileId);

	const addFileFromLink = useCallback(() => {
		if (!fileData || fileData === "Wrong link id format" || !isRootRoute)
			return;

		const firstPartOfUUID = fileId.split("-")[0]!;

		const fileName = `${firstPartOfUUID}.${fileData.name.split(".")[1]}`;

		const file: File = {
			name: fileName,
			code: fileData.content,
			language: (fileData.language as Language) ?? "javascript",
		};
		const fileNameAlreadyTaken = filesNames.includes(fileName);
		if (fileNameAlreadyTaken) {
			window.history.replaceState(null, "", "/");
			return;
		}
		dispatch(createFile(file));

		window.history.replaceState(null, "", "/");
	}, [dispatch, fileData, fileId, filesNames, isRootRoute]);

	useEffect(() => {
		addFileFromLink();
	}, [addFileFromLink]);
};

export default useAddFileFromLink;

