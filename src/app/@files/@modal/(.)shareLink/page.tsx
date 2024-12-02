"use client";

import Files from "@/app/@files/page";
import { ShareLinkDialog } from "@/components/Info/Dialogs/Dialogs";
import useGetSearchParams from "@/hooks/useGetSearchParams";

export default function ShareLink() {
	const shareLink = useGetSearchParams("shareLink");
	const errorMessage = useGetSearchParams("error");

	const isError = !!errorMessage;
	const title = isError ? "Error" : "Share Link";

	const content = isError
		? errorMessage
		: `Your share link: ${shareLink ?? ""}`;

	return (
		<>
			<Files />
			<ShareLinkDialog
				title={title}
				content={content}
				error={isError}
				shareLink={shareLink ?? ""}
			/>
		</>
	);
}

