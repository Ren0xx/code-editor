"use client";
import { useRef, useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { changeActiveFile, deleteFile } from "@/lib/code/codeSlice";
import { ConfirmModal } from "@/components/Modals/Modals";

import { useRouter } from "next/navigation";

type FileProps = {
	fileName: string;
	fileIndex: number;
};
const SingleFile = (props: FileProps) => {
	const router = useRouter();
	const { fileName, fileIndex } = props;
	const { activeFile } = useAppSelector((state) => state.code);

	const anchorRef = useRef<HTMLButtonElement | null>(null);
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	const [confirmModalOpen, setConfirmModalOpen] = useState<boolean>(false);

	const dispatch = useAppDispatch();
	const isActiveFile = fileName === activeFile.name;

	const handleFileSelect = () => {
		if (activeFile.name === fileName) return;
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

	const handleClick = () => {
		router.push(`/rename/${fileIndex}?name=${fileName}`);
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
					{fileName}
				</Button>
				<Menu
					anchorEl={anchorRef.current}
					open={menuOpen}
					onClose={handleMenuClose}
					anchorOrigin={{ vertical: "top", horizontal: "center" }}
					transformOrigin={{ vertical: "top", horizontal: "center" }}>
					<MenuItem onClick={() => handleClick()}>Rename</MenuItem>
					<MenuItem onClick={() => handleFileDelete()}>
						Delete
					</MenuItem>
				</Menu>
			</Box>

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
