import { type Language } from "@/types/stateTypes";
import { saveAs } from "file-saver";
import isUUID from "validator/es/lib/isUUID";

const extensionMap: { [key in Language]: string } = {
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

// const getFileExtension = (lang: Language) => {
// 	return extensionMap[lang] || "txt";
// };
const getLanguageFromExtension = (extension: string): Language | undefined => {
	const languageMap = Object.fromEntries(
		Object.entries(extensionMap).map(([lang, ext]) => [ext, lang])
	) as Record<string, Language>;

	return languageMap[extension];
};

const saveCodeToFile = (code: string, name: string) => {
	const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
	saveAs(blob, name);
};

const isValidUUID4 = (value: string): boolean => {
	const version = 4;
	return isUUID(value, version);
};
export { saveCodeToFile, getLanguageFromExtension, isValidUUID4 };

