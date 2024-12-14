import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import MainLayout from "@/components/MainLayout";

export const metadata: Metadata = {
	title: "Code editor",
	description:
		"Online code editor with features like code folding, linting, and more.",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

import { HydrateClient } from "@/trpc/server";
import { StoreProvider } from "@/components/StoreProvider";
import { dark } from "@clerk/themes";

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
		<ClerkProvider appearance={{ baseTheme: dark }}>
			<html lang='en'>
				<body className={GeistSans.className}>
					<TRPCReactProvider>
						<HydrateClient>
							<StoreProvider>
								<MainLayout
									files={files}
									codeEditor={codeEditor}>
									{children}
								</MainLayout>
							</StoreProvider>
						</HydrateClient>
					</TRPCReactProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
