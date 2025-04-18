import type { Config } from "jest";

const config: Config = {
	preset: "ts-jest",
	testEnvironment: "jest-environment-jsdom",
	moduleNameMapper: {
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
	},
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	transform: {
		"^.+\\.(ts|tsx)$": "ts-jest",
	},
	testMatch: ["**/__tests__/**/*.(ts|tsx)", "**/?(*.)+(spec|test).(ts|tsx)"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};

export default config;
