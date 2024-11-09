"use client";

import { useRouter } from "next/navigation";
import { Box, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function RenameFile() {
	const router = useRouter();

	const handleOnClick = () => {
		router.back();
	};
	return (
		<Box sx={{ display: "flex", flexDirection: "column" }}>
			<Button startIcon={<ArrowBackIcon />} onClick={handleOnClick}>
				Go back
			</Button>
		</Box>
	);
}

