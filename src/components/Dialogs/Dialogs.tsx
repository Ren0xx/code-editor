"use client";

import {
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import { useRouter } from "next/navigation";

type DialogProps = {
	content: string;
	title: string;
	error?: boolean;
};
const ShareLinkDialog = (props: DialogProps) => {
	const router = useRouter();

	const handleClose = () => {
		router.back();
	};
	const { content, title, error } = props;
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
		</Dialog>
	);
};
export { ShareLinkDialog };

