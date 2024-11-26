"use client";

import Files from "@/app/@files/page";
import useGetSearchParams from "@/hooks/useGetSearchParams";
import { AddFileInfoDialog } from "@/components/Info/Dialogs/Dialogs";

export default function AddFileInfo() {
	const fileName = useGetSearchParams("fileName");
	const error = useGetSearchParams("error") === "1" ? true : false;

	const title = !error
		? "File imported successfully"
		: "Couldn't import file";

	const content = !error
		? `Your file name: ${fileName ?? ""} `
		: "File with that name already exits. Try renaming existing file";
	return (
		<>
			<Files />
			<AddFileInfoDialog content={content} title={title} error={error} />
		</>
	);
}

