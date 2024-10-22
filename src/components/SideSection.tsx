import { saveCodeToFile } from "@/app/utils/helperFunctions";
import { IconButton } from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useAppSelector } from "@/lib/hooks";

const SideSection = () => {
	const { language } = useAppSelector((state) => state.settings);
	const { code } = useAppSelector((state) => state.code);

	const handleClick = () => {
		saveCodeToFile(language, code);
	};
	const copyToClipboard = () => {
		void navigator.clipboard.writeText(code);
	};
	return (
		<div>
			<IconButton
				aria-label='save code as file'
				onClick={handleClick}
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

export default SideSection;

