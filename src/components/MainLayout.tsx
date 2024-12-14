"use client";

import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { lightTheme, darkTheme } from "@/styles/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

import { useAppSelector } from "@/lib/hooks";
export default function MainLayout({
	files,
	codeEditor,
	children,
}: Readonly<{
	files: React.ReactNode;
	codeEditor: React.ReactNode;
	children: React.ReactNode;
}>) {
	const isLightTheme = useAppSelector((state) => state.settings.lightTheme);
	const theme = isLightTheme ? lightTheme : darkTheme;
	return (
		<AppRouterCacheProvider>
			<ThemeProvider theme={theme}>
				<Container component='main' maxWidth='xl'>
					<Grid container spacing={1}>
						<Grid
							size={2}
							component='aside'
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 2,
							}}>
							{files}
						</Grid>
						<Grid size={10}>{codeEditor}</Grid>
					</Grid>
					{children}
				</Container>
				<CssBaseline />
			</ThemeProvider>
		</AppRouterCacheProvider>
	);
}
