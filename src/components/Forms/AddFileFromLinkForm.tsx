"use client";

import useAddFileFromLink from "@/hooks/useAddFileFromLink";
import useGetFileDataFromLink from "@/hooks/useGetFileDataFromLink";
import { Box, Button, TextField } from "@mui/material";
import { Controller, useForm, useFormState, useWatch } from "react-hook-form";
import { addFromLinkSchema } from "@/schemas/validation/file/addFromLink";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const AddFileFromLinkForm = () => {
	const router = useRouter();
	const form = useForm<z.infer<typeof addFromLinkSchema>>({
		resolver: zodResolver(addFromLinkSchema),
		defaultValues: {
			shareLink: "",
		},
	});
	const { setError, clearErrors } = form;
	const control = form.control;

	const shareLink = useWatch({
		control,
		name: "shareLink",
		defaultValue: "",
	});

	const { handleAddFile } = useAddFileFromLink();
	const { fetchFileData } = useGetFileDataFromLink(shareLink);

	const { isSubmitting } = useFormState({ control });

	const onSubmit = async () => {
		try {
			const fileData = (await fetchFileData())?.data;

			if (!fileData) {
				setError("shareLink", {
					message: "Invalid or missing file data",
				});
				return;
			}

			const response = await handleAddFile(fileData);

			if (response !== "File added successfully") {
				setError("shareLink", { message: response });
				return;
			}
			if (typeof fileData === "object") {
				router.replace(`/fileAddInfo?fileName=${fileData.name}`);
			}
		} catch (error) {
			setError("shareLink", { message: "An unexpected error occurred" });
			console.error(error);
		}
	};

	return (
		<Box
			component='form'
			onSubmit={form.handleSubmit(onSubmit)}
			noValidate
			sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
			<Controller
				name='shareLink'
				control={control}
				render={({ field }) => (
					<TextField
						{...field}
						label='Share Link'
						error={!!form.formState.errors.shareLink}
						helperText={form.formState.errors.shareLink?.message}
						onChange={(e) => {
							clearErrors("shareLink");
							field.onChange(e);
						}}
					/>
				)}
			/>
			<Button type='submit' variant='contained' disabled={isSubmitting}>
				Add File from Link
			</Button>
		</Box>
	);
};

export default AddFileFromLinkForm;

