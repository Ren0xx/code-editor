"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createFile, renameFile } from "@/lib/code/codeSlice";

import {
	defaultCode,
	defaultLanguage,
	MAXIMUM_FILES_LIMIT,
} from "@/utils/constants";
import { getLanguageFromExtension } from "@/utils/helperFunctions";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrRenameSchema } from "@/schemas/validation/file/createOrRename";
import { type z } from "zod";

import { type File } from "@/types/stateTypes";

import { TextField, Button, Box, Typography } from "@mui/material";

type FormProps = {
	action: "create" | "rename";
	fileIndex?: number;
	currentName?: string;
};
const CreateOrRenameFileForm = (props: FormProps) => {
	const { action, fileIndex, currentName = "" } = props;

	const dispatch = useAppDispatch();

	const files = useAppSelector((state) => state.code.files);
	const filesNames = files.map((file) => file.name);

	const isSubmitButtonDisabled =
		files.length === MAXIMUM_FILES_LIMIT && action === "create";

	const formSchema = createOrRenameSchema(filesNames);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: { fileName: currentName },
	});

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		const fileName = values.fileName;

		const fileExtension = fileName.split(".")[1] ?? "js";
		const language = getLanguageFromExtension(fileExtension);
		const name = language ? fileName : `${fileName.split(".")[0]}.js`;

		if (action === "create") {
			const newFile: File = {
				name: name,
				code: defaultCode,
				language: language ?? defaultLanguage,
			};
			dispatch(createFile(newFile));
		}
		if (action === "rename") {
			if (fileIndex === undefined) return;

			const obj = {
				newName: name,
				index: fileIndex,
				language: language ?? defaultLanguage,
			};
			dispatch(renameFile(obj));
		}
	};

	return (
		<section>
			<Box
				component='form'
				onSubmit={handleSubmit(onSubmit)}
				sx={{ display: "flex", flexDirection: "column" }}>
				<Typography variant='h6' component='h2'>
					Create new file
				</Typography>
				<TextField
					{...register("fileName")}
					label='File Name'
					variant='filled'
					error={!!errors.fileName}
					helperText={errors.fileName?.message}
				/>
				<Button
					type='submit'
					variant='contained'
					disabled={isSubmitButtonDisabled}>
					{action === "create" ? "Create File" : "Rename File"}
				</Button>
			</Box>
		</section>
	);
};

export default CreateOrRenameFileForm;
