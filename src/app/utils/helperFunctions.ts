import { type Language } from "@/types/stateTypes";

const getFileExtension = (lang: Language) => {
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

	return extensionMap[lang] || "txt";
};
const saveCodeToFile = (language: Language, code: string) => {
	const fileExtension = getFileExtension(language);
	const fileName = `code.${fileExtension}`;

	const blob = new Blob([code], { type: "text/plain;charset=utf-8" });
	const url = URL.createObjectURL(blob);

	const link = document.createElement("a");
	link.href = url;
	link.download = fileName;
	document.body.appendChild(link);
	link.click();

	document.body.removeChild(link);
	URL.revokeObjectURL(url);
};
export { saveCodeToFile };

