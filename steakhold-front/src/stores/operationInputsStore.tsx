import { createStore } from "zustand/vanilla";
import { OperationInputsType, OpertionInputsActions } from "@/types/InputTypes";

export type OperationInputsStore = OperationInputsType & OpertionInputsActions;

export const defaultOperationInputsState: OperationInputsType = {
	initialWeight: 0,
	numCows: 0,
	growthRate: 0,
	deathLoss: 0,
	maxDays: 0,
	salePrice: 0,
};

export const createOperationInputsStore = (
	initState: OperationInputsType = defaultOperationInputsState
) => {
	return createStore<OperationInputsStore>((set) => ({
		...initState,
		setInitialWeight: (value: number) => set({ initialWeight: value }),
		setNumCows: (value: number) => set({ numCows: value }),
		setGrowthRate: (value: number) => set({ growthRate: value }),
		setDeathLoss: (value: number) => set({ deathLoss: value }),
		setMaxDays: (value: number) => set({ maxDays: value }),
		setSalePrice: (value: number) => set({ salePrice: value }),
	}));
};
