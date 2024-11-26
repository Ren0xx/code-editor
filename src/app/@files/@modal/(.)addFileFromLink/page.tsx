"use client";

import Files from "@/app/@files/page";
import { FileAddModal } from "@/components/Info/Modals/Modals";

export default function AddFileInfo() {
	return (
		<>
			<Files />
			<FileAddModal />
		</>
	);
}

