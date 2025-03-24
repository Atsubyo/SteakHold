import { NotificationArgsProps } from "antd";
import { BeefStageType } from "./ParameterTypes";
import OperationModel from "@/components/simulator/OperationModel";

type NotificationPlacement = NotificationArgsProps["placement"];
type NotificationType = "success" | "info" | "warning" | "error";

export interface OpenNotificationProps {
	placement?: NotificationPlacement;
	type?: NotificationType;
	title: string;
	message: string;
}

export type CowCalfType = "Select Cow Calf" | "LHM Cow Calf" | "HHM Cow Calf";
export type StockerType = "Select Stocker" | "LHM Stocker" | "HHM Stocker";
export type FeedlotType =
	| "Select Feedlot"
	| "LHM Indirect Feedlot"
	| "HHM Indirect Feedlot"
	| "LHM Direct Feedlot"
	| "HHM Direct Feedlot";
export type OperationNameType = CowCalfType | StockerType | FeedlotType;

export interface NetworkPath {
	cowCalf: CowCalfType;
	stocker: StockerType;
	feedLot: FeedlotType;
}

export type RunningStateType =
	| "not started"
	| "running"
	| "paused"
	| "finished";

export interface OperationVisualizerProps {
	operationModel: OperationModel;
	setOperationModel: React.Dispatch<React.SetStateAction<OperationModel>>;
	setNextOperationModel: React.Dispatch<
		React.SetStateAction<OperationModel | null>
	>;
	operationStageName: BeefStageType;
	operationName: OperationNameType;
	isRunning: boolean;
	isFinished: boolean;
}
