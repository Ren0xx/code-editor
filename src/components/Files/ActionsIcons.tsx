"use client";

import { saveCodeToFile } from "@/utils/helperFunctions";

import { IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

type ActionsIconsProps = {
	code: string;
	fileName: string;
};

const ActionsIcons = (props: ActionsIconsProps) => {
	const { code, fileName } = props;

	const saveCode = () => saveCodeToFile(code, fileName);

	const copyToClipboard = () => {
		void navigator.clipboard.writeText(code);
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
		</div>
	);
};

export default ActionsIcons;

