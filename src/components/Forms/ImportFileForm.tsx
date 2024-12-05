"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography, Button } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { importFileSchema as formSchema } from "@/schemas/validation/file/importFile";
import { type z } from "zod";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createFile } from "@/lib/code/codeSlice";
import { getLanguageFromExtension } from "@/utils/helperFunctions";

const ImportFileForm = () => {
	const dispatch = useAppDispatch();
	const files = useAppSelector((state) => state.code.files);
	const filesNames = files.map((file) => file.name);

	const importFileSchema = formSchema(filesNames);
	const {
		control,
		handleSubmit,
		setError,
		clearErrors,
		setValue,
		watch,
		formState: { errors },
	} = useForm<z.infer<typeof importFileSchema>>({
		resolver: zodResolver(importFileSchema),
		defaultValues: {
			file: undefined,
		},
	});
	const file = watch("file");
	// Odczyt zawartości pliku
	const readFileContent = async (file: File) => {
		try {
			return await file.text();
		} catch (error) {
			console.error("Error reading file:", error);
			throw new Error("Unable to read file content");
		}
	};

	const handleFileChange = async (file: File | undefined) => {
		if (!file) {
			setError("file", {
				type: "manual",
				message: "Please select a valid file",
			});
			return;
		}
		try {
			clearErrors("file");
			setValue("file", file);
		} catch (error) {
			console.error("Error processing file:", error);
			setError("file", {
				type: "manual",
				message: "Error processing file",
			});
		}
	};

	const onSubmit = async (data: z.infer<typeof importFileSchema>) => {
		try {
			const file = data.file;
			if (!file) {
				throw new Error("No file selected");
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
		} catch (error) {
			console.error("Error processing file:", error);
		}
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
						<Typography
							variant='body1'
							color={errors.file ? "error" : "textPrimary"}
							sx={{ mt: 2 }}>
							{field.value?.name ?? "No file selected"}
						</Typography>
						<Button
							variant='contained'
							component='label'
							color={errors.file ? "error" : "primary"}>
							Upload File
							<input
								type='file'
								hidden
								onChange={(e) =>
									handleFileChange(e.target.files?.[0])
								}
							/>
						</Button>
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
				sx={{ mt: 2 }}
				disabled={!file}>
				Submit
			</Button>
		</Box>
	);
};

export default ImportFileForm;

