"use client";

import { useAppSelector } from "@/lib/hooks";

import FileList from "@/components/Files/FileList";
import ActionsIcons from "@/components/Files/ActionsIcons";
import CreateOrRenameFileForm from "@/components/Forms/CreateOrRenameFileForm";
import SignInOrOutButton from "@/components/Auth/SignInOrOutButton";
import Link from "next/link";
import Divider from "@mui/material/Divider";
import { Paper } from "@mui/material";
import SharedFilesLink from "@/components/Files/SharedFilesLink";
export default function Files() {
	const codeState = useAppSelector((state) => state.code);
	const { code, name: currentFileName, language } = codeState.activeFile;

	return (
		<Paper
			sx={{
				height: 1,
				p: 1,
				display: "flex",
				flexDirection: "column",
				gap: 2,
			}}>
			<ActionsIcons
				code={code}
				fileName={currentFileName}
				language={language}
			/>
			<FileList files={codeState.files} />
			<Divider sx={{ my: "0.3em" }} />
			<CreateOrRenameFileForm action='create' />
			<SharedFilesLink />
			<SignInOrOutButton />
		</Paper>
	);
}

