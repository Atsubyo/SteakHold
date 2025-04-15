import React, { useState } from "react";
import styles from "./network.module.css";
import { Button, Dropdown, Flex, MenuProps, Space } from "antd";
import { ArrowRightOutlined, DownOutlined } from "@ant-design/icons";
import {
	CowCalfType,
	FeedlotType,
	// OperationNameType,
	// OperationVisualizerProps,
	RunningStateType,
	StockerType,
} from "@/types/NetworkTypes";
import OperationModel from "@/components/simulator/OperationModel";
import { BeefStageType } from "@/types/ParameterTypes";
import OperationVisualizer from "@/components/simulator/OperationVisualizer"
import {
	defaultLHMCowCalf,
	defaultHHMCowCalf,
	defaultLHMStockerLHMCowCalf,
	defaultHHMStockerLHMCowCalf,
	defaultHHMStockerHHMCowCalf,
	defaultLHMBackgrounderLHMCowCalf,
	defaultHHMBackgrounderLHMCowCalf,
	defaultHHMBackgrounderHHMCowCalf,
	defaultLHMDirectFeedlotLHMStocker,
	defaultHHMDirectFeedlotLHMStocker,
	defaultHHMDirectFeedlotHHMStocker,
	defaultLHMIndirectFeedlotLHMStocker,
	defaultHHMIndirectFeedlotLHMStocker,
	defaultHHMIndirectFeedlotHHMStocker,
	defaultLHMIndirectFeedlotLHMBackgrounder,
	defaultHHMIndirectFeedlotLHMBackgrounder,
	defaultHHMIndirectFeedlotHHMBackgrounder,
  } from "@/stores/operationStagePresets";
// import OperationModel from "@/components/simulator/OperationModel";
// import { BeefStageType } from "@/types/ParameterTypes";

interface NetworkSimulatorProps {
	runningState: RunningStateType;
}

