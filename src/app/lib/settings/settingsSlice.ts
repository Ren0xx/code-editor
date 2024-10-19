import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
	SettingsState,
	Theme,
	Language,
} from "@/app/types/editorSettings";

const initialState: SettingsState = {
	theme: "vs-dark",
	language: "typescript",
};

export const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		changeTheme: (state, action: PayloadAction<Theme>) => {
			state.theme = action.payload;
		},
		changeLanguage: (state, action: PayloadAction<Language>) => {
			state.language = action.payload;
		},
	},
});

export const { changeTheme, changeLanguage } = settingsSlice.actions;
export default settingsSlice.reducer;

