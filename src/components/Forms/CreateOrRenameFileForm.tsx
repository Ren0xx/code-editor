"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { createFile, renameFile } from "@/lib/code/codeSlice";

import { defaultCode, defaultLanguage } from "@/utils/constants";
import { getLanguageFromExtension } from "@/utils/helperFunctions";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createOrRenameSchema } from "@/schemas/validation/file/createOrRename";
import { type z } from "zod";

import { type File } from "@/types/stateTypes";

import { TextField, Button, Box } from "@mui/material";

type FormProps = {
	action: "create" | "rename";
	fileIndex?: number;
	currentName?: string;
	handleModalClose?: () => void;
};
const CreateOrRenameFileForm = (props: FormProps) => {
	const { action, fileIndex, currentName = "", handleModalClose } = props;

	const dispatch = useAppDispatch();

	const files = useAppSelector((state) => state.code.files);
	const filesNames = files.map((file) => file.name);

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
		if (handleModalClose) handleModalClose();
	};

	return (
		<Box
			component='form'
			onSubmit={handleSubmit(onSubmit)}
			sx={{ display: "flex", flexDirection: "column" }}>
			<TextField
				{...register("fileName")}
				label='File Name'
				variant='filled'
				error={!!errors.fileName}
				helperText={errors.fileName?.message}
			/>
			<Button type='submit' variant='contained'>
				{action === "create" ? "Create File" : "Rename File"}
			</Button>
		</Box>
	);
};

export default CreateOrRenameFileForm;
