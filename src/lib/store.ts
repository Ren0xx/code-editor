import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "@/lib/storage";
import settingsReducer from "@/lib/settings/settingsSlice";
import codeReducer from "@/lib/code/codeSlice";

const persistConfig = {
	key: "root",
	storage,
	whitelist: ["code"],
	timeout: 1000,
};
//instead of defining the reducers in the reducer field of configureStore, combine them here:
const rootReducer = combineReducers({
	settings: settingsReducer,
	code: codeReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export const makeStore = () => {
	return configureStore({
		reducer: persistedReducer,
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware({
				serializableCheck: {
					ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
				},
			});
		},
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];

