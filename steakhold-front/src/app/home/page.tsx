"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Flex, Layout, MenuProps, Space } from "antd";
import { BeefStageType, OptimizerType } from "@/types/ParameterTypes";
import {
	FeedCost,
	FeederCost,
	OtherCosts,
	FixedCost,
	InterestCost,
	LaborCost,
	Analytics,
	CattleFutures,
} from "@/components/optimizers";
import Simulation from "@/components/simulator/Simulation.jsx";

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
const drawerStyle: React.CSSProperties = {
	backgroundColor: "#fff7ea",
};

const Home: React.FC = () => {
	const [optimizer, setOptimizer] = useState<OptimizerType>("Home");
	const optimizerKeys: Record<string, OptimizerType> = {
		"0": "Home",
		"1": "Feed Cost",
		"2": "Feeder Cost",
		"3": "Other Costs",
		"4": "Fixed Cost",
		"5": "Interest Cost",
		"6": "Labor Cost",
		"7": "Analytics",
		"8": "Cattle Futures",
	};
	const optimizerOnClick: MenuProps["onClick"] = ({ key }) => {
		setOptimizer(optimizerKeys[key]);
	};
	const optimizerMenu: MenuProps["items"] = [
		{
			label: "Home",
			key: "0",
		},
		{
			label: "Feed Cost",
			key: "1",
		},
		{
			label: "Feeder Cost",
			key: "2",
		},
		{
			label: "Other Costs",
			key: "3",
		},
		{
			label: "Fixed Cost",
			key: "4",
		},
		{
			label: "Interest Cost",
			key: "5",
		},
		{
			label: "Labor Cost",
			key: "6",
		},
		{
			label: "Analytics",
			key: "7",
		},
		{
			label: "Cattle Futures",
			key: "8",
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
					{(() => {
						switch (optimizer) {
							case "Feed Cost":
								return <FeedCost />;
							case "Feeder Cost":
								return <FeederCost />;
							case "Other Costs":
								return <OtherCosts />;
							case "Fixed Cost":
								return <FixedCost />;
							case "Interest Cost":
								return <InterestCost />;
							case "Labor Cost":
								return <LaborCost />;
							case "Analytics":
								return <Analytics />;
							case "Cattle Futures":
								return <CattleFutures />;
							default:
								return (
									<div style={{ padding: "20px" }}>
										<Simulation
											operationName={beefStage}
											initialWeight={50}
											numCows={100}
											growthRate={2}
											deathLoss={0.03}
											maxDays={200}
											salePrice={130}
										></Simulation>
										<Simulation
											operationName={beefStage}
											initialWeight={100}
											numCows={100}
											growthRate={2.2}
											deathLoss={0.01}
											maxDays={200}
											salePrice={130}
										></Simulation>
									</div>
								);
						}
					})()}
				</Flex>
			</Content>
		</Layout>
	);
};

export default Home;
