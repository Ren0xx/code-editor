import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { SettingsState, Theme } from "@/types/stateTypes";

const initialState: SettingsState = {
	theme: "vs-dark",
};

export const settingsSlice = createSlice({
	name: "settings",
	initialState,
	reducers: {
		changeTheme: (state, action: PayloadAction<Theme>) => {
			state.theme = action.payload;
		},
	},
});

export const { changeTheme } = settingsSlice.actions;
export default settingsSlice.reducer;

