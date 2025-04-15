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

export type NetworkModeType = "Optimizer" | "Compare";

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

export interface CowInventoryType {
	initialWeight: number;
	numberOfHeifers: number;
	numberOfCows: number;
	heiferAliveThroughPregnancy: number;
	cowsAliveThroughPregnancy: number;
	percentCalfCropHeifers: number;
	percentCalfCropCows: number;
	totalNumberCalvesAvailableBeefWeight: number;
	costYoungBornCalf: number;
}

export interface CowCalfBudgetType {
	initialWeight: number;
	daysInCowCalf: number;
	ADGDuringCowCalfPhase: number;
	deathLossWean: number;
	calfSalePrice: number;
	culledBreedingStockSales: number;
}

export interface StockerBudgetType {
	initialWeight: number;
	daysInStocker: number;
	ADGDuringStockerPhase: number;
	deathLoss: number;
	stockerSalePrice: number;
}

export interface FeedlotBudgetType {
	initialWeight: number;
	daysInFeedlot: number;
	ADGDuringFeedlotPhase: number;
	deathLoss: number;
	feederCattleSalePrice: number;
}

export interface CowCalfExpenseType {
	vetVaccineDrug: number;
	labor: number;
	breeding: number;
	marketing: number;
	utilities: number;
	machinery: number;
	interestOnOperating: number;
	otherFixedCost: number;
	pastureCropResidue: number;
	harvestedForage: number;
	supplements: number;
	mineral: number;
}

export interface StockerExpenseType {
	vetVaccineDrug: number;
	labor: number;
	marketing: number;
	fuelAndEnergy: number;
	machinery: number;
	interestOnCattleLoan: number;
	other: number;
	winteringBackgroundingCost: number;
	summerGrazing: number;
	mineralAndSalt: number;
}

export interface FeedlotExpenseType {
	vetVaccineDrug: number;
	labor: number;
	marketing: number;
	fuelAndEnergy: number;
	machinery: number;
	interestOnCattleLoan: number;
	other: number;
	fixedExpense: number;
	harvestedForageCost: number;
	grainSupplement: number;
	mineral: number;
}
