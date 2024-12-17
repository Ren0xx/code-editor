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

const filePattern = /^[\w-]{1,20}\.[a-zA-Z]{1,5}$/;

//editor options
export const extensionMap: { [key in Language]: string } = {
	javascript: "js",
	typescript: "ts",
	html: "html",
	css: "css",
	json: "json",
	xml: "xml",
	markdown: "md",
	sql: "sql",
	python: "py",
	csharp: "cs",
	java: "java",
	php: "php",
	cpp: "cpp",
	c: "c",
	"objective-c": "m",
	razor: "cshtml",
	handlebars: "hbs",
	fsharp: "fs",
	ruby: "rb",
	go: "go",
	powershell: "ps1",
	shell: "sh",
	less: "less",
	scss: "scss",
	dockerfile: "Dockerfile",
	yaml: "yaml",
	swift: "swift",
	kotlin: "kt",
	perl: "pl",
	lua: "lua",
};

const maximumFontSize = 48;
const minimumFontSize = 10;

const defaultOptions: Options = {
	fontSize: 16,
	tabSize: 4,
};
export const FILE_SHARE_LIMIT = 5;
export const MAX_CONTENT_LENGTH = 50000;
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

export const MAXIMUM_FILES_LIMIT = 25;
export {
	defaultFile,
	defaultOptions,
	defaultCode,
	defaultLanguage,
	filePattern,
	maximumFontSize,
	minimumFontSize,
};

