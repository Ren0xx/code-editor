"use client";

import Files from "@/app/@files/page";
import SharedFilesList from "@/components/Files/SharedFilesList";
import { ModalWithChildren } from "@/components/Info/Modals/Modals";
import useGetUsersSharedFiles from "@/hooks/useGetUsersSharedFiles";

export default function SharedFiles() {
	const { files, isLoading, refetchSharedFiles } = useGetUsersSharedFiles();
	if (isLoading) return "Loading ...";
	return (
		<>
			<Files />
			<ModalWithChildren>
				<SharedFilesList
					files={files ?? []}
					refetchShareFiles={refetchSharedFiles}
				/>
			</ModalWithChildren>
		</>
	);
}

