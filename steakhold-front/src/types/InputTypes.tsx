export interface InitialInputsType {
	numberOfHeifers: number;
	numberOfCows: number;
	heiferAlivePregnancy: number;
	cowsAlivePregnancy: number;
	percentCalfCropHeifers: number;
	percentCalfCropCows: number;
	costYoungBornCalf: number;
}

export interface InitialInputsActions {
	setNumberOfHeifers: (value: number) => void;
	setNumberOfCows: (value: number) => void;
	setHeiferAlivePregnancy: (value: number) => void;
	setCowsAlivePregnancy: (value: number) => void;
	setPercentCalfCropHeifers: (value: number) => void;
	setPercentCalfCropCows: (value: number) => void;
	setCostYoungBornCalf: (value: number) => void;
}

export interface OperationInputsType {
	initialWeight: number;
	numCows: number;
	growthRate: number;
	deathLoss: number;
	maxDays: number;
	salePrice: number;
}

export interface OpertionInputsActions {
	setInitialWeight: (value: number) => void;
	setNumCows: (value: number) => void;
	setGrowthRate: (value: number) => void;
	setDeathLoss: (value: number) => void;
	setMaxDays: (value: number) => void;
	setSalePrice: (value: number) => void;
}
