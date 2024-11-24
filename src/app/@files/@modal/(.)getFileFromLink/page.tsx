"use client";

import Files from "@/app/@files/page";
import useGetSearchParams from "@/hooks/useGetSearchParams";
import { GetFileFromLinkInfoDialog } from "@/components/Info/Dialogs/Dialogs";

export default function GetFileFromLink() {
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
			<GetFileFromLinkInfoDialog
				content={content}
				title={title}
				error={error}
			/>
		</>
	);
}

