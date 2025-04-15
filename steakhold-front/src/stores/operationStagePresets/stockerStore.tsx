import { StockerBudgetType, StockerExpenseType } from "@/types/NetworkTypes";

export const defaultLHMStockerLHMCowCalf: StockerBudgetType &
	StockerExpenseType = {
	initialWeight: 523.8,
	daysInStocker: 200,
	ADGDuringStockerPhase: 1,
	deathLoss: 0.03,
	stockerSalePrice: 140.0,
	vetVaccineDrug: 10.0,
	labor: 18.0,
	marketing: 5.0,
	fuelAndEnergy: 10.0,
	machinery: 5.0,
	interestOnCattleLoan: 2.0,
	other: 2.5,
	winteringBackgroundingCost: 120.0,
	summerGrazing: 120.0,
	mineralAndSalt: 10.0,
};

export const defaultHHMStockerLHMCowCalf: StockerBudgetType &
	StockerExpenseType = {
	initialWeight: 523.8,
	daysInStocker: 200,
	ADGDuringStockerPhase: 1.5,
	deathLoss: 0.025,
	stockerSalePrice: 140.0,
	vetVaccineDrug: 24.0,
	labor: 38.0,
	marketing: 10.0,
	fuelAndEnergy: 17.0,
	machinery: 6.0,
	interestOnCattleLoan: 4.5,
	other: 7.0,
	winteringBackgroundingCost: 135.0,
	summerGrazing: 130.0,
	mineralAndSalt: 12.0,
};

export const defaultHHMStockerHHMCowCalf: StockerBudgetType &
	StockerExpenseType = {
	initialWeight: 589.225,
	daysInStocker: 200,
	ADGDuringStockerPhase: 2,
	deathLoss: 0.02,
	stockerSalePrice: 140.0,
	vetVaccineDrug: 30.0,
	labor: 43.0,
	marketing: 15.0,
	fuelAndEnergy: 24.0,
	machinery: 8.0,
	interestOnCattleLoan: 5.5,
	other: 9.0,
	winteringBackgroundingCost: 140.0,
	summerGrazing: 132.0,
	mineralAndSalt: 14.0,
};

export const defaultLHMBackgrounderLHMCowCalf: StockerBudgetType &
	StockerExpenseType = {
	initialWeight: 523.8,
	daysInStocker: 200,
	ADGDuringStockerPhase: 1,
	deathLoss: 0.03,
	stockerSalePrice: 140.0,
	vetVaccineDrug: 15.0,
	labor: 27.0,
	marketing: 8.0,
	fuelAndEnergy: 12.0,
	machinery: 4.0,
	interestOnCattleLoan: 4.0,
	other: 7.0,
	winteringBackgroundingCost: 155.0,
	summerGrazing: 72.0,
	mineralAndSalt: 19.0,
};

export const defaultHHMBackgrounderLHMCowCalf: StockerBudgetType &
	StockerExpenseType = {
	initialWeight: 523.8,
	daysInStocker: 200,
	ADGDuringStockerPhase: 1.5,
	deathLoss: 0.025,
	stockerSalePrice: 140.0,
	vetVaccineDrug: 29.0,
	labor: 47.0,
	marketing: 13.0,
	fuelAndEnergy: 19.0,
	machinery: 8.0,
	interestOnCattleLoan: 6.0,
	other: 9.0,
	winteringBackgroundingCost: 170.0,
	summerGrazing: 82.0,
	mineralAndSalt: 21.0,
};

export const defaultHHMBackgrounderHHMCowCalf: StockerBudgetType &
	StockerExpenseType = {
	initialWeight: 589.225,
	daysInStocker: 200,
	ADGDuringStockerPhase: 2,
	deathLoss: 0.02,
	stockerSalePrice: 140.0,
	vetVaccineDrug: 35.0,
	labor: 52.0,
	marketing: 18.0,
	fuelAndEnergy: 26.0,
	machinery: 10.0,
	interestOnCattleLoan: 7.0,
	other: 11.0,
	winteringBackgroundingCost: 175.0,
	summerGrazing: 84.0,
	mineralAndSalt: 23.0,
};
