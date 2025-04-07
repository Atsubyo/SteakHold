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
} from "@/types/NetworkTypes";
import NetworkSimulator from "./NetworkSimulator";

const Context = React.createContext({ name: "Default" });

// interface NetworkProps {}

const Network: React.FC = () => {
	const [api, contextHolder] = notification.useNotification();
	const contextValue = useMemo(() => ({ name: "Ant Design" }), []);
	const [networkMode, setNetworkMode] = useState<NetworkModeType>("Compare");
	const [networks, setNetworks] = useState<number[]>([0, 1]);
	const [runningState, setRunningState] =
		useState<RunningStateType>("not started");

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
		console.log(indexToRemove);
		setNetworks((prev) => {
			if (prev.length < 2) {
				openNotification({
					title: "Error Removing Network",
					message: "At least one network is required.",
				});
				return prev;
			}
			console.log(
				"after deleting:",
				prev.filter((_, index) => index !== indexToRemove)
			);
			return prev.filter((_, index) => index !== indexToRemove);
		});
	};

	interface RunningStateControlsProp {
		runningState: RunningStateType;
	}
	const RunningStateControls: React.FC<RunningStateControlsProp> = ({
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
								onClick={() => setRunningState("paused")}
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
								onClick={() => setRunningState("not started")}
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
								onClick={() => setRunningState("not started")}
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
								onClick={() => setRunningState("running")}
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
								onClick={() => setRunningState("not started")}
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
					<div className={styles.container}>Network Optimizer</div>
				) : (
					<div className={styles.container}>
						<div className={styles.setupHeader}>
							<RunningStateControls runningState={runningState} />
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
						<Flex
							className={styles.scrollContainer}
							style={{ paddingInline: "2rem" }}
						>
							<Flex
								className={`${styles.networkFlex} ${styles.scrollContainer}`}
							>
								{networks.map((value, index) => (
									<React.Fragment key={value}>
										<Tooltip title="Remove Network">
											<Button
												shape="circle"
												color="danger"
												variant="outlined"
												icon={<MinusOutlined />}
												onClick={() => deleteNetwork(value)}
											/>
										</Tooltip>
										<NetworkSimulator runningState={runningState} />
										{index < networks.length - 1 && (
											<Divider
												type="vertical"
												style={{ borderColor: "#43260A", height: "auto" }}
											/>
										)}
									</React.Fragment>
								))}
							</Flex>
						</Flex>
					</div>
				)}
			</Flex>
		</Context.Provider>
	);
};

export default Network;
