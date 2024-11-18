"use client";

import { RenameModal } from "@/components/Info/Modals/Modals";
import { useSearchParams, useParams } from "next/navigation";
import Files from "@/app/@files/page";

export default function RenameFile() {
	const { id } = useParams<{ id: string }>();
	const searchParams = useSearchParams();

	const name = searchParams.get("name");

	return (
		<>
			<Files />
			<RenameModal currentName={name ?? ""} fileIndex={parseInt(id)} />
		</>
	);
}

