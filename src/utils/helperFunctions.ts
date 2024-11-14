import { type Language } from "@/types/stateTypes";
import { saveAs } from "file-saver";

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

type UUID = string & { readonly __brand: unique symbol };
const isValidUUID = (value: string): value is UUID => {
	const uuidV4Regex =
		/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	return uuidV4Regex.test(value);
};

export { saveCodeToFile, getLanguageFromExtension, isValidUUID };

