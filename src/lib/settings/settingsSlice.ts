import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SettingsState, EditorTheme } from "@/types/stateTypes";
import { defaultOptions } from "@/utils/constants";

const initialState: SettingsState = {
	editorTheme: "vs-dark",
	lightTheme: false,
	options: defaultOptions,
};

export const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		changeTheme: (state, action: PayloadAction<EditorTheme>) => {
			state.editorTheme = action.payload;
			if (action.payload === "vs-dark" || action.payload === "hc-black") {
				state.lightTheme = false;
				return;
			}
			state.lightTheme = true;
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

