"use client";

import Files from "@/app/@files/page";
import SharedFilesList from "@/components/Files/SharedFilesList";
import { ModalWithChildren } from "@/components/Info/Modals/Modals";
import useGetUsersSharedFiles from "@/hooks/useGetUsersSharedFiles";
import { Typography } from "@mui/material";

export default function SharedFiles() {
	const { files, isLoading, isError, refetchSharedFiles } =
		useGetUsersSharedFiles();

	return (
		<>
			<Files />
			<ModalWithChildren>
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
			</ModalWithChildren>
		</>
	);
}

