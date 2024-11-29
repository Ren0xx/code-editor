"use client";
import { useRef, useState } from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { changeActiveFile } from "@/lib/code/codeSlice";

import { useRouter } from "next/navigation";

type FileProps = {
	fileName: string;
	fileIndex: number;
};
const SingleFile = (props: FileProps) => {
	const { fileName, fileIndex } = props;
	
	const router = useRouter();

	const { activeFile } = useAppSelector((state) => state.code);
	const dispatch = useAppDispatch();

	const anchorRef = useRef<HTMLButtonElement | null>(null);
	const [menuOpen, setMenuOpen] = useState<boolean>(false);
	
	const isActiveFile = fileName === activeFile.name;

	const handleFileSelect = () => {
		if (activeFile.name === fileName) return;
		dispatch(changeActiveFile(fileIndex));
	};
	
	const handleRightClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		anchorRef.current = event.currentTarget;
		setMenuOpen(true);
	};
	const handleMenuClose = () => setMenuOpen(false);

	//opening modals using routes
	const handleRenameClick = () => {
		router.push(`/rename/${fileIndex}?name=${fileName}`);
		handleMenuClose();
	};
	const handleDeleteClick = () => {
		router.push(`/delete/${fileIndex}`);
		handleMenuClose();
	};
	return (
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
				<MenuItem onClick={() => handleRenameClick()}>Rename</MenuItem>
				<MenuItem onClick={() => handleDeleteClick()}>Delete</MenuItem>
			</Menu>
		</Box>
	);
};

export default SingleFile;
