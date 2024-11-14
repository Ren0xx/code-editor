"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

const useNavigateBackOnMount = () => {
	const router = useRouter();

	const navigateBack = useCallback(() => {
		router.back();
	}, [router]);

	useEffect(() => {
		navigateBack();
	}, [navigateBack]);
};

export default useNavigateBackOnMount;