import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CodeState, File, Language } from "@/types/stateTypes";
import {
	defaultCode,
	defaultFileName,
	defaultLanguage,
} from "@/app/utils/constants";

const defaultFile: File = {
	code: defaultCode,
	language: defaultLanguage,
	name: defaultFileName,
};

const initialState: CodeState = {
	files: [defaultFile],
	activeFile: defaultFile,
};

export const codeSlice = createSlice({
	name: "code",
	initialState,
	reducers: {
		changeCurrentCode: (state, action: PayloadAction<string>) => {
			if (state.activeFile) {
				state.activeFile.code = action.payload;
			}
			const index = state.files.findIndex(
				(file) => file.name === state.activeFile?.name
			);
			if (index !== -1) {
				state.files[index] = { ...state.activeFile };
			}
		},
		changeCurrentLanguage: (state, action: PayloadAction<Language>) => {
			if (state.activeFile) {
				state.activeFile.language = action.payload;

				const index = state.files.findIndex(
					(file) => file.name === state.activeFile?.name
				);
				if (index !== -1) {
					state.files[index] = { ...state.activeFile };
				}
			}
		},
		changeActiveFile: (state, action: PayloadAction<number>) => {
			const newIndex = action.payload;
			if (newIndex >= 0 && newIndex < state.files.length) {
				state.activeFile = state.files[newIndex]!;
			}
		},
		createFile: (state, action: PayloadAction<File>) => {
			state.files.push(action.payload);
			state.activeFile = action.payload;
		},
	},
});

export const {
	changeCurrentCode,
	changeCurrentLanguage,
	changeActiveFile,
	createFile,
} = codeSlice.actions;
export default codeSlice.reducer;

