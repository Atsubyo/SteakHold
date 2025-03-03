import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import React from "react";
import GlobalHeader from "@/components/GlobalHeader";
import styles from "./page.module.css";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { OperationInputsStoreProvider } from "@/stores/operationInputsStoreProvider";

const montserratSans = Montserrat({
	variable: "--font-montserrat-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "SteakHold",
	description: "Agent Based Model for Cattle Industry",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${montserratSans.variable} ${styles.body}`}>
				<GlobalHeader />
				<AntdRegistry>
					<OperationInputsStoreProvider>
						{children}
					</OperationInputsStoreProvider>
				</AntdRegistry>
			</body>
		</html>
	);
}
