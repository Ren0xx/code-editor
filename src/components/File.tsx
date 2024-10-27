import { type File } from "@/types/stateTypes";
import { Box, Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { changeActiveFile, deleteFile } from "@/lib/code/codeSlice";

type FileProps = {
	file: File;
	fileIndex: number;
};
const File = ({ file, fileIndex }: FileProps) => {
	const { activeFile } = useAppSelector((state) => state.code);
	const dispatch = useAppDispatch();

	const handleFileSelect = () => {
		if (activeFile.name === file.name) return;
		dispatch(changeActiveFile(fileIndex));
	};
	const handleFileDelete = () => {
		dispatch(deleteFile(fileIndex));
	};
	return (
		<span>
			<Box>
				<Button
					variant='outlined'
					color='secondary'
					onClick={handleFileSelect}>
					{file.name}
				</Button>
				<Button color='error' onClick={handleFileDelete}>
					X
				</Button>
			</Box>
		</span>
	);
};

export default File;

