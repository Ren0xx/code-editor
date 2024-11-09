import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import { StoreProvider } from "@/components/StoreProvider";
import lightTheme from "@/styles/theme";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import MainLayout from "@/components/MainLayout";
export const metadata: Metadata = {
	title: "Code editor",
	description:
		"Online code editor with features like code folding, linting, and more.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

import { HydrateClient } from "@/trpc/server";

export default function RootLayout({
	children,
	files,
	codeEditor,
}: Readonly<{
	children: React.ReactNode;
	files: React.ReactNode;
	codeEditor: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<AppRouterCacheProvider>
				<ThemeProvider theme={lightTheme}>
					<body className={GeistSans.className}>
						<TRPCReactProvider>
							<StoreProvider>
								<HydrateClient>
									<MainLayout
										files={files}
										codeEditor={codeEditor}>
										{children}
									</MainLayout>
								</HydrateClient>
							</StoreProvider>
						</TRPCReactProvider>
					</body>
				</ThemeProvider>
			</AppRouterCacheProvider>
		</html>
	);
}

