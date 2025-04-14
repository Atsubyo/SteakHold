import React, { useState } from "react";
import styles from "./network.module.css";
import { Button, Modal, Table } from "antd";

interface NetworkNodeProps {
	name: string;
	isOptimal: boolean;
}

const NetworkNode: React.FC<NetworkNodeProps> = ({ name, isOptimal }) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = () => {
		setIsModalOpen(false);
	};

	return (
		<React.Fragment>
			<Button
				shape="round"
				onClick={showModal}
				size="large"
				className={styles.optimizerNetworkNode}
				style={
					isOptimal
						? {
								backgroundColor: "#ffe58f",
						  }
						: {}
				}
			>
				{name}
			</Button>

			<Modal
				title="Basic Modal"
				open={isModalOpen}
				closable={false}
				onCancel={handleOk}
				footer={[
					<Button type="primary" key="close" onClick={handleOk}>
						Close
					</Button>,
				]}
			>
				<Table></Table>
			</Modal>
		</React.Fragment>
	);
};

export default NetworkNode;
