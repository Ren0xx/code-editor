"use client";

import { saveCodeToFile } from "@/utils/helperFunctions";
import useShareCode from "@/hooks/useShareCode";

import { Box, IconButton, Tooltip } from "@mui/material";
import Snackbar from "@/components/Info/Snackbar";
import SaveIcon from "@mui/icons-material/Save";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import UploadIcon from "@mui/icons-material/Upload";

import { type AlertColor } from "@mui/material";
import ImportExportIcon from "@mui/icons-material/ImportExport";

import { type RouterOutputs } from "@/trpc/react";
type Result = RouterOutputs["file"]["shareFile"];

import { type Language } from "@/types/stateTypes";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

type ActionsIconsProps = {
	code: string;
	fileName: string;
	language?: Language;
};
import Link from "next/link";

const ActionsIcons = (props: ActionsIconsProps) => {
	const router = useRouter();

	const { code, fileName, language } = props;

	const { shareFile } = useShareCode();
	const { isSignedIn } = useUser();

	const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
	const [snackBarColor, setSnackbarColor] = useState<AlertColor>("success");
	const [snackbarMessage, setSnackbarMessage] = useState<string>("");

	const openSnackbarWithProps = (message: string, color: AlertColor) => {
		setSnackbarMessage(message);
		setSnackbarColor(color);
		setSnackbarOpen(true);
	};

	const saveCode = () => {
		saveCodeToFile(code, fileName);
		openSnackbarWithProps("Code saved to file", "success");
	};

	const copyToClipboard = () => {
		void navigator.clipboard.writeText(code);
		openSnackbarWithProps("Code copied to clipboard", "success");
	};
	const share = async () => {
		if (!isSignedIn) {
			openSnackbarWithProps(
				"You must be signed in to share code",
				"info"
			);
			return;
		}
		try {
			const result: Result = await shareFile(fileName, code, language);
			const url = `/shareLink?shareLink=${result.shareLink}`;
			router.push(url);
		} catch (e) {
			if (typeof e === "object" && e && "message" in e) {
				const url = `/shareLink?error=${encodeURIComponent(
					e.message as string
				)}`;
				openSnackbarWithProps("Failed to share code", "error");
				router.push(url);
			}
		}
	};
	const handleSnackbarClose = () => setSnackbarOpen(false);

	return (
		<Box
			component='section'
			sx={{ display: "flex", justifyContent: "space-between" }}>
			<Tooltip title='Save code as file'>
				<IconButton
					aria-label='save code as file'
					onClick={saveCode}
					size='large'>
					<SaveIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title='Copy code to clipboard'>
				<IconButton
					aria-label='copy code to clipboard'
					onClick={copyToClipboard}
					size='large'>
					<ContentCopyIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title='Share your code'>
				<IconButton
					aria-label='Share code'
					onClick={share}
					size='large'>
					<ShareIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title='Import file from link'>
				<IconButton
					component={Link}
					href='/addFileFromLink'
					aria-label='Import file from link'
					size='large'>
					<ImportExportIcon />
				</IconButton>
			</Tooltip>
			<Tooltip title='Import file from your computer'>
				<IconButton
					aria-label='Import file from your computer'
					component={Link}
					href='/importFile'
					size='large'>
					<UploadIcon />
				</IconButton>
			</Tooltip>
			<Snackbar
				open={snackbarOpen}
				message={snackbarMessage}
				handleClose={handleSnackbarClose}
				alertColor={snackBarColor}
			/>
		</Box>
	);
};

export default ActionsIcons;

