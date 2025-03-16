import { NotificationArgsProps } from "antd";

type NotificationPlacement = NotificationArgsProps["placement"];
type NotificationType = "success" | "info" | "warning" | "error";

export interface OpenNotificationProps {
	placement?: NotificationPlacement;
	type?: NotificationType;
	title: string;
	message: string;
}
