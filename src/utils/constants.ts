import { type Language, type File, type Options } from "@/types/stateTypes";

//file
const defaultCode = "// Start coding here!";
const defaultFileName = "index.js";
const defaultLanguage: Language = "javascript";

const defaultFile: File = {
	code: defaultCode,
	language: defaultLanguage,
	name: defaultFileName,
};

const filePattern = /^[\w-]{1,20}\.[a-zA-Z]{2,5}$/;

//editor options

const maximumFontSize = 48;
const minimumFontSize = 10;

const defaultOptions: Options = {
	fontSize: 16,
	tabSize: 4,
};
export {
	defaultFile,
	defaultOptions,
	defaultCode,
	defaultLanguage,
	filePattern,
	maximumFontSize,
	minimumFontSize,
};

