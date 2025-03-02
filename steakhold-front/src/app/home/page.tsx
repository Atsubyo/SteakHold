"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Flex, Layout, MenuProps, Space } from "antd";
import { BeefStageType, OptimizerType } from "@/types/ParameterTypes";
import PheromoneModel from "@/components/AgentBasedModel";

const { Header, Content } = Layout;

const headerStyle: React.CSSProperties = {
	textAlign: "center",
	height: 64,
	paddingInline: 48,
	lineHeight: "64px",
	backgroundColor: "#fff7ea",
};

const contentStyle: React.CSSProperties = {
	textAlign: "center",
	minHeight: 120,
	lineHeight: "120px",
	backgroundColor: "#fff7ea",
};

const Home: React.FC = () => {
	const [optimizer, setOptimizer] = useState<OptimizerType>("Feed Cost");
	const optimizerKeys: Record<string, OptimizerType> = {
		"0": "Feed Cost",
		"1": "Feeder Cost",
		"2": "Other Costs",
		"3": "Fixed Cost",
		"4": "Interest Cost",
		"5": "Labor Cost",
		"6": "Analytics",
		"7": "Cattle Futures",
	};
	const optimizerOnClick: MenuProps["onClick"] = ({ key }) => {
		setOptimizer(optimizerKeys[key]);
	};
	const optimizerMenu: MenuProps["items"] = [
		{
			label: "Feed Cost",
			key: "0",
		},
		{
			label: "Feeder Cost",
			key: "1",
		},
		{
			label: "Other Costs",
			key: "2",
		},
		{
			label: "Fixed Cost",
			key: "3",
		},
		{
			label: "Interest Cost",
			key: "4",
		},
		{
			label: "Labor Cost",
			key: "5",
		},
		{
			label: "Analytics",
			key: "6",
		},
		{
			label: "Cattle Futures",
			key: "7",
		},
	];

	const [beefStage, setBeefStage] = useState<BeefStageType>("Cow Calf");
	const beefStageKeys: Record<string, BeefStageType> = {
		"0": "Cow Calf",
		"1": "Stocker",
		"2": "Feedlot",
		"3": "Retail",
	};
	const beefStageOnClick: MenuProps["onClick"] = ({ key }) => {
		setBeefStage(beefStageKeys[key]);
	};
	const beefProcessingStage: MenuProps["items"] = [
		{
			label: "Cow Calf",
			key: "0",
		},
		{
			label: "Stocker",
			key: "1",
		},
		{
			label: "Feedlot",
			key: "2",
		},
		{
			label: "Retail",
			key: "3",
		},
	];

	return (
		<Layout className={styles.body}>
			<Header style={headerStyle}>
				<Flex justify="space-between" align="center">
					<div className={`${styles.headerSpacer}`} />
					{optimizer}
					<Dropdown
						menu={{ items: optimizerMenu, onClick: optimizerOnClick }}
						trigger={["click"]}
						className={`${styles.optimizerMenu} ${styles.headerSpacer}`}
					>
						<Button onClick={(e) => e.preventDefault()}>
							<Space>
								{optimizer}
								<DownOutlined />
							</Space>
						</Button>
					</Dropdown>
				</Flex>
			</Header>
			<Content style={contentStyle}>
				<Flex>
					<Dropdown
						menu={{ items: beefProcessingStage, onClick: beefStageOnClick }}
						trigger={["click"]}
						className={`${styles.beefStageMenu}`}
					>
						<Button onClick={(e) => e.preventDefault()}>
							<Space>
								{beefStage}
								<DownOutlined />
							</Space>
						</Button>
					</Dropdown>
					<PheromoneModel></PheromoneModel>
				</Flex>
			</Content>
		</Layout>
	);
};

export default Home;
