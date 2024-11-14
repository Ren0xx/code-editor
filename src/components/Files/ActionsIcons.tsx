"use client";

import { saveCodeToFile } from "@/utils/helperFunctions";
import useShareCode from "@/hooks/useShareCode";

import {
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	Snackbar,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import { type RouterOutputs } from "@/trpc/react";
type Result = RouterOutputs["file"]["shareFile"];

import { type Language } from "@/types/stateTypes";
import { useState } from "react";

type ActionsIconsProps = {
	code: string;
	fileName: string;
	language?: Language;
};

const ActionsIcons = (props: ActionsIconsProps) => {
	const { code, fileName, language } = props;
	const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
	const [result, setResult] = useState<Result>();

	const { shareFile } = useShareCode();
	const saveCode = () => saveCodeToFile(code, fileName);

	const copyToClipboard = () => {
		void navigator.clipboard.writeText(code);
	};
	const share = async () => {
		const result = await shareFile(fileName, code, language);
		setResult(result);
		if (result.success) setDialogOpen(true);
	};

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
			<Dialog
				open={isDialogOpen}
				onClose={() => setDialogOpen(false)}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'>
				<DialogTitle id='alert-dialog-title'>
					{"Use Google's location service?"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						File added successfully <br />
						Your Share link `{result?.shareLink ?? "Error"}`
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ActionsIcons;

