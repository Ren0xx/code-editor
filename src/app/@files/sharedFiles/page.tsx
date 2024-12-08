"use client";

import SharedFilesList from "@/components/Files/SharedFilesList";
import useGetUsersSharedFiles from "@/hooks/useGetUsersSharedFiles";

import { Box, Typography } from "@mui/material";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};
export default function SharedFiles() {
	const { files, isLoading, isError, refetchSharedFiles } =
		useGetUsersSharedFiles();

	return (
		<Box sx={style}>
			{isLoading ? (
				<Typography variant='h5' component='h2'>
					Loading ...
				</Typography>
			) : isError ? (
				<Typography variant='h5' component='h2'>
					Error occurred while loading shared files.
				</Typography>
			) : (
				<SharedFilesList
					files={files ?? []}
					refetchShareFiles={refetchSharedFiles}
				/>
			)}
		</Box>
	);
}

