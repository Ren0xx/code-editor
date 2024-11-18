"use client";

import { useParams } from "next/navigation";

import { useAppDispatch } from "@/lib/hooks";
import { deleteFile } from "@/lib/code/codeSlice";

import Files from "@/app/@files/page";
import { ConfirmModal } from "@/components/Info/Modals/Modals";

export default function RenameFile() {
	const { id } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();

	const handleDelete = () => {
		dispatch(deleteFile(parseInt(id)));
	};
	return (
		<>
			<Files />
			<ConfirmModal
				handleAction={handleDelete}
				title='Delete file'
				confirmationText='Are you sure?'
				actionName='Delete'
			/>
		</>
	);
}

