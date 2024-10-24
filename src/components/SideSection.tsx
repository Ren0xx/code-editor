import { saveCodeToFile } from "@/app/utils/helperFunctions";
import { IconButton } from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useAppSelector } from "@/lib/hooks";
import FileList from "@/components/FileList";

const SideSection = () => {
	const { currentCode, currentLanguage } = useAppSelector(
		(state) => state.code
	);

	const handleClick = () => {
		saveCodeToFile(currentLanguage, currentCode);
	};
	const copyToClipboard = () => {
		void navigator.clipboard.writeText(currentCode);
	};
	return (
		<aside>
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
			<FileList />
		</aside>
	);
};

export default SideSection;

