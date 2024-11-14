"use client";

import FileList from "@/components/Files/FileList";
import { useAppSelector } from "@/lib/hooks";
import ActionsIcons from "@/components/Files/ActionsIcons";
import CreateOrRenameFileForm from "@/components/CreateOrRenameFileForm";

import useAddFileFromLink from "@/hooks/useAddFileFromLink";

export default function Files() {
	const codeState = useAppSelector((state) => state.code);
	const { code, name: currentFileName, language } = codeState.activeFile;

	useAddFileFromLink();

	return (
		<div>
			<ActionsIcons
				code={code}
				fileName={currentFileName}
				language={language}
			/>
			<FileList files={codeState.files} />
			<CreateOrRenameFileForm action='create' />
		</div>
	);
}

