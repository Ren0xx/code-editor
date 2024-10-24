import { type File } from "@/types/stateTypes";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { changeCurrentFile } from "@/lib/code/codeSlice";

type FileProps = {
	file: File;
};
const File = ({ file }: FileProps) => {
    const { currentFileName } = useAppSelector((state) => state.code);
	const dispatch = useAppDispatch();

	const handleClick = () => {
		if (currentFileName === file.name) return;
		dispatch(changeCurrentFile(file));
	};
	return (
		<span>
			<Button variant='outlined' color='secondary' onClick={handleClick}>
				{file.name}
			</Button>
		</span>
	);
};

export default File;