const NetworkSimulator: React.FC<NetworkSimulatorProps> = (
	{
		runningState,
	}
) => {

	const presets = [
		defaultLHMCowCalf,
		defaultHHMCowCalf,
		defaultLHMStockerLHMCowCalf,
		defaultHHMStockerLHMCowCalf,
		defaultHHMStockerHHMCowCalf,
		defaultLHMBackgrounderLHMCowCalf,
		defaultHHMBackgrounderLHMCowCalf,
		defaultHHMBackgrounderHHMCowCalf,
		defaultLHMDirectFeedlotLHMStocker,
		defaultHHMDirectFeedlotLHMStocker,
		defaultHHMDirectFeedlotHHMStocker,
		defaultLHMIndirectFeedlotLHMStocker,
		defaultHHMIndirectFeedlotLHMStocker,
		defaultHHMIndirectFeedlotHHMStocker,
		defaultLHMIndirectFeedlotLHMBackgrounder,
		defaultHHMIndirectFeedlotLHMBackgrounder,
		defaultHHMIndirectFeedlotHHMBackgrounder,
	];
	
	const [cowCalfType, setCowCalfType] =
		useState<CowCalfType>("Select Cow Calf");
	const [stockerType, setStockerType] = useState<StockerType>("Select Stocker");
	const [feedlotType, setFeedlotType] = useState<FeedlotType>("Select Feedlot");
	const [cowCalfOperationModel, setCowCalfOperationModel] = useState<OperationModel>(new OperationModel(presets[0]));
	const [stockerOperationModel, setStockerOperationModel] = useState<OperationModel>(new OperationModel(defaultLHMStockerLHMCowCalf));
	const [feedlotOperationModel, setFeedlotOperationModel] = useState<OperationModel>(new OperationModel(defaultLHMIndirectFeedlotLHMStocker));
	// const [operationModel, setOperationModel] = useState<OperationModel>();
	// const [, setNextOperationModel] = useState<OperationModel | null>();
	// const [operationStageName, setOperationStageName] =
	// 	useState<BeefStageType>("Cow Calf");
	

	const cowCalfTypeKeys: Record<string, CowCalfType> = {
		"0": "LHM Cow Calf",
		"1": "HHM Cow Calf",
	};
	const CowCalfTypeOnClick: MenuProps["onClick"] = ({ key }) => {
		setCowCalfType(cowCalfTypeKeys[key]);
	};
	const cowCalfTypeItem: MenuProps["items"] = [
		{
			label: "LHM Cow Calf",
			key: "0",
		},
		{
			label: "HHM Cow Calf",
			key: "1",
		},
	];

	const stockerTypeKeys: Record<string, StockerType> = {
		"0": "LHM Stocker",
		"1": "HHM Stocker",
	};
	const StockerTypeOnClick: MenuProps["onClick"] = ({ key }) => {
		setStockerType(stockerTypeKeys[key]);
	};
	const stockerTypeItem: MenuProps["items"] = [
		{
			label: "LHM Stocker",
			key: "0",
		},
		{
			label: "HHM Stocker",
			key: "1",
		},
	];

	const feedlotTypeKeys: Record<string, FeedlotType> = {
		"0": "LHM Indirect Feedlot",
		"1": "HHM Indirect Feedlot",
		"2": "LHM Direct Feedlot",
		"3": "HHM Direct Feedlot",
	};
	const FeedlotTypeOnClick: MenuProps["onClick"] = ({ key }) => {
		setFeedlotType(feedlotTypeKeys[key]);
	};
	const feedlotTypeItem: MenuProps["items"] = [
		{
			label: "LHM Indirect Feedlot",
			key: "0",
		},
		{
			label: "HHM Indirect Feedlot",
			key: "1",
		},
		{
			label: "LHM Direct Feedlot",
			key: "2",
		},
		{
			label: "HHM Direct Feedlot",
			key: "3",
		},
	];

	// const getOperationName = (
	// 	operationStageName: BeefStageType
	// ): OperationNameType => {
	// 	switch (operationStageName) {
	// 		case "Stocker":
	// 			return stockerType;
	// 		case "Feedlot":
	// 			return feedlotType;
	// 		case "Cow Calf":
	// 		case "Retail":
	// 		case "Network":
	// 		default:
	// 			return "LHM Cow Calf";
	// 	}
	// };

	// const getOperationVisualizerProps: OperationVisualizerProps = () => {
	// 	return {
	// 		operationModel: operationModel,
	// 		setOperationModel: setOperationModel,
	// 		setNextOperationalModel: setNextOperationModel,
	// 		operationStageName: operationStageName,
	// 		operationName: getOperationName(operationStageName),
	// 		isRunning: runningState === "running",
	// 		isFinished: runningState === "finished",
	// 	};
	// };

	return (
		<Flex className={styles.networkContainer} vertical>
			<Flex align="center" justify="center">
				<Dropdown
					menu={{ items: cowCalfTypeItem, onClick: CowCalfTypeOnClick }}
					trigger={["click"]}
					className={`${styles.networkSelectMenu} ${styles.headerSpacer}`}
				>
					<Button onClick={(e) => e.preventDefault()}>
						<Space>
							{cowCalfType}
							<DownOutlined/>
						</Space>
					</Button>
				</Dropdown>
				<ArrowRightOutlined />
				<Dropdown
					menu={{ items: stockerTypeItem, onClick: StockerTypeOnClick }}
					trigger={["click"]}
					className={`${styles.networkSelectMenu} ${styles.headerSpacer}`}
				>
					<Button onClick={(e) => e.preventDefault()}>
						<Space>
							{stockerType}
							<DownOutlined />
						</Space>
					</Button>
				</Dropdown>
				<ArrowRightOutlined />
				<Dropdown
					menu={{ items: feedlotTypeItem, onClick: FeedlotTypeOnClick }}
					trigger={["click"]}
					className={`${styles.networkSelectMenu} ${styles.headerSpacer}`}
				>
					<Button onClick={(e) => e.preventDefault()}>
						<Space>
							{feedlotType}
							<DownOutlined />
						</Space>
					</Button>
				</Dropdown>
			</Flex>
			<h1>Network Simulator</h1>
			<OperationVisualizer operationModel={cowCalfOperationModel}
			setOperationModel={setCowCalfOperationModel}
			setNextOperationalModel={setStockerOperationModel}
			operationStageName={"cow_calf"}
			isRunning={runningState === "running"}
			isFinished={runningState === "finished"}>
			</OperationVisualizer>
			<OperationVisualizer
				operationModel={stockerOperationModel}
				setOperationModel={setStockerOperationModel}
				setNextOperationalModel={setFeedlotOperationModel}
				operationStageName={"stocker"}
				isRunning={runningState === "running"}
				isFinished={runningState === "finished"}
			></OperationVisualizer>
			<OperationVisualizer
				operationModel={feedlotOperationModel}
				setOperationModel={setFeedlotOperationModel}
				setNextOperationalModel={null}
				operationStageName={"feedlot"}
				isRunning={runningState === "running"}
				isFinished={runningState === "finished"}
			></OperationVisualizer>
		</Flex>
	);
};

export default NetworkSimulator;
