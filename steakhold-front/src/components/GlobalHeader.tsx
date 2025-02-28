"use client";

import React from "react";
import styles from "./GlobalHeader.module.css";
import { Flex, Dropdown, MenuProps, Button, Space } from "antd";
import SteakHoldTitle from "../../public/SteakHoldTitle.svg";
import Image from "next/image";
import {
	DownOutlined,
	HomeOutlined,
	InfoCircleOutlined,
} from "@ant-design/icons";

const items: MenuProps["items"] = [
	{
		label: <a href="/home">Home</a>,
		key: "0",
		icon: <HomeOutlined />,
	},
	{
		label: <a href="/about">about</a>,
		key: "1",
		icon: <InfoCircleOutlined />,
	},
];

const GlobalHeader: React.FC = () => {
	return (
		<Flex className={styles.flexContainer} wrap>
			<hr className={`${styles.line} ${styles.contentFlex1}`} />
			<div className={styles.agriLifeLogo} />
			<hr className={`${styles.line} ${styles.contentFlex2}`} />
			<Image src={SteakHoldTitle} alt="SteakHold" />
			<hr className={`${styles.line} ${styles.contentFlex3}`} />
			<Dropdown menu={{ items }} trigger={["click"]}>
				<Button
					className={`${styles.contentFlex1} ${styles.headerContent}`}
					onClick={(e) => e.preventDefault()}
				>
					<Space>
						Menu
						<DownOutlined />
					</Space>
				</Button>
			</Dropdown>
			<hr className={`${styles.line} ${styles.contentFlex2}`} />
			<div className={styles.csLogo} />
			<hr className={`${styles.line} ${styles.contentFlex1}`} />
		</Flex>
	);
};

export default GlobalHeader;
