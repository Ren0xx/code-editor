import { type Language } from "@/types/stateTypes";

const defaultCode = "// Start coding here!";
const defaultFileName = "index.js";
const defaultLanguage: Language = "javascript";

const filePattern = /^[\w-]{1,20}\.[a-zA-Z]{2,5}$/;

export { defaultCode, defaultFileName, defaultLanguage, filePattern };

