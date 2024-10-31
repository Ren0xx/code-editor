import { useAppSelector } from "@/lib/hooks";
import File from "@/components/File";
import { Box } from "@mui/material";

const FileList = () => {
	const { files } = useAppSelector((state) => state.code);

	return (
		<div>
			<h2>File list</h2>
			<Box sx={{ display: "flex", flexDirection: "column" }}>
				{files.map((file, index) => (
					<div key={index}>
						<File file={file} fileIndex={index} />
					</div>
				))}
			</Box>
		</div>
	);
};

export default FileList;

