"use client";

import { useAppSelector } from "@/lib/hooks";

import FileList from "@/components/Files/FileList";
import ActionsIcons from "@/components/Files/ActionsIcons";
import CreateOrRenameFileForm from "@/components/Forms/CreateOrRenameFileForm";
import SignInOrOutButton from "@/components/Auth/SignInOrOutButton";
import Divider from "@mui/material/Divider";
import { Paper } from "@mui/material";
import SharedFilesLink from "@/components/Files/SharedFilesLink";
import ThemeSelector from "@/components/CodeEditor/ThemeSelector";
import EditorOptions from "@/components/CodeEditor/EditorOptions";
export default function Files() {
	const codeState = useAppSelector((state) => state.code);
	const { code, name: currentFileName, language } = codeState.activeFile;
	const { editorTheme } = useAppSelector((state) => state.settings);

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
			<ThemeSelector editorTheme={editorTheme} />
			<EditorOptions />

			<SignInOrOutButton />
		</Paper>
	);
}

