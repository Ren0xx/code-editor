import SingleFile from "@/components/Files/SingleFile";
import { Box, Typography } from "@mui/material";
import { type File } from "@/types/stateTypes";

type FileListProps = {
	files: File[];
};

const FileList = (props: FileListProps) => {
	const { files } = props;

	return (
		<section>
			<Typography variant='h4' component='h2'>Files</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					listStyleType: "none",
					paddingLeft: 0,
				}}
				component='ul'>
				{files.map((file, index) => (
					<SingleFile
						fileName={file.name}
						fileIndex={index}
						key={index}
					/>
				))}
			</Box>
		</section>
	);
};

export default FileList;

