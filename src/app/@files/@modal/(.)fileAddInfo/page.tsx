"use client";

import Files from "@/app/@files/page";
import useGetSearchParams from "@/hooks/useGetSearchParams";
import { AddFileInfoDialog } from "@/components/Info/Dialogs/Dialogs";

export default function AddFileInfo() {
	const fileName = useGetSearchParams("fileName");

	const title = "File imported successfully";

	const content = `Your file name: ${fileName ?? ""} `;
	return (
		<>
			<Files />
			<AddFileInfoDialog content={content} title={title} />
		</>
	);
}

