"use client";

import { saveCodeToFile } from "@/utils/helperFunctions";
import useShareCode from "@/hooks/useShareCode";

import { IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import ShareIcon from "@mui/icons-material/Share";
import { type RouterOutputs } from "@/trpc/react";
type Result = RouterOutputs["file"]["shareFile"];

import { type Language } from "@/types/stateTypes";
import { useRouter } from "next/navigation";

type ActionsIconsProps = {
	code: string;
	fileName: string;
	language?: Language;
};

const ActionsIcons = (props: ActionsIconsProps) => {
	const router = useRouter();
	const { code, fileName, language } = props;

	const { shareFile } = useShareCode();
	const saveCode = () => saveCodeToFile(code, fileName);

	const copyToClipboard = () => {
		void navigator.clipboard.writeText(code);
	};
	const share = async () => {
		const result: Result = await shareFile(fileName, code, language);
		const url = `/shareLink?shareLink=${
			result.shareLink
		}&error=${+!result.success}`;
		router.push(url);
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
		</div>
	);
};

export default ActionsIcons;

