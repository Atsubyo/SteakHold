import React, { useMemo, useState } from "react";
import styles from "./network.module.css";
import { Flex, Divider, Button, Tooltip, notification, Segmented } from "antd";
import {
	MinusOutlined,
	PauseOutlined,
	PlusOutlined,
	PoweroffOutlined,
	UndoOutlined,
} from "@ant-design/icons";
import {
	NetworkModeType,
	OpenNotificationProps,
	RunningStateType,
	NetworkLayerType,
	NetworkLayerNodeType,
} from "@/types/NetworkTypes";
import NetworkSimulator from "./NetworkSimulator";
import NetworkNode from "./NetworkNode";

const Context = React.createContext({ name: "Default" });

// interface NetworkProps {}

const Network: React.FC = () => {
	const [api, contextHolder] = notification.useNotification();
	const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
	const [networkMode, setNetworkMode] = useState<NetworkModeType>("Optimizer");
	const [networks, setNetworks] = useState<number[]>([0, 1]);
	const [runningComparisonState, setRunningComparisonState] =
		useState<RunningStateType>("not started");

	const [networkLayers, setNetworkLayers] = useState<NetworkLayerType>({
		cowCalfInventory: [{ id: 0, name: "Cow-Calf Inventory", isOptimal: false }],
		cowCalf: [
			{ id: 1, name: "LHM Cow Calf Operation", isOptimal: false },
			{ id: 2, name: "HHM Cow Calf Operation", isOptimal: false },
		],
		stocker: [
			{ id: 3, name: "LHM Stocker for LHM Calves", isOptimal: false },
			{ id: 4, name: "HHM Stocker for LHM Calves", isOptimal: false },
			{ id: 5, name: "HHM Stocker for HHM Calves", isOptimal: false },
			{ id: 6, name: "LHM Backgrounder for LHM Calves", isOptimal: false },
			{ id: 7, name: "HHM Backgrounder for LHM Calves", isOptimal: false },
			{ id: 8, name: "HHM Backgrounder for HHM Calves", isOptimal: false },
		],
		indirectFeedlot: [
			{
				id: 9,
				name: "LHM Indirect Feedlots for LHM Stocker",
				isOptimal: false,
			},
			{
				id: 10,
				name: "HHM Indirect Feedlots for LHM Stocker",
				isOptimal: false,
			},
			{ id: 11, name: "HHM Feedlots for LHM Backgrounder", isOptimal: false },
			{
				id: 12,
				name: "LHM Indirect Feedlots for LHM Backgrounder",
				isOptimal: false,
			},
			{
				id: 13,
				name: "HHM Indirect Feedlots for LHM Backgrounder",
				isOptimal: false,
			},
			{
				id: 14,
				name: "HHM Indirect Feedlots for HHM Backgrounder",
				isOptimal: false,
			},
		],
		directFeedlot: [
			{
				id: 15,
				name: "LHM Direct Feedlot for LHM Calf Operation",
				isOptimal: false,
			},
			{
				id: 16,
				name: "HHM Direct Feedlot for LHM Calf Operation",
				isOptimal: false,
			},
			{ id: 17, name: "HHM Direct for HHM Calf Operation", isOptimal: false },
		],
		slaughter: [{ id: 18, name: "Slaughter", isOptimal: false }],
	});

	const openNotification = ({
		placement = "bottom",
		type = "error",
		title,
		message,
	}: OpenNotificationProps) => {
		api[type]({
			message: `${title}`,
			description: `${message}`,
			placement,
			showProgress: true,
			pauseOnHover: true,
		});
	};
	const addNetwork = (): void => {
		setNetworks((prev) => [...prev, prev.length]);
	};
	const deleteNetwork = (indexToRemove: number): void => {
		setNetworks((prev) => {
			if (prev.length < 2) {
				openNotification({
					title: "Error Removing Network",
					message: "At least one network is required.",
				});
				return prev;
			}
			return prev.filter((_, index) => index !== indexToRemove);
		});
	};

	interface RunningStateControlsProp {
		runningState: RunningStateType;
	}
	const RunningOptimizerStateControls: React.FC = () => {
		return (
			<React.Fragment>
				<Tooltip
					title="Start Simulations"
					className={styles.simulationController}
				>
					<Button
						shape="round"
						color="default"
						variant="outlined"
						icon={<PoweroffOutlined />}
						onClick={() => {
							setNetworkLayers((prev) => ({
								...prev,
								cowCalfInventory: prev.cowCalfInventory.map((node, i) => ({
									...node,
									isOptimal: i === 0 ? true : node.isOptimal,
								})),
								cowCalf: prev.cowCalf.map((node, i) => ({
									...node,
									isOptimal: i === 1 ? true : node.isOptimal,
								})),
								stocker: prev.stocker.map((node, i) => ({
									...node,
									isOptimal: i === 2 ? true : node.isOptimal,
								})),
								indirectFeedlot: prev.indirectFeedlot.map((node, i) => ({
									...node,
									isOptimal: i === 2 ? true : node.isOptimal,
								})),
								slaughter: prev.slaughter.map((node, i) => ({
									...node,
									isOptimal: i === 0 ? true : node.isOptimal,
								})),
							}));
						}}
					>
						Run Optimizer
					</Button>
				</Tooltip>
				<Tooltip
					title="Start Simulations"
					className={styles.simulationController}
				>
					<Button
						shape="round"
						color="default"
						variant="outlined"
						icon={<UndoOutlined />}
						onClick={() => {
							setNetworkLayers((prev) => {
								const resetLayer = (layer: NetworkLayerNodeType) =>
									layer.map((node) => ({
										...node,
										isOptimal: false,
									}));

								return {
									cowCalfInventory: resetLayer(prev.cowCalfInventory),
									cowCalf: resetLayer(prev.cowCalf),
									stocker: resetLayer(prev.stocker),
									indirectFeedlot: resetLayer(prev.indirectFeedlot),
									directFeedlot: resetLayer(prev.directFeedlot),
									slaughter: resetLayer(prev.slaughter),
								};
							});
						}}
					>
						Reset Optimizer
					</Button>
				</Tooltip>
			</React.Fragment>
		);
	};
	const RunningComparisonStateControls: React.FC<RunningStateControlsProp> = ({
		runningState,
	}) => {
		switch (runningState) {
			case "running":
				return (
					<React.Fragment>
						<Tooltip
							title="Pause Simulations"
							className={styles.simulationController}
						>
							<Button
								shape="round"
								color="default"
								variant="outlined"
								icon={<PauseOutlined />}
								onClick={() => setRunningComparisonState("paused")}
							>
								Pause Simulations
							</Button>
						</Tooltip>
						<Tooltip
							title="Reset Simulations"
							className={styles.simulationController}
						>
							<Button
								shape="round"
								color="default"
								variant="outlined"
								icon={<UndoOutlined />}
								onClick={() => setRunningComparisonState("not started")}
							>
								Reset Simulations
							</Button>
						</Tooltip>
					</React.Fragment>
				);
			case "finished":
				return (
					<React.Fragment>
						<Tooltip
							title="Reset Simulations"
							className={styles.simulationController}
						>
							<Button
								shape="round"
								color="default"
								variant="outlined"
								icon={<UndoOutlined />}
								onClick={() => setRunningComparisonState("not started")}
							>
								Reset Simulations
							</Button>
						</Tooltip>
					</React.Fragment>
				);
			case "not started":
			case "paused":
			default:
				return (
					<React.Fragment>
						<Tooltip
							title="Start Simulations"
							className={styles.simulationController}
						>
							<Button
								shape="round"
								color="default"
								variant="outlined"
								icon={<PoweroffOutlined />}
								onClick={() => setRunningComparisonState("running")}
							>
								Start Simulations
							</Button>
						</Tooltip>
						<Tooltip
							title="Reset Simulations"
							className={styles.simulationController}
						>
							<Button
								shape="round"
								color="default"
								variant="outlined"
								icon={<UndoOutlined />}
								onClick={() => setRunningComparisonState("not started")}
							>
								Reset Simulations
							</Button>
						</Tooltip>
					</React.Fragment>
				);
		}
	};

	return (
		<Context.Provider value={contextValue}>
			{contextHolder}
			<Flex vertical justify="center">
				<Flex justify="center" className={styles.networkControl}>
					<div className={styles.networkSegement}>
						<Segmented
							block
							shape="round"
							options={["Optimizer", "Compare"]}
							value={networkMode}
							onChange={(val: NetworkModeType) => setNetworkMode(val)}
						/>
					</div>
				</Flex>
				{networkMode === "Optimizer" ? (
					<div className={styles.container}>
						<div className={styles.setupHeader}>
							<RunningOptimizerStateControls />
						</div>
						<div className={styles.optimizerWebDiagramContainer}>
							<div className={styles.optimizerWebDiagramFrame}>
								<Flex gap={50} className={styles.scrollContainer}>
									{Object.entries(networkLayers).map(
										([layerName, nodes]: [string, NetworkLayerNodeType]) => (
											<Flex
												key={layerName}
												vertical
												align="center"
												justify="center"
												gap={60}
												className={styles.optimizerWebDiagramLayer}
											>
												{nodes.map(
													(networkNode: NetworkLayerNodeType[number]) => (
														<NetworkNode
															key={networkNode.id}
															name={networkNode.name}
															isOptimal={networkNode.isOptimal}
														/>
													)
												)}
											</Flex>
										)
									)}
								</Flex>
							</div>
						</div>
					</div>
				) : (
					<div className={styles.container}>
						<div className={styles.setupHeader}>
							<RunningComparisonStateControls
								runningState={runningComparisonState}
							/>
							<Tooltip
								title="Add Network"
								className={styles.simulationController}
							>
								<Button
									shape="round"
									color="default"
									variant="outlined"
									icon={<PlusOutlined />}
									onClick={() => addNetwork()}
								>
									Add Network
								</Button>
							</Tooltip>
						</div>
						<div className={styles.networkCompareContainer}>
							<div className={styles.networkCompareFrame}>
								<Flex className={styles.scrollContainer}>
									{networks.map((value, index) => (
										<Flex className={styles.networkCompare} key={value}>
											<Tooltip title="Remove Network">
												<Button
													shape="circle"
													color="danger"
													variant="outlined"
													icon={<MinusOutlined />}
													onClick={() => deleteNetwork(value)}
												/>
											</Tooltip>
											<NetworkSimulator runningState={runningComparisonState} />
											{index < networks.length - 1 && (
												<Divider
													type="vertical"
													style={{ borderColor: "#43260A", height: "auto" }}
												/>
											)}
										</Flex>
									))}
								</Flex>
							</div>
						</div>
					</div>
				)}
			</Flex>
		</Context.Provider>
	);
};

export default Network;
