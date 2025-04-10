import React, { useMemo, useState } from "react";
import styles from "./network.module.css";
import { Flex, Divider, Button, Tooltip, notification, Segmented } from "antd";
import {
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
					<Flex vertical>Network Optimizer</Flex>
				) : (
					<Flex vertical>
						<div className={styles.setupHeader}>
							<RunningStateControls runningState={runningState} />
							<Tooltip
								title="Add Network"
								className={styles.simulationController}
							>
								<Button
									// shape="round"
									color="green"
									variant="outlined"
									icon={<PlusOutlined />}
									onClick={() => addNetwork()}
								>
									Add Network
								</Button>
							</Tooltip>
						</div>
						<div className={styles.scrollContainer}>
							<Flex className={styles.networkFlex}>
								{networks.map((networkID, index) => (
									<React.Fragment key={networkID}>
										<NetworkSimulator
											runningState={runningState}
											networkID={networkID}
											deleteNetwork={deleteNetwork}
										/>
										{index < networks.length - 1 && (
											<Divider
												type="vertical"
												style={{ borderColor: "#43260A", height: "auto" }}
											/>
										)}
									</React.Fragment>
								))}
							</Flex>
						</div>
					</Flex>
				)}
			</Flex>
		</Context.Provider>
	);
};

export default Network;
