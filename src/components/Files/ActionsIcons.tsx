"use client";

import { saveCodeToFile } from "@/utils/helperFunctions";
import useShareCode from "@/hooks/useShareCode";

import { IconButton } from "@mui/material";
import Snackbar from "@/components/Info/Snackbar";
import SaveIcon from "@mui/icons-material/Save";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";

import ImportExportIcon from "@mui/icons-material/ImportExport";

import { type RouterOutputs } from "@/trpc/react";
type Result = RouterOutputs["file"]["shareFile"];

import { type Language } from "@/types/stateTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ActionsIconsProps = {
	code: string;
	fileName: string;
	language?: Language;
};

const ActionsIcons = (props: ActionsIconsProps) => {
	const router = useRouter();
	const { code, fileName, language } = props;
	const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
	const [snackbarMessage, setSnackbarMessage] = useState<string>("");

	const { shareFile } = useShareCode();
	const saveCode = () => {
		saveCodeToFile(code, fileName);
		setSnackbarMessage("Code saved to file");
		setSnackbarOpen(true);
	};

	const copyToClipboard = () => {
		void navigator.clipboard.writeText(code);
		setSnackbarMessage("Code copied to clipboard");
		setSnackbarOpen(true);
	};
	const share = async () => {
		const result: Result = await shareFile(fileName, code, language);
		const url = `/shareLink?shareLink=${
			result.shareLink
		}&error=${+!result.success}`;
		router.push(url);
	};
	const openAddFileModal = () =>{
		router.push('/addFileFromLink')
	}
	const handleSnackbarClose = () => setSnackbarOpen(false);
	return (
		<div>
			<IconButton
				aria-label='save code as file'
				onClick={saveCode}
				size='large'>
				<SaveIcon />
			</IconButton>
			<IconButton
				aria-label='copy code to clipboard'
				onClick={copyToClipboard}
				size='large'>
				<ContentCopyIcon />
			</IconButton>
			<IconButton aria-label='Share code' onClick={share}>
				<ShareIcon />
			</IconButton>
			<IconButton onClick={openAddFileModal}>
				<ImportExportIcon />
			</IconButton>
			<Snackbar
				open={snackbarOpen}
				message={snackbarMessage}
				handleClose={handleSnackbarClose}
			/>
		</div>
	);
};

export default ActionsIcons;

