"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { FileUploader } from "react-drag-drop-files";
import { importFileSchema as schema } from "@/schemas/validation/file/importFile";
import { type z } from "zod";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createFile } from "@/lib/code/codeSlice";
import {
	availableTypes,
	getLanguageFromExtension,
} from "@/utils/helperFunctions";

const DragAndDropWithValidation = () => {
	const dispatch = useAppDispatch();
	const files = useAppSelector((state) => state.code.files);
	const filesNames = files.map((file) => file.name);

	const importFileSchema = schema(filesNames);

	const {
		control,
		handleSubmit,
		setError,
		clearErrors,
		formState: { errors },
		getValues,
	} = useForm<z.infer<typeof importFileSchema>>({
		resolver: zodResolver(importFileSchema),
		defaultValues: {
			file: undefined,
		},
	});

	const handleFileChange = (
		file: File | undefined,
		onChange: (value: File | undefined) => void
	) => {
		if (!file) {
			setError("file", {
				type: "manual",
				message: "Please select a valid file",
			});
			return;
		}
		if (filesNames.includes(file.name)) {
			setError("file", {
				type: "manual",
				message: "A file with this name already exists",
			});
			return;
		}
		clearErrors("file");
		onChange(file);
	};
	const readFileContent = async (file: File) => {
		try {
			return await file.text();
		} catch (error) {
			console.error("Error reading file:", error);
			throw new Error("Unable to read file content");
		}
	};
	const onSubmit = async (data: z.infer<typeof importFileSchema>) => {
		const file = data.file;
		if (!file) {
			return;
		}
		const fileContent = await readFileContent(file);
		const fileExtension = file.name.split(".")[1] ?? "js";
		const language = getLanguageFromExtension(fileExtension);
		dispatch(
			createFile({
				name: file.name,
				code: fileContent,
				language: language!,
			})
		);
	};

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmit)}
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 2,
				width: "100%",
			}}>
			<Controller
				name='file'
				control={control}
				render={({ field }) => (
					<>
						<FileUploader
							handleChange={(file: File | undefined) =>
								handleFileChange(file, field.onChange)
							}
							name='file'
							types={availableTypes}
							hoverTitle='Drop file here'
							label='Upload or drop file'
						/>
						{errors.file && (
							<Typography
								variant='body2'
								color='error'
								sx={{ mt: 1 }}>
								{errors.file.message}
							</Typography>
						)}
					</>
				)}
			/>
			<Button
				type='submit'
				variant='contained'
				color='primary'
				disabled={!errors.file && !getValues("file")}>
				Submit
			</Button>
		</Box>
	);
};

export default DragAndDropWithValidation;

