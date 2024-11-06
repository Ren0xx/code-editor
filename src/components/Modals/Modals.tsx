import { Box, Button, Modal, Typography } from "@mui/material";
import CreateOrRenameFileForm from "@/components/CreateOrRenameFileForm";

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
	open: boolean;
	handleClose: () => void;
};

export const RenameModal = (props: ModalProps) => {
	const { currentName, open, fileIndex, handleClose } = props;

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'>
			<Box sx={style}>
				<CreateOrRenameFileForm
					action='rename'
					fileIndex={fileIndex}
					currentName={currentName}
				/>
			</Box>
		</Modal>
	);
};

type ConfirmModalProps = {
	confirmationText: string;
	title: string;
	open: boolean;
	action: () => void;
	handleClose: () => void;
};
export const ConfirmModal = (props: ConfirmModalProps) => {
	const { confirmationText, title, open, action, handleClose } = props;

	const handleAction = () => {
		action();
	};

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Box sx={style}>
					<Typography
						id='modal-modal-title'
						variant='h6'
						component='h2'>
						{title}
					</Typography>
					<Typography id='modal-modal-description' sx={{ mt: 2 }}>
						{confirmationText}
					</Typography>
					<Button
						onClick={handleAction}
						variant='contained'
						color='error'>
						Delete
					</Button>
				</Box>
			</Modal>
		</div>
	);
};

