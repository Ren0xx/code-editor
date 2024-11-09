import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SettingsState, Theme } from "@/types/stateTypes";
import { defaultOptions } from "@/utils/constants";

const initialState: SettingsState = {
	theme: "vs-dark",
	options: defaultOptions,
};

export const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		changeTheme: (state, action: PayloadAction<Theme>) => {
			state.theme = action.payload;
		},
		changeFontSizeBy: (state, action: PayloadAction<number>) => {
			state.options.fontSize += action.payload;
		},
		changeTabSize: (state, action: PayloadAction<number>) => {
			state.options.tabSize = action.payload;
		},
	},
});

export const { changeTheme, changeFontSizeBy, changeTabSize } =
	settingsSlice.actions;
export default settingsSlice.reducer;

