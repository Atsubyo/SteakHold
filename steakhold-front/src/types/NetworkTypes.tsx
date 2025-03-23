import { NotificationArgsProps } from "antd";

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
