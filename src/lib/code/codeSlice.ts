import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { CodeState } from "@/types/stateTypes";

const defaultCode = "// Start coding here!";
const initialState: CodeState = {
	code: defaultCode,
};

export const codeSlice = createSlice({
	name: "code",
	initialState,
	reducers: {
		changeCode: (state, action: PayloadAction<string>) => {
			state.code = action.payload;
		},
	},
});

export const { changeCode } = codeSlice.actions;
export default codeSlice.reducer;

