"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
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
	const persistor = persistStore(storeRef.current);

	return (
		<Provider store={storeRef.current}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
}
