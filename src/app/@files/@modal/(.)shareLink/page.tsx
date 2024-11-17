"use client";

import Files from "@/app/@files/page";
import { ShareLinkDialog } from "@/components/Dialogs/Dialogs";
import useGetSearchParams from "@/hooks/useGetSearchParams";
import useCurrentUrl from "@/hooks/useBaseUrl";

export default function ShareLink() {
	const shareLink = useGetSearchParams("shareLink");
	const error = useGetSearchParams("error") === "1" ? true : false;

	const url = useCurrentUrl();
	const fullUrl = `${url}?shareLink=${shareLink}`;

	const title = !error ? "Operation successful" : "Something went wrong";

	const content = !error
		? `Your share link:\n
		${fullUrl}`
		: "Couldn't share a file. Try again";
	return (
		<>
			<Files />
			<ShareLinkDialog
				title={title}
				content={content}
				error={!!error}
				shareLinkUrl={fullUrl}
			/>
		</>
	);
}

