import React, { useState } from "react";
import styles from "./network.module.css";
import { Button, Dropdown, Flex, MenuProps, Space } from "antd";
import { ArrowRightOutlined, DownOutlined } from "@ant-design/icons";
import { CowCalfType, FeedlotType, StockerType } from "@/types/NetworkTypes";

// interface NetworkSimulatorProps {}

const NetworkSimulator: React.FC = ({}) => {
	const [cowCalfType, setCowCalfType] =
		useState<CowCalfType>("Select Cow Calf");
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
	const [stockerType, setStockerType] = useState<StockerType>("Select Stocker");
	const stockerTypeKeys: Record<string, StockerType> = {
		"0": "LHM Stocker",
		"1": "HHM Stocker",
	};
	const StockerTypeOnClick: MenuProps["onClick"] = ({ key }) => {
		setStockerType(stockerTypeKeys[key]);
	};
	const stockerTypeItem: MenuProps["items"] = [
		{
			label: "LHM Cow Calf",
			key: "0",
		},
		{
			label: "HHM Cow Calf",
			key: "1",
		},
	];
	const [feedlotType, setFeedlotType] = useState<FeedlotType>("Select Feedlot");
	const feedlotTypeKeys: Record<string, FeedlotType> = {
		"0": "LHM Indirect Feedlot",
		"1": "HHM Indirect Feedlot",
		"2": "HHM Direct Feedlot",
		"3": "HHM Direct Feedlot",
	};
	const FeedlotTypeOnClick: MenuProps["onClick"] = ({ key }) => {
		setFeedlotType(feedlotTypeKeys[key]);
	};
	const feedlotTypeItem: MenuProps["items"] = [
		{
			label: "LHM Cow Calf",
			key: "0",
		},
		{
			label: "HHM Cow Calf",
			key: "1",
		},
	];

	return (
		<Flex vertical>
			<Flex align="center" justify="center">
				<Dropdown
					menu={{ items: cowCalfTypeItem, onClick: CowCalfTypeOnClick }}
					trigger={["click"]}
					className={`${styles.networkSelectMenu} ${styles.headerSpacer}`}
				>
					<Button onClick={(e) => e.preventDefault()}>
						<Space>
							{cowCalfType}
							<DownOutlined />
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
		</Flex>
	);
};

export default NetworkSimulator;
