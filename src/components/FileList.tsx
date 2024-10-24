import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import File from "@/components/File";
import { createFile } from "@/lib/code/codeSlice";
import { Box, Button } from "@mui/material";
const FileList = () => {
	const { files } = useAppSelector((state) => state.code);
	const dispatch = useAppDispatch();

	const handleClick = () => {
		dispatch(createFile(mockFile));
	};
	return (
		<div>
			<h2>File list</h2>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				{files.map((file) => (
					<File key={file.name} file={file} />
				))}
			</Box>
			<Button onClick={handleClick}>Create file</Button>
		</div>
	);
};

export default FileList;

const mockFile = {
	code: "test",
	language: "javascript",
	name: "test.js",
} as const;

