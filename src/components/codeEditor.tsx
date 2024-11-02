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

import { themeOptions, type Theme } from "@/types/stateTypes";

const CodeEditor = () => {
	const [monacoInstance, setMonacoInstance] = useState<MonacoInstance | null>(
		null
	);

	const { theme } = useAppSelector((state) => state.settings);
	const { code, language } = useAppSelector((state) => state.code.activeFile);

	const dispatch = useAppDispatch();

	const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(changeTheme(e.target.value as Theme));
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
		<div>
			{monacoInstance !== null ? (
				<>
					<MonacoEditor
						height='90vh'
						value={code}
						theme={theme}
						language={language}
						onChange={(e) => handleCodeChange(e!)}
					/>
					<select value={theme} onChange={handleThemeChange}>
						{themeOptions.map((theme) => (
							<option key={theme} value={theme}>
								{theme}
							</option>
						))}
					</select>
					<h3>Current Language: {language}</h3>
				</>
			) : (
				<h3>Loading</h3>
			)}
		</div>
	);
};

export default CodeEditor;
