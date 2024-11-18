"use client";

import Grid from "@mui/material/Grid2";
export default function MainLayout({
	files,
	codeEditor,
	children,
}: Readonly<{
	files: React.ReactNode;
	codeEditor: React.ReactNode;
	children: React.ReactNode;
}>) {
	return (
		<main>
			<Grid container>
				<Grid size={2}>{files}</Grid>
				<Grid size={10}>{codeEditor}</Grid>
			</Grid>
			{children}
		</main>
	);
}
