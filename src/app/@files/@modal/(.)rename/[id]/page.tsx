"use client";

import {
	ModalWithChildren,
} from "@/components/Info/Modals/Modals";
import { useSearchParams, useParams } from "next/navigation";
import Files from "@/app/@files/page";
import CreateOrRenameFileForm from "@/components/Forms/CreateOrRenameFileForm";

export default function RenameFile() {
	const { id } = useParams<{ id: string }>();

	const searchParams = useSearchParams();
	const name = searchParams.get("name");

	return (
		<>
			<Files />
			<ModalWithChildren>
				<CreateOrRenameFileForm
					action='rename'
					fileIndex={parseInt(id)}
					currentName={name ?? ""}
				/>
			</ModalWithChildren>
		</>
	);
}

