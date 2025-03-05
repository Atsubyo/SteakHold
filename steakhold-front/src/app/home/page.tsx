"use client";

import React, { useState } from "react";
import styles from "./page.module.css";
import { DownOutlined } from "@ant-design/icons";
import {
	Button,
	Card,
	Col,
	Drawer,
	Dropdown,
	Flex,
	Grid,
	InputNumber,
	InputNumberProps,
	Layout,
	MenuProps,
	Row,
	Slider,
	Space,
} from "antd";
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
import { useOperationInputsStore } from "@/stores/operationInputsStoreProvider";
import { useShallow } from "zustand/shallow";
import Simulation from "@/components/Simulation";

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
	const [openDrawer, setOpenDrawer] = useState(false);
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

	const operationInputsStore = useOperationInputsStore(
		useShallow((store) => ({
			initialWeight: store.initialWeight,
			setInitialWeight: store.setInitialWeight,
			numCows: store.numCows,
			setNumCows: store.setNumCows,
			growthRate: store.growthRate,
			setGrowthRate: store.setGrowthRate,
			deathLoss: store.deathLoss,
			setDeathLoss: store.setDeathLoss,
			maxDays: store.maxDays,
			setMaxDays: store.setMaxDays,
			salePrice: store.salePrice,
			setSalePrice: store.setSalePrice,
		}))
	);

	const operationInputsRange = {
		initialWeightMin: 0,
		initialWeightMax: 100,
		numCowsMin: 0,
		numCowsMax: 100,
		growthRateMin: 0,
		growthRateMax: 100,
		deathLossMin: 0,
		deathLossMax: 100,
		maxDaysMin: 0,
		maxDaysMax: 100,
		salePriceMin: 0,
		salePriceMax: 100,
	};

	const handleSliderChange =
		(slider: string): InputNumberProps["onChange"] =>
		(value) => {
			switch (slider) {
				case "initialWeight":
					operationInputsStore.setInitialWeight(value as number);
					break;
				case "numCows":
					operationInputsStore.setNumCows(value as number);
					break;
				case "growthRate":
					operationInputsStore.setGrowthRate(value as number);
					break;
				case "deathLoss":
					operationInputsStore.setDeathLoss(value as number);
					break;
				case "maxDays":
					operationInputsStore.setMaxDays(value as number);
					break;
				case "salePrice":
					operationInputsStore.setSalePrice(value as number);
					break;
				default:
					break;
			}
			console.log(operationInputsStore);
		};

	const onDrawerClose = () => {
		setOpenDrawer(false);
	};

	const onDrawerOpen = () => {
		setOpenDrawer(true);
	};

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
										<Button onClick={onDrawerOpen}>Configure Simulation</Button>
										<Simulation operationName={beefStage} LHM = {[50, 100, 2, 0.03, 200, 130]}></Simulation>
										<Simulation operationName={beefStage} LHM={[100, 100, 2.2, 0.01, 200, 130]}></Simulation>
										<Drawer
											title="Simulation Configs"
											placement="left"
											width={500}
											onClose={onDrawerClose}
											open={openDrawer}
											style={drawerStyle}
										>
											<Flex gap={20} vertical>
												<Card title="Initial Weight" variant="borderless">
													<Slider
														min={operationInputsRange.initialWeightMin}
														max={operationInputsRange.initialWeightMax}
														value={operationInputsStore.initialWeight}
														onChange={handleSliderChange("initialWeight")}
													/>
													<InputNumber
														min={operationInputsRange.initialWeightMin}
														max={operationInputsRange.initialWeightMax}
														style={{ margin: "0 16px" }}
														value={operationInputsStore.initialWeight}
														onChange={handleSliderChange("initialWeight")}
													/>
												</Card>
												<Card title="Number of Cows" variant="borderless">
													<Slider
														min={operationInputsRange.numCowsMin}
														max={operationInputsRange.numCowsMax}
														value={operationInputsStore.numCows}
														onChange={handleSliderChange("numCows")}
													/>
													<InputNumber
														min={operationInputsRange.numCowsMin}
														max={operationInputsRange.numCowsMax}
														style={{ margin: "0 16px" }}
														value={operationInputsStore.numCows}
														onChange={handleSliderChange("numCows")}
													/>
												</Card>
												<Card title="Growth Rate" variant="borderless">
													<Slider
														min={operationInputsRange.growthRateMin}
														max={operationInputsRange.growthRateMax}
														value={operationInputsStore.growthRate}
														onChange={handleSliderChange("growthRate")}
													/>
													<InputNumber
														min={operationInputsRange.growthRateMin}
														max={operationInputsRange.growthRateMax}
														style={{ margin: "0 16px" }}
														value={operationInputsStore.growthRate}
														onChange={handleSliderChange("growthRate")}
													/>
												</Card>
												<Card title="Death Loss" variant="borderless">
													<Slider
														min={operationInputsRange.deathLossMin}
														max={operationInputsRange.deathLossMax}
														value={operationInputsStore.deathLoss}
														onChange={handleSliderChange("deathLoss")}
													/>
													<InputNumber
														min={operationInputsRange.deathLossMin}
														max={operationInputsRange.deathLossMax}
														style={{ margin: "0 16px" }}
														value={operationInputsStore.deathLoss}
														onChange={handleSliderChange("deathLoss")}
													/>
												</Card>
												<Card title="Max Days" variant="borderless">
													<Slider
														min={operationInputsRange.maxDaysMin}
														max={operationInputsRange.maxDaysMax}
														value={operationInputsStore.maxDays}
														onChange={handleSliderChange("maxDays")}
													/>
													<InputNumber
														min={operationInputsRange.maxDaysMin}
														max={operationInputsRange.maxDaysMax}
														style={{ margin: "0 16px" }}
														value={operationInputsStore.maxDays}
														onChange={handleSliderChange("maxDays")}
													/>
												</Card>
												<Card title="Sale Price" variant="borderless">
													<Slider
														min={operationInputsRange.salePriceMin}
														max={operationInputsRange.salePriceMax}
														value={operationInputsStore.salePrice}
														onChange={handleSliderChange("salePrice")}
													/>
													<InputNumber
														min={operationInputsRange.salePriceMin}
														max={operationInputsRange.salePriceMax}
														style={{ margin: "0 16px" }}
														value={operationInputsStore.salePrice}
														onChange={handleSliderChange("salePrice")}
													/>
												</Card>
											</Flex>
										</Drawer>
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
