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

export const initialState: CodeState = {
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
		deleteFile: (state, action: PayloadAction<number>) => {
			//cannot delete last file
			if (state.files.length === 1) return;

			const index = action.payload;
			const isDeletingActiveFile =
				state.files[index]?.name === state.activeFile.name;

			// Remove the file from the files array
			state.files.splice(index, 1);

			// If the active file was deleted, set a new active file
			if (isDeletingActiveFile) {
				state.activeFile = state.files[index - 1] ?? state.files[0]!;
			}
		},
		renameFile: (
			state,
			action: PayloadAction<{
				newName: string;
				index: number;
				language: Language;
			}>
		) => {
			const { newName, index, language } = action.payload;

			const isRenamingActiveFile =
				state.files[index]?.name === state.activeFile.name;

			state.files[index]!.name = newName;
			state.files[index]!.language = language;

			if (isRenamingActiveFile) {
				state.activeFile = { ...state.files[index]! };
			}
		},
	},
});

export const {
	changeCurrentCode,
	changeActiveFile,
	createFile,
	deleteFile,
	renameFile,
} = codeSlice.actions;
export default codeSlice.reducer;

