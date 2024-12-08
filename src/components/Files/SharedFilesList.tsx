import { Box, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";

import { type RouterOutputs } from "@/trpc/react";
import { useRouter } from "next/navigation";
type File = RouterOutputs["file"]["getUsersSharedFiles"][0];

type SharedFilesListProps = {
	files: File[];
	refetchShareFiles?: () => Promise<void>;
};
const SharedFilesList = (props: SharedFilesListProps) => {
	const { files,  refetchShareFiles } = props;
	const router = useRouter();

	const openDeleteModal = (id:number) => {
		router.push(`/sharedFiles/delete/${id}`)
	}

	return (
		<div>
			<Typography variant='h4'>Your shared files:</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "start",
					minWidth: "10vw",
					gap: 1,
				}}>
				{files?.length === 0 && (
					<Typography align='center'>No shared files yet.</Typography>
				)}
				{files?.map((file, index) => (
					<Box key={index} sx={{ display: "flex" }}>
						<Typography align='center'>{file.name}</Typography>
						<IconButton
							onClick={() => openDeleteModal(file.id)}
							color='error'>
							<DeleteIcon />
						</IconButton>
					</Box>
				))}
				<IconButton onClick={refetchShareFiles}>
					<RefreshIcon />
				</IconButton>
			</Box>
		</div>
	);
};

export default SharedFilesList;
