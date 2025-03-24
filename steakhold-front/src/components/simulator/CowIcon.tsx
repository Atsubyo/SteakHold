import React from "react";
import styles from "./CowIcon.module.css";
import { CoordinateXYType, CowAgentType } from "@/types/SimulationTypes";

interface CowIconProps {
	cow: CowAgentType;
}

const CowIcon: React.FC<CowIconProps> = ({ cow }) => {
	const iconSize = cow.weight / 5;
	const cowPos: CoordinateXYType = {
		x: ((500 - iconSize) / 500) * cow.location.x,
		y: ((500 - iconSize) / 500) * cow.location.y,
	};
	return (
		<div
			className={styles.cowSvg}
			style={{
				top: `${cowPos.y}%`,
				left: `${cowPos.x}%`,
				width: `${iconSize}px`,
				height: `${iconSize}px`,
			}}
		></div>
	);
};

export default CowIcon;
