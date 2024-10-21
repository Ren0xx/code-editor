"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { loader } from "@monaco-editor/react";
import { type MonacoInstance } from "@/types/monacoEditor";
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
	// ssr: false,
});

import useCodeSuggestions from "@/hooks/useCodeSuggestions";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { changeTheme, changeLanguage } from "@/lib/settings/settingsSlice";
import { changeCode } from "@/lib/code/codeSlice";

import {
	languageOptions,
	themeOptions,
	type Language,
	type Theme,
} from "@/types/stateTypes";

const CodeEditor = () => {
	const [monacoInstance, setMonacoInstance] = useState<MonacoInstance | null>(
		null
	);

	const { theme, language } = useAppSelector((state) => state.settings);
	const { code } = useAppSelector((state) => state.code);
	const dispatch = useAppDispatch();

	const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(changeTheme(e.target.value as Theme));
	};
	const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(changeLanguage(e.target.value as Language));
	};
	const handleCodeChange = (e: string | undefined) => {
		dispatch(changeCode(e!));
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
			<MonacoEditor
				height='90vh'
				defaultValue={code}
				theme={theme}
				language={language}
				onChange={(e) => handleCodeChange(e)}
			/>
			<div>
				<select value={language} onChange={handleLanguageChange}>
					{languageOptions.map((lang) => (
						<option key={lang} value={lang}>
							{lang}
						</option>
					))}
				</select>
				<select value={theme} onChange={handleThemeChange}>
					{themeOptions.map((theme) => (
						<option key={theme} value={theme}>
							{theme}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default CodeEditor;

