import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import React from "react";
import GlobalHeader from "@/components/GlobalHeader";
import styles from "./page.module.css";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { OperationInputsStoreProvider } from "@/stores/operationInputsStoreProvider";
import { ConfigProvider } from "antd";

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
				<AntdRegistry>
					<ConfigProvider
						theme={{
							components: {
								Divider: {
									verticalMarginInline: 25,
								},
								Button: {
									defaultBg: "#fffbf5",
									defaultHoverBg: "#fffbf5",
									defaultActiveBg: "#fffbf5",
									linkHoverBg: "$fffbf5",
									textHoverBg: "#fffbf5",
									contentFontSize: 14,
									contentFontSizeLG: 18,
								},
								Segmented: {
									trackBg: "#fffbf5",
									itemHoverBg: "#faf5ed",
									itemActiveBg: "#f2eadc",
									itemSelectedBg: "#f2eadc",
									trackPadding: 3,
								},
							},
							token: {
								colorBgBase: "#FFF7EA",
								colorTextBase: "#603000",
								colorTextHeading: "#43260A",
								colorPrimary: "#43260A",
							},
						}}
					>
						<GlobalHeader />
						<OperationInputsStoreProvider>
							{children}
						</OperationInputsStoreProvider>
					</ConfigProvider>
				</AntdRegistry>
			</body>
		</html>
	);
}
