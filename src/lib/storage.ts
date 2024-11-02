//Workaround for a problem with default storage from redux-persist

import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { type WebStorage } from "redux-persist/lib/types";

function createPersistStorage(): WebStorage {
	const isServer = typeof window === "undefined";

	// Returns noop (dummy) storage.
	if (isServer) {
		return {
			getItem() {
				return Promise.resolve(null);
			},
			setItem() {
				return Promise.resolve();
			},
			removeItem() {
				return Promise.resolve();
			},
		};
	}

	return createWebStorage("local");
}
const storage = createPersistStorage();
export default storage;

