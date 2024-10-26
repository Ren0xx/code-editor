import { saveCodeToFile } from "@/app/utils/helperFunctions";
import { IconButton } from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useAppSelector } from "@/lib/hooks";
import FileList from "@/components/FileList";
import CreateFileForm from "./CreateFileForm";

const SideSection = () => {
	const { code, language } = useAppSelector((state) => state.code.activeFile);

	const handleClick = () => {
		saveCodeToFile(language, code);
	};
	const copyToClipboard = () => {
		void navigator.clipboard.writeText(code);
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
			<CreateFileForm />
		</aside>
	);
};

export default SideSection;

