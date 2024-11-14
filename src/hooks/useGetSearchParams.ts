"use client";

import { useSearchParams } from "next/navigation";

const useGetSearchParams = (paramName: string): string | null => {
	const searchParams = useSearchParams();

	const result = searchParams.get(paramName);
	return result;
};

export default useGetSearchParams;

