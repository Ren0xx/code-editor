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

export type Theme = (typeof themeOptions)[number];
export type Language = (typeof languageOptions)[number];

export type SettingsState = {
	theme: Theme;
	language: Language;
};

