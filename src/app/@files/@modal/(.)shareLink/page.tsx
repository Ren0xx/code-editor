"use client";

import Files from "@/app/@files/page";
import { ShareLinkDialog } from "@/components/Info/Dialogs/Dialogs";
import useGetSearchParams from "@/hooks/useGetSearchParams";

export default function ShareLink() {
	const shareLink = useGetSearchParams("shareLink");
	const error = useGetSearchParams("error") === "1" ? true : false;

	const title = !error ? "Operation successful" : "Something went wrong";

	const content = !error
		? `Your share link: ${shareLink ?? ""}`
		: "Couldn't share a file. Try again";
	return (
		<>
			<Files />
			<ShareLinkDialog
				title={title}
				content={content}
				error={error}
				shareLink={shareLink ?? ""}
			/>
		</>
	);
}

