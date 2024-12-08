import SingleFile from "@/components/Files/SingleFile";
import { Box } from "@mui/material";
import { type File } from "@/types/stateTypes";

type FileListProps = {
	files: File[];
};

const FileList = (props: FileListProps) => {
	const { files } = props;

	return (
		<div>
			<h2>File list</h2>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				{files.map((file, index) => (
					<SingleFile
						fileName={file.name}
						fileIndex={index}
						key={index}
					/>
				))}
			</Box>
		</div>
	);
};

export default FileList;

