import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@/trpc/react";

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
			<body className={GeistSans.className}>
				<TRPCReactProvider>{children}</TRPCReactProvider>
			</body>
		</html>
	);
}

