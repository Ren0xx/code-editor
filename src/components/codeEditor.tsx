"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { loader } from "@monaco-editor/react";

import { type MonacoInstance } from "@/app/types/monacoEditor";
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
	ssr: false,
});

const defaultLanguage = "typescript";
const defaultTheme = "vs-dark";
import useCodeSuggestions from "@/hooks/useCodeSuggestions";
const CodeEditor = () => {
	const [monacoInstance, setMonacoInstance] = useState<MonacoInstance | null>(
		null
	);
	useEffect(() => {
		loader
			.init()
			.then((monaco) => {
				setMonacoInstance(monaco);
			})
			.catch((error) => {
				console.error("Failed to initialize Monaco:", error);
			});
	}, []);

	useCodeSuggestions(monacoInstance, defaultLanguage);

	return (
		<MonacoEditor
			height='90vh'
			defaultLanguage={defaultLanguage}
			defaultValue='// Start coding here!'
			theme={defaultTheme}
		/>
	);
};

export default CodeEditor;

