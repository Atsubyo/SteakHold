import React, { useMemo, useState } from "react";
import styles from "./network.module.css";
import Simulation from "@/components/simulator/Simulation.jsx";
import { BeefStageType } from "@/types/ParameterTypes";
import { Flex, Divider, Button, Tooltip, notification } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { OpenNotificationProps } from "@/types/NetworkTypes";

interface NetworkSimulatorProps {
	title: string;
}

const NetworkSimulator: React.FC<NetworkSimulatorProps> = ({ title }) => {
	return (
		<Flex>
			<Simulation
				operationName={title}
				initialWeight={50}
				numCows={100}
				growthRate={2}
				deathLoss={0.03}
				maxDays={200}
				salePrice={130}
				v
				c
			/>
		</Flex>
	);
};

const Context = React.createContext({ name: "Default" });

interface NetworkProps {
	beefStage: BeefStageType;
}

const Network: React.FC<NetworkProps> = ({ beefStage }) => {
	const [numNetworks, setNumNetworks] = useState<number>(2);
	const [api, contextHolder] = notification.useNotification();
	const contextValue = useMemo(() => ({ name: "Ant Design" }), []);

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

	const updateNumNetworks = (modifier: number): void => {
		if (numNetworks + modifier < 1) {
			openNotification({
				title: "Error Removing Network",
				message: "Less than one network not permitted.",
			});
		} else {
			setNumNetworks(numNetworks + modifier);
		}
	};

	return (
		<Context.Provider value={contextValue}>
			{contextHolder}
			<div className={styles.container}>
				<div className={styles.setupHeader}>
					<Tooltip title="Add Network">
						<Button
							shape="circle"
							icon={<PlusOutlined />}
							onClick={() => updateNumNetworks(1)}
						/>
					</Tooltip>
				</div>
				<Flex className={styles.scrollContainer}>
					<Flex className={styles.networkFlex}>
						{Array.from({ length: numNetworks }).map((_, index) => (
							<React.Fragment key={index}>
								<Tooltip title="Remove Network">
									<Button
										shape="circle"
										icon={<MinusOutlined />}
										onClick={() => updateNumNetworks(-1)}
									/>
								</Tooltip>
								<NetworkSimulator title={beefStage} />
								{index < numNetworks - 1 && (
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
		</Context.Provider>
	);
};

export default Network;
