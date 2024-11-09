"use client";

import FileList from "@/components/Files/FileList";
import { useAppSelector } from "@/lib/hooks";
import ActionsIcons from "@/components/Files/ActionsIcons";
import CreateOrRenameFileForm from "@/components/CreateOrRenameFileForm";

export default function Files() {
	const codeState = useAppSelector((state) => state.code);
	const { code, name: currentFileName } = codeState.activeFile;

	return (
		<div>
			<ActionsIcons code={code} fileName={currentFileName} />
			<FileList files={codeState.files} />
			<CreateOrRenameFileForm action='create' />
		</div>
	);
}

