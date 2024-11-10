"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function RenameFile() {
	const router = useRouter();

	const handleOnClick = useCallback(() => {
		router.back();
	}, [router]);

	useEffect(() => {
		handleOnClick();
	}, [handleOnClick]);
	
	return null;
}

