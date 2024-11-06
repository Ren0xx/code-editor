"use client";
import { type File } from "@/types/stateTypes";
import { useRef, useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { changeActiveFile, deleteFile } from "@/lib/code/codeSlice";
import { ConfirmModal, RenameModal } from "@/components/Modals/Modals";

type FileProps = {
	file: File;
	fileIndex: number;
};
const SingleFile = (props: FileProps) => {
	const { file, fileIndex } = props;
	const { activeFile } = useAppSelector((state) => state.code);

	const anchorRef = useRef<HTMLButtonElement | null>(null);
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const [renameModalOpen, setRenameModalOpen] = useState<boolean>(false);
	const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const isActiveFile = file.name === activeFile.name;

	const handleFileSelect = () => {
		if (activeFile.name === file.name) return;
		dispatch(changeActiveFile(fileIndex));
	};
	const handleFileDelete = () => {
		setConfirmModalOpen(true);
		handleMenuClose();
	};

	//handling right click
	const handleRightClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		anchorRef.current = event.currentTarget;
		setMenuOpen(true);
	};
	const handleMenuClose = () => setMenuOpen(false);
	const handleRenameModalOpen = () => setRenameModalOpen(true);

	const handleFileRename = () => {
		handleRenameModalOpen();
		handleMenuClose();
	};

	return (
		<>
			<Box>
				<Button
					variant={isActiveFile ? "contained" : "outlined"}
					color={isActiveFile ? "primary" : "secondary"}
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
				open={renameModalOpen}
				fileIndex={fileIndex}
				currentName={file.name}
				handleClose={() => setRenameModalOpen(false)}
			/>
			<ConfirmModal
				confirmationText='Are you sure?'
				title='File deletion'
				open={confirmModalOpen}
				handleClose={() => setConfirmModalOpen(false)}
				action={() => dispatch(deleteFile(fileIndex))}
			/>
		</>
	);
};

export default SingleFile;
