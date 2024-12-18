"use client";

import Files from "@/app/@files/page";
import AddFileFromLinkForm from "@/components/Forms/AddFileFromLinkForm";
import { ModalWithChildren } from "@/components/Info/Modals/Modals";

export default function AddFileInfo() {
	return (
		<>
			<Files />
			<ModalWithChildren>
				<AddFileFromLinkForm />
			</ModalWithChildren>
		</>
	);
}

