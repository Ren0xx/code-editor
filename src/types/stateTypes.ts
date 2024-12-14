export const languageOptions = [
	"javascript",
	"typescript",
	"html",
	"css",
	"json",
	"xml",
	"markdown",
	"sql",
	"python",
	"csharp",
	"java",
	"php",
	"cpp",
	"c",
	"objective-c",
	"razor",
	"handlebars",
	"fsharp",
	"ruby",
	"go",
	"powershell",
	"shell",
	"less",
	"scss",
	"dockerfile",
	"yaml",
	"swift",
	"kotlin",
	"perl",
	"lua",
] as const;
export const themeOptions = ["vs", "vs-dark", "hc-black"] as const;

export type EditorTheme = (typeof themeOptions)[number];
export type Language = (typeof languageOptions)[number];

export type SettingsState = {
	editorTheme: EditorTheme;
	lightTheme: boolean;
	options: Options;
};

export type File = {
	code: string;
	language: Language;
	name: string;
};
export type CodeState = {
	activeFile: File;
	files: File[];
};

export type Options = {
	fontSize: number;
	tabSize: 2 | 4;
};

