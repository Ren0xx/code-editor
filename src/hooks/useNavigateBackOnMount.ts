"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export function useNavigateBackOnMount() {
	const router = useRouter();

	const navigateBack = useCallback(() => {
		router.back();
	}, [router]);

	useEffect(() => {
		navigateBack();
	}, [navigateBack]);
}

