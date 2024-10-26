import { type File } from "@/types/stateTypes";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { changeActiveFile } from "@/lib/code/codeSlice";

type FileProps = {
	file: File;
	fileIndex: number;
};
const File = ({ file,  fileIndex }: FileProps) => {
	const { activeFile } = useAppSelector((state) => state.code);
	const dispatch = useAppDispatch();

	const handleFileSelect = () => {
		if (activeFile.name === file.name) return;
		dispatch(changeActiveFile(fileIndex));
	};
	return (
		<span>
			<Button variant='outlined' color='secondary' onClick={handleFileSelect}>
				{file.name}
			</Button>
		</span>
	);
};

export default File;

