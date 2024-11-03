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
import { Button } from "@mui/material";
import useChangeEditorOptions from "@/hooks/useChangeEditorOptions";

const CodeEditor = () => {
	const [monacoInstance, setMonacoInstance] = useState<MonacoInstance | null>(
		null
	);

	const { theme } = useAppSelector((state) => state.settings);
	const { code, language } = useAppSelector((state) => state.code.activeFile);
	const editorOptions = useAppSelector((state) => state.settings.options);
	const {
		changeTabSizeToTwo,
		changeTabSizeToFour,
		increaseFont,
		decreaseFont,
	} = useChangeEditorOptions();
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
				<div>
					<MonacoEditor
						height='80vh'
						value={code}
						theme={theme}
						options={editorOptions}
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
					<div>
						<h3>Font Size:</h3>
						<Button onClick={increaseFont}>+</Button>
						<Button onClick={decreaseFont}>-</Button>
					</div>
					<div>
						<h3>Tab Size:</h3>
						<Button onClick={changeTabSizeToTwo}>2</Button>
						<Button onClick={changeTabSizeToFour}>4</Button>
					</div>
				</div>
			) : (
				<h3>Loading</h3>
			)}
		</div>
	);
};

export default CodeEditor;
