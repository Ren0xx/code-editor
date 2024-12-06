"use client";

import Files from "@/app/@files/page";
import SharedFilesList from "@/components/Files/SharedFilesList";
import { ModalWithChildren } from "@/components/Info/Modals/Modals";
import useDeleteFile from "@/hooks/useDeleteFile";
import useGetUsersSharedFiles from "@/hooks/useGetUsersSharedFiles";

export default function SharedFiles() {
	const { files, isLoading, refetchSharedFiles } = useGetUsersSharedFiles();
	const { deleteFile } = useDeleteFile(refetchSharedFiles);

	const handleFileDelete = async (id: number) => {
		await deleteFile(id);
	};

	if (isLoading) return "Loading ...";
	return (
		<>
			<Files />
			<ModalWithChildren>
				<SharedFilesList
					files={files ?? []}
					handleFileDelete={handleFileDelete}
					refetchShareFiles={refetchSharedFiles}
				/>
			</ModalWithChildren>
		</>
	);
}

