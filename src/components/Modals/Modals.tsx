"use client";

import { Box, Button, Modal, Typography } from "@mui/material";
import CreateOrRenameFileForm from "@/components/CreateOrRenameFileForm";

import { useRouter } from "next/navigation";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
};

type ModalProps = {
	currentName: string;
	fileIndex: number;
};

export const RenameModal = (props: ModalProps) => {
	const { currentName, fileIndex } = props;
	const router = useRouter();

	const handleClose = () => router.back();
	return (
		<Modal
			open={true}
			onClose={handleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'>
			<Box sx={style}>
				<CreateOrRenameFileForm
					action='rename'
					fileIndex={fileIndex}
					currentName={currentName}
					handleClose={handleClose}
				/>
			</Box>
		</Modal>
	);
};

type ConfirmModalProps = {
	actionName: string;
	confirmationText: string;
	title: string;
	handleAction: () => void;
};
export const ConfirmModal = (props: ConfirmModalProps) => {
	const router = useRouter();
	const handleClose = () => {
		router.back();
	};
	const handleClick = () => {
		props.handleAction();
		handleClose();
	};

	return (
		<div>
			<Modal
				open={true}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<ConfirmationForm {...props} handleClick={handleClick} />
			</Modal>
		</div>
	);
};
type ConfirmationFormProps = {
	actionName: string;
	confirmationText: string;
	title: string;
	handleClick: () => void;
};
const ConfirmationForm = (props: ConfirmationFormProps) => {
	const { actionName, confirmationText, title, handleClick } = props;
	return (
		<Box
			sx={{
				...style,
				display: "flex",
				flexDirection: "column",
				gap: 2,
			}}>
			<Typography id='modal-modal-title' variant='h5' component='h2'>
				{title}
			</Typography>
			<Typography id='modal-modal-description' sx={{ mt: 2 }}>
				{confirmationText}
			</Typography>
			<Button onClick={handleClick} variant='contained' color='error'>
				{actionName}
			</Button>
		</Box>
	);
};

