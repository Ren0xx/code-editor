"use client";

import Files from "@/app/@files/page";
import { ShareLinkDialog } from "@/components/Dialogs/Dialogs";
import useGetSearchParams from "@/hooks/useGetSearchParams";

import { usePathname } from "next/navigation";

export default function ShareLink() {
	const shareLink = useGetSearchParams("shareLink");
	const error = useGetSearchParams("error");

	const pathname = usePathname();

	const title = !error ? "Operation successful" : "Something went wrong";

	const content = !error
		? `Your share link: ${pathname}/?shareLink=${shareLink}`
		: "Couldn't share a file. Try again";

	return (
		<>
			<Files />
			<ShareLinkDialog title={title} content={content} error={!!error} />
		</>
	);
}

