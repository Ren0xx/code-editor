"use client";

import dynamic from "next/dynamic";
import useMonacoInstance from "@/hooks/useMonacoInstance";
import useCodeEditorState from "@/hooks/useCodeEditorState";
import useCodeSuggestions from "@/hooks/useCodeSuggestions";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
	ssr: false,
});

const CodeEditor = () => {
	const monacoInstance = useMonacoInstance();
	const { theme, code, language, editorOptions, handleCodeChange } =
		useCodeEditorState();

	useCodeSuggestions(monacoInstance, language);

	return (
		<>
			{monacoInstance !== null ? (
				<MonacoEditor
					height='100vh'
					value={code}
					theme={theme}
					options={editorOptions}
					language={language}
					onChange={(e) => handleCodeChange(e!)}
				/>
			) : (
				<h3>Loading</h3>
			)}
		</>
	);
};

export default CodeEditor;
