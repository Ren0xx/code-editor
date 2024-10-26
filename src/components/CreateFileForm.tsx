"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { createFile } from "@/lib/code/codeSlice";
import { type File } from "@/types/stateTypes";
import { defaultCode, defaultLanguage } from "@/app/utils/constants";
import { getLanguageFromExtension } from "@/app/utils/helperFunctions";

import { isUniqueFileName, isValidFileName } from "@/app/utils/validation";

import { TextField, Button, Box } from "@mui/material";

const CreateFileForm = () => {
	const [fileName, setFileName] = useState<string>("");
	const [error, setError] = useState<string | null>(null);
	const files = useAppSelector((state) => state.code.files);
	const dispatch = useAppDispatch();

	const handleFileCreation = () => {
		if (!isValidFileName(fileName)) {
			setError("Invalid file name.");
			return;
		}

		if (!isUniqueFileName(fileName, files)) {
			setError("A file with this name already exists.");
			return;
		}

		const fileExtension = fileName.split(".")[1] ?? "js";
		const language = getLanguageFromExtension(fileExtension);

		const newFile: File = {
			name: language ? fileName : `${fileName.split(".")[0]}.js`,
			code: defaultCode,
			language: language ?? defaultLanguage,
		};

		dispatch(createFile(newFile));
		setFileName("");
		setError(null);
	};

	const handleFileNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newText = e.target.value;
		setFileName(newText);
		setError(null);
	};

	return (
		<Box sx={{ display: "flex", flexDirection: "column" }}>
			<TextField
				value={fileName}
				onChange={handleFileNameChange}
				label='File Name'
				variant='filled'
				error={!!error}
				helperText={error}
			/>
			<Button
				onClick={handleFileCreation}
				variant='contained'
				disabled={!!error || !fileName.trim()}>
				Create File
			</Button>
		</Box>
	);
};

export default CreateFileForm;

