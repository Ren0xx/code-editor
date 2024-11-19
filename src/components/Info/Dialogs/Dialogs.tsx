"use client";

import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Snackbar from "@/components/Info/Snackbar";

import { useState } from "react";
import { useRouter } from "next/navigation";
type DialogProps = {
	content: string | JSX.Element;
	title: string;
	error?: boolean;
	shareLinkUrl?: string;
};

const ShareLinkDialog = (props: DialogProps) => {
	const router = useRouter();
	const { content, title, error, shareLinkUrl } = props;

	const [snackbarOpen, setOpen] = useState<boolean>(false);
	const handleSnackbarClose = () => setOpen(false);

	const copyToClipboard = () => {
		void navigator.clipboard.writeText(shareLinkUrl ?? "");
		setOpen(true);
	};
	const handleClose = () => {
		router.back();
	};
	return (
		<>
			<Dialog
				open={true}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'>
				<DialogTitle
					id='alert-dialog-title'
					color={error ? "error" : "success"}>
					{title}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						{content}
					</DialogContentText>
				</DialogContent>
				{!error && (
					<DialogActions>
						<IconButton onClick={copyToClipboard}>
							<ContentCopyIcon />
						</IconButton>
					</DialogActions>
				)}
			</Dialog>
			<Snackbar
				open={snackbarOpen}
				handleClose={handleSnackbarClose}
				message='Link copied to clipboard!'
			/>
		</>
	);
};
export { ShareLinkDialog };
