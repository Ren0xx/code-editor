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

import { useRouter } from "next/navigation";
type DialogProps = {
	content: string | JSX.Element;
	title: string;
	error?: boolean;
	shareLinkUrl?: string;
};
const ShareLinkDialog = (props: DialogProps) => {
	const { content, title, error, shareLinkUrl } = props;
	const router = useRouter();

	const copyToClipboard = () => {
		void navigator.clipboard.writeText(shareLinkUrl ?? "");
	};
	const handleClose = () => {
		router.back();
	};
	return (
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
			<DialogActions>
				<IconButton onClick={copyToClipboard}>
					<ContentCopyIcon />
				</IconButton>
			</DialogActions>
		</Dialog>
	);
};
export { ShareLinkDialog };

