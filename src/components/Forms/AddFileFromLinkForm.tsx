"use client";

import useAddFileFromLink from "@/hooks/useAddFileFromLink";
import { Button, TextField } from "@mui/material";
import { useState } from "react";

const AddFileFromLinkForm = () => {
	const [fileId, setFileId] = useState<string>("");
	const [result, setResult] = useState<string>("");
	const { addFile } = useAddFileFromLink(fileId);

	const handleClick = () => {
		const result = addFile();
		setResult(result ?? "Success");
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const id = e.target.value;
		setFileId(id);
	};
	console.log(result);
	return (
		<div>
			<TextField
				value={fileId}
				helperText='Type your share link id'
				onChange={handleChange}
			/>
			<Button onClick={handleClick}>Add File</Button>
			<p>{result}</p>
		</div>
	);
};

export default AddFileFromLinkForm;

