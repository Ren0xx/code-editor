"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { loader } from "@monaco-editor/react";
import { type MonacoInstance } from "@/types/monacoEditor";
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
	ssr: false,
});

import useCodeSuggestions from "@/hooks/useCodeSuggestions";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { changeTheme } from "@/lib/settings/settingsSlice";
import { changeCurrentCode } from "@/lib/code/codeSlice";

import { type EditorTheme } from "@/types/stateTypes";
import ThemeSelector from "@/components/CodeEditor/ThemeSelector";
import EditorOptions from "@/components/CodeEditor/EditorOptions";
import { type SelectChangeEvent } from "@mui/material";

const CodeEditor = () => {
	const [monacoInstance, setMonacoInstance] = useState<MonacoInstance | null>(
		null
	);

	const { editorTheme: theme } = useAppSelector((state) => state.settings);
	const { code, language } = useAppSelector((state) => state.code.activeFile);
	const editorOptions = useAppSelector((state) => state.settings.options);

	const dispatch = useAppDispatch();

	const handleThemeChange = (e: SelectChangeEvent) => {
		dispatch(changeTheme(e.target.value as EditorTheme));
	};
	const handleCodeChange = (e: string) => {
		dispatch(changeCurrentCode(e));
	};

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

	useCodeSuggestions(monacoInstance, language);

	return (
		<>
			{monacoInstance !== null ? (
				<div>
					<MonacoEditor
						height='80vh'
						value={code}
						theme={theme}
						options={editorOptions}
						language={language}
						onChange={(e) => handleCodeChange(e!)}
					/>
					<ThemeSelector
						theme={theme}
						handleThemeChange={handleThemeChange}
					/>
					<EditorOptions />
				</div>
			) : (
				<h3>Loading</h3>
			)}
		</>
	);
};

export default CodeEditor;
