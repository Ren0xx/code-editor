"use client";

import { saveCodeToFile } from "@/utils/helperFunctions";
import useShareCode from "@/hooks/useShareCode";

import { IconButton } from "@mui/material";
import Snackbar from "@/components/Info/Snackbar";
import SaveIcon from "@mui/icons-material/Save";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
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
	const [snackbarOpen, setOpen] = useState<boolean>(false);
	const [snackbarMessage, setMessage] = useState<string>("");

	const { shareFile } = useShareCode();
	const saveCode = () => {
		saveCodeToFile(code, fileName);
		setMessage("Code saved to file");
		setOpen(true);
	};

	const copyToClipboard = () => {
		void navigator.clipboard.writeText(code);
		setMessage("Code copied to clipboard");
		setOpen(true);
	};
	const share = async () => {
		const result: Result = await shareFile(fileName, code, language);
		const url = `/shareLink?shareLink=${
			result.shareLink
		}&error=${+!result.success}`;
		router.push(url);
	};

	const handleSnackbarClose = () => setOpen(false);
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
			<Snackbar
				open={snackbarOpen}
				message={snackbarMessage}
				handleClose={handleSnackbarClose}
			/>
		</div>
	);
};

export default ActionsIcons;

