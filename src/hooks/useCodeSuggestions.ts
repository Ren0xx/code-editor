import { useEffect } from "react";
import type * as monaco from "monaco-editor";
import { type MonacoInstance } from "@/app/types/monacoEditor";

const useCodeSuggestions = (
	monacoInstance: MonacoInstance | null,
	language: string
) => {
	useEffect(() => {
		if (!monacoInstance) return;

		const disposable =
			monacoInstance.languages.registerCompletionItemProvider(language, {
				provideCompletionItems: (model, position) => {
					// Define a range based on the current position in the editor
					const wordInfo = model.getWordUntilPosition(position);
					const range: monaco.IRange = {
						startLineNumber: position.lineNumber,
						endLineNumber: position.lineNumber,
						startColumn: wordInfo.startColumn,
						endColumn: wordInfo.endColumn,
					};

					const suggestions: monaco.languages.CompletionItem[] = [
						{
							label: "console.log",
							kind: monacoInstance.languages.CompletionItemKind
								.Function,
							insertText: "console.log()",
							detail: "JavaScript console log",
							documentation: "Logs output to the console",
							range: range, // Add the range where this suggestion should apply
						},
						{
							label: "setTimeout",
							kind: monacoInstance.languages.CompletionItemKind
								.Function,
							insertText: "setTimeout(() => {}, 1000);",
							detail: "JavaScript setTimeout",
							documentation: "Executes a function after a delay",
							range: range, // Add the range here too
						},
					];

					return { suggestions };
				},
			});

		return () => disposable.dispose();
	}, [monacoInstance, language]);
};

export default useCodeSuggestions;

