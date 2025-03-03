// src/providers/counter-store-provider.tsx
"use client";

import {
	type ReactNode,
	createContext,
	useRef,
	useContext,
	useMemo,
} from "react";
import { useStore } from "zustand";

import {
	type OperationInputsStore,
	createOperationInputsStore,
	defaultOperationInputsState,
} from "./operationInputsStore";

export type OperationInputsStoreApi = ReturnType<
	typeof createOperationInputsStore
>;

export const OperationInputsStoreContext = createContext<
	OperationInputsStoreApi | undefined
>(undefined);

export interface OperationInputsStoreProviderProps {
	children: ReactNode;
}

export const OperationInputsStoreProvider = ({
	children,
}: OperationInputsStoreProviderProps) => {
	const storeRef = useRef<OperationInputsStoreApi>(null);
	if (!storeRef.current) {
		storeRef.current = createOperationInputsStore(defaultOperationInputsState);
	}

	return (
		<OperationInputsStoreContext.Provider value={storeRef.current}>
			{children}
		</OperationInputsStoreContext.Provider>
	);
};

export const useOperationInputsStore = <T,>(
	selector: (store: OperationInputsStore) => T
): T => {
	const operationInputsStoreContext = useContext(OperationInputsStoreContext);

	if (!operationInputsStoreContext) {
		throw new Error(
			`useOperationInputsStore must be used within OperationInputsStoreProvider`
		);
	}

	return useStore(operationInputsStoreContext, selector);
};
