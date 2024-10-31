"use client";
import { type File } from "@/types/stateTypes";
import { useRef, useState } from "react";
import { Box, Button, Menu, MenuItem, Modal } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { changeActiveFile, deleteFile } from "@/lib/code/codeSlice";
import CreateOrRenameFileForm from "@/components/CreateOrRenameFileForm";

type FileProps = {
	file: File;
	fileIndex: number;
};
const File = (props: FileProps) => {
	const { file, fileIndex } = props;
	const { activeFile } = useAppSelector((state) => state.code);

	const anchorRef = useRef<HTMLButtonElement | null>(null);
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const dispatch = useAppDispatch();

	const handleFileSelect = () => {
		if (activeFile.name === file.name) return;
		dispatch(changeActiveFile(fileIndex));
	};
	const handleFileDelete = () => {
		dispatch(deleteFile(fileIndex));
	};

	//handling right click
	const handleRightClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		anchorRef.current = event.currentTarget;
		setMenuOpen(true);
	};
	const handleMenuClose = () => setMenuOpen(false);
	const handleModalOpen = () => setModalOpen(true);

	const handleFileRename = () => {
		handleModalOpen();
		handleMenuClose();
	};

	return (
		<span>
			<Box>
				<Button
					variant='outlined'
					color='secondary'
					onClick={handleFileSelect}
					onContextMenu={handleRightClick}
					ref={anchorRef}>
					{file.name}
				</Button>
				<Menu
					anchorEl={anchorRef.current}
					open={menuOpen}
					onClose={handleMenuClose}
					anchorOrigin={{ vertical: "top", horizontal: "center" }}
					transformOrigin={{ vertical: "top", horizontal: "center" }}>
					<MenuItem onClick={() => handleFileRename()}>
						Rename
					</MenuItem>
					<MenuItem onClick={() => handleFileDelete()}>
						Delete
					</MenuItem>
				</Menu>
			</Box>
			<RenameModal
				open={modalOpen}
				fileIndex={fileIndex}
				setOpen={() => setModalOpen(false)}
			/>
		</span>
	);
};

type ModalProps = {
	open: boolean;
	fileIndex: number;
	setOpen: (open: boolean) => void;
};
const RenameModal = (props: ModalProps) => {
	const { open, fileIndex, setOpen } = props;
	const handleClose = () => setOpen(false);

	const style = {
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		bgcolor: "background.paper",
		boxShadow: 24,
		p: 4,
	};
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby='modal-modal-title'
			aria-describedby='modal-modal-description'>
			<Box sx={style}>
				<>
					{fileIndex}
					<CreateOrRenameFileForm
						action='rename'
						fileIndex={fileIndex}
					/>
				</>
			</Box>
		</Modal>
	);
};
export default File;

