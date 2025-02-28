"use client";
import "@ant-design/v5-patch-for-react-19";

import React from "react";
import styles from "./GlobalHeader.module.css";
import { Flex, Dropdown, MenuProps, Button, Space } from "antd";
import {
	DownOutlined,
	HomeOutlined,
	InfoCircleOutlined,
} from "@ant-design/icons";
import { usePathname } from "next/navigation";
import Link from "next/link";

const GlobalHeader: React.FC = () => {
	const pathname = usePathname();
	const pageTitles: Record<string, string> = {
		"/home": "Home",
		"/about": "About",
	};
	const currentPage = pageTitles[pathname] || "Menu";

	const items: MenuProps["items"] = [
		{
			label: (
				<Link
					href="/home"
					onClick={(e: React.MouseEvent) => {
						if (currentPage === "Home") e.preventDefault();
					}}
				>
					Home
				</Link>
			),
			key: "0",
			icon: <HomeOutlined />,
		},
		{
			label: (
				<Link
					href="/about"
					onClick={(e: React.MouseEvent) => {
						if (currentPage === "About") e.preventDefault();
					}}
				>
					About
				</Link>
			),
			key: "1",
			icon: <InfoCircleOutlined />,
		},
	];

	return (
		<Flex className={styles.flexContainer} wrap>
			<hr className={`${styles.line} ${styles.flex1}`} />
			<div className={styles.agriLifeLogo} />
			<hr className={`${styles.line} ${styles.flex2}`} />
			<div className={styles.title} />
			<hr className={`${styles.line} ${styles.flex3}`} />
			<Dropdown
				menu={{ items }}
				trigger={["click"]}
				className={`${styles.flex1} ${styles.header}`}
			>
				<Button onClick={(e) => e.preventDefault()}>
					<Space>
						{currentPage}
						<DownOutlined />
					</Space>
				</Button>
			</Dropdown>
			<hr className={`${styles.line} ${styles.flex2}`} />
			<div className={styles.csLogo} />
			<hr className={`${styles.line} ${styles.flex1}`} />
		</Flex>
	);
};

export default GlobalHeader;
