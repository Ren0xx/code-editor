"use client";

import { useRouter } from "next/navigation";
import { Box, Modal } from "@mui/material";
import ConfirmationForm from "@/components/Forms/ConfirmationForm";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
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
				<ConfirmationForm
					{...props}
					handleClick={handleClick}
					style={style}
				/>
			</Modal>
		</div>
	);
};

export const ModalWithChildren = ({
	children,
}: Readonly<{ children: React.ReactNode }>) => {
	const router = useRouter();
	const handleClose = () => router.back();

	return (
		<Modal open={true} onClose={handleClose}>
			<Box sx={style}>{children}</Box>
		</Modal>
	);
};

