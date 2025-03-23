"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Flex, Layout, MenuProps, Space } from "antd";
import { BeefStageType } from "@/types/ParameterTypes";
import {
	Network,
	CowCalf,
	Stocker,
	Feedlot,
	Retail,
} from "@/components/BeefStages";

const { Header, Content } = Layout;
const layoutStyle: React.CSSProperties = {
	backgroundColor: "#FFF7EA",
};
const headerStyle: React.CSSProperties = {
	textAlign: "center",
	height: 64,
	paddingInline: 48,
	lineHeight: "64px",
	backgroundColor: "#FFF7EA",
};
const contentStyle: React.CSSProperties = {
	textAlign: "center",
	minHeight: 120,
	lineHeight: "120px",
	backgroundColor: "#FFF7EA",
};

const Home: React.FC = () => {
	const [beefStage, setBeefStage] = useState<BeefStageType>("Network");
	const beefStageKeys: Record<string, BeefStageType> = {
		"0": "Network",
		"1": "Cow Calf",
		"2": "Stocker",
		"3": "Feedlot",
		"4": "Retail",
	};
	const beefStageOnClick: MenuProps["onClick"] = ({ key }) => {
		setBeefStage(beefStageKeys[key]);
	};
	const beefProcessingStage: MenuProps["items"] = [
		{
			label: "Network",
			key: "0",
		},
		{
			label: "Cow Calf",
			key: "1",
		},
		{
			label: "Stocker",
			key: "2",
		},
		{
			label: "Feedlot",
			key: "3",
		},
		{
			label: "Retail",
			key: "4",
		},
	];

	return (
		<Layout style={layoutStyle}>
			<Header style={headerStyle}>
				<Flex justify="space-between" align="center">
					<Dropdown
						menu={{ items: beefProcessingStage, onClick: beefStageOnClick }}
						trigger={["click"]}
						className={`${styles.beefStageMenu} ${styles.headerSpacer}`}
					>
						<Button onClick={(e) => e.preventDefault()}>
							<Space>
								{beefStage}
								<DownOutlined />
							</Space>
						</Button>
					</Dropdown>
					{beefStage}
				</Flex>
			</Header>
			<Content style={contentStyle}>
				<Flex>
					{(() => {
						switch (beefStage) {
							case "Network":
								return <Network />;
							case "Cow Calf":
								return <CowCalf />;
							case "Stocker":
								return <Stocker />;
							case "Feedlot":
								return <Feedlot />;
							case "Retail":
								return <Retail />;
							default:
								return <div>Error Loading Page [{beefStage}]</div>;
						}
					})()}
				</Flex>
			</Content>
		</Layout>
	);
};

export default Home;
