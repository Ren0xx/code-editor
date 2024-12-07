"use client";

import { useParams } from "next/navigation";
import useDeleteFile from "@/hooks/useDeleteFile";
import { ConfirmModal } from "@/components/Info/Modals/Modals";
import useGetUsersSharedFiles from "@/hooks/useGetUsersSharedFiles";

export default function DeleteSharedFile() {
	const { id } = useParams<{ id: string }>();

	const { refetchSharedFiles } = useGetUsersSharedFiles();
	const { deleteFile } = useDeleteFile(refetchSharedFiles);

	const handleFileDelete = async () => {
		await deleteFile(parseInt(id));
	};
	return (
		<ConfirmModal
			handleAction={handleFileDelete}
			title='Delete shared file'
			confirmationText='Are you sure?'
			actionName='Delete'
		/>
	);
}

