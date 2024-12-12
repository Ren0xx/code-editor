"use client";

import { useAppSelector } from "@/lib/hooks";

import FileList from "@/components/Files/FileList";
import ActionsIcons from "@/components/Files/ActionsIcons";
import CreateOrRenameFileForm from "@/components/Forms/CreateOrRenameFileForm";
import SignInOrOutButton from "@/components/Auth/SignInOrOutButton";
import Link from "next/link";
import Divider from "@mui/material/Divider";
export default function Files() {
	const codeState = useAppSelector((state) => state.code);
	const { code, name: currentFileName, language } = codeState.activeFile;

	return (
		<aside>
			<ActionsIcons
				code={code}
				fileName={currentFileName}
				language={language}
			/>
			<Link href='/sharedFiles'>Shared Files</Link>
			<FileList files={codeState.files} />
			<Divider sx={{ my: "0.3em" }} />
			<CreateOrRenameFileForm action='create' />
			<SignInOrOutButton />
		</aside>
	);
}

