"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { loader } from "@monaco-editor/react";
import { type MonacoInstance } from "@/app/types/monacoEditor";
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
	ssr: false,
});

import useCodeSuggestions from "@/hooks/useCodeSuggestions";

import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { changeTheme, changeLanguage } from "@/app/lib/settings/settingsSlice";

import {
	languageOptions,
	themeOptions,
	type Language,
	type Theme,
} from "@/app/types/editorSettings";

const CodeEditor = () => {
	const [monacoInstance, setMonacoInstance] = useState<MonacoInstance | null>(
		null
	);

	const { theme, language } = useAppSelector((state) => state.settings);
	const dispatch = useAppDispatch();

	const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(changeTheme(e.target.value as Theme));
	};
	const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(changeLanguage(e.target.value as Language));
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
				// defaultLanguage={language}
				defaultValue='// Start coding here!'
				theme={theme}
				language={language}
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

