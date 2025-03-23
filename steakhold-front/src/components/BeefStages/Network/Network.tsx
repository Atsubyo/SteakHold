import React, { useMemo, useState } from "react";
import styles from "./network.module.css";
import { Flex, Divider, Button, Tooltip, notification } from "antd";
import {
	MinusOutlined,
	PlusOutlined,
	PoweroffOutlined,
} from "@ant-design/icons";
import { OpenNotificationProps } from "@/types/NetworkTypes";
import NetworkSimulator from "./NetworkSimulator";

const Context = React.createContext({ name: "Default" });

// interface NetworkProps {}

const Network: React.FC = () => {
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
							color="default"
							variant="outlined"
							icon={<PlusOutlined />}
							onClick={() => updateNumNetworks(1)}
						/>
					</Tooltip>
					<Tooltip title="Start Simulation">
						<Button
							shape="round"
							color="default"
							variant="outlined"
							icon={<PoweroffOutlined />}
							onClick={() => updateNumNetworks(1)}
						>
							Start Simulation
						</Button>
					</Tooltip>
				</div>
				<Flex className={styles.scrollContainer}>
					<Flex className={styles.networkFlex}>
						{Array.from({ length: numNetworks }).map((_, index) => (
							<React.Fragment key={index}>
								<Tooltip title="Remove Network">
									<Button
										shape="circle"
										color="danger"
										variant="outlined"
										icon={<MinusOutlined />}
										onClick={() => updateNumNetworks(-1)}
									/>
								</Tooltip>
								<NetworkSimulator />
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
