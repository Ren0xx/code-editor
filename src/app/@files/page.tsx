"use client";

import { useAppSelector } from "@/lib/hooks";

import FileList from "@/components/Files/FileList";
import ActionsIcons from "@/components/Files/ActionsIcons";
import CreateOrRenameFileForm from "@/components/Forms/CreateOrRenameFileForm";
import SignInOrOutButton from "@/components/Auth/SignInOrOutButton";

export default function Files() {
	const codeState = useAppSelector((state) => state.code);
	const { code, name: currentFileName, language } = codeState.activeFile;

	return (
		<div>
			<ActionsIcons
				code={code}
				fileName={currentFileName}
				language={language}
			/>
			<FileList files={codeState.files} />
			<CreateOrRenameFileForm action='create' />
			<SignInOrOutButton />
		</div>
	);
}

