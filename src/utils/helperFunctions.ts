import { type Language, type File } from "@/types/stateTypes";
import { filePattern } from "@/utils/constants";
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

/**
 * Checks if a filename meets naming requirements.
 * @param {string} fileName - The name of the file to validate.
 * @returns {boolean} - Returns true if the name is valid, otherwise false.
 */
const isValidFileName = (fileName: string): boolean => {
	return filePattern.test(fileName);
};

/**
 * Checks if a filename is unique within a given list of files.
 * @param {string} fileName - The name of the file to check for uniqueness.
 * @param {File[]} files - The current list of files to compare against.
 * @returns {boolean} - Returns true if the name is unique, otherwise false.
 */

const isUniqueFileName = (fileName: string, files: File[]): boolean => {
	return !files.some((file) => file.name === fileName);
};

export {
	saveCodeToFile,
	getLanguageFromExtension,
	isValidUUID4,
	isValidFileName,
	isUniqueFileName,
};

