import { configureStore } from "@reduxjs/toolkit";
import settingsReducer from "@/lib/settings/settingsSlice";
import codeReducer from "@/lib/code/codeSlice";

export const makeStore = () => {
	return configureStore({
		reducer: { settings: settingsReducer, code: codeReducer },
	});
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

