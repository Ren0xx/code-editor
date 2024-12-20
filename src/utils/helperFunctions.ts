import { type Language } from "@/types/stateTypes";
import { saveAs } from "file-saver";
import isUUID from "validator/es/lib/isUUID";
import { extensionMap } from "./constants";

const availableTypes = Object.keys(extensionMap).map((key) =>
	key.toUpperCase()
);

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
export {
	availableTypes,
	saveCodeToFile,
	getLanguageFromExtension,
	isValidUUID4,
};

