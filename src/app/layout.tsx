import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";
import { StoreProvider } from "@/components/StoreProvider";
import lightTheme from "@/styles/theme";
import { ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export const metadata: Metadata = {
	title: "Code editor",
	description:
		"Online code editor with features like code folding, linting, and more.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang='en'>
			<AppRouterCacheProvider>
				<ThemeProvider theme={lightTheme}>
					<body className={GeistSans.className}>
						<TRPCReactProvider>
							<StoreProvider>{children}</StoreProvider>
						</TRPCReactProvider>
					</body>
				</ThemeProvider>
			</AppRouterCacheProvider>
		</html>
	);
}

