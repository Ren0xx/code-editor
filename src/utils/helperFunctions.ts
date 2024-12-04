import { type Language } from "@/types/stateTypes";
import { saveAs } from "file-saver";
import isUUID from "validator/es/lib/isUUID";
import { extensionMap } from "./constants";

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

