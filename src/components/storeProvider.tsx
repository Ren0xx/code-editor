"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "@/lib/store";

export function StoreProvider({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) {
	const storeRef = useRef<AppStore>();
	if (!storeRef.current) {
		storeRef.current = makeStore();
	}

	return <Provider store={storeRef.current}>{children}</Provider>;
}

