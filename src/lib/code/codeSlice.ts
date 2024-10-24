import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CodeState, File, Language } from "@/types/stateTypes";

const defaultCode = "// Start coding here!";
const defaultFileName = "index.js";
const defaultLanguage: Language = "javascript";

const defaultFile: File = {
	code: defaultCode,
	language: defaultLanguage,
	name: defaultFileName,
};

const initialState: CodeState = {
	currentCode: defaultCode,
	currentFileName: defaultFileName,
	currentLanguage: defaultLanguage,
	files: [defaultFile],
};

export const codeSlice = createSlice({
	name: "code",
	initialState,
	reducers: {
		changeCurrentCode: (state, action: PayloadAction<string>) => {
			state.currentCode = action.payload;
		},
		changeCurrentFile: (state, action: PayloadAction<File>) => {
			const { currentCode, currentFileName, currentLanguage } = state;

			//adding updated file to file array
			const updatedFile: File = {
				code: currentCode,
				language: currentLanguage,
				name: currentFileName,
			};

			state.files = state.files.map((file) => {
				if (file.name === currentFileName) {
					return updatedFile;
				} else {
					return file;
				}
			});

			//swapping to new file
			const { code, language, name } = action.payload;

			state.currentCode = code;
			state.currentFileName = name;
			state.currentLanguage = language;
		},
		changeCurrentLanguage: (state, action: PayloadAction<Language>) => {
			state.currentLanguage = action.payload;
		},
		createFile: (state, action: PayloadAction<File>) => {
			const newFile: File = action.payload;
			state.files.push(newFile);
		},
	},
});

export const {
	changeCurrentCode,
	changeCurrentLanguage,
	changeCurrentFile,
	createFile,
} = codeSlice.actions;
export default codeSlice.reducer;

