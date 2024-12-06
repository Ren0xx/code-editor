"use client";

import SharedFilesList from "@/components/Files/SharedFilesList";
import useGetUsersSharedFiles from "@/hooks/useGetUsersSharedFiles";
import useDeleteFile from "@/hooks/useDeleteFile";
import { Box } from "@mui/material";

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
	const { files, isLoading, refetchSharedFiles } = useGetUsersSharedFiles();
	const { deleteFile } = useDeleteFile(refetchSharedFiles);

	const handleFileDelete = async (id: number) => {
		await deleteFile(id);
	};

	if (isLoading) return "Loading ...";

	return (
		<Box sx={style}>
			<SharedFilesList
				files={files ?? []}
				handleFileDelete={handleFileDelete}
				refetchShareFiles={refetchSharedFiles}
			/>
		</Box>
	);
}

