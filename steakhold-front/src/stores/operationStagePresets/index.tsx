import { CowInventoryType } from "@/types/NetworkTypes";
import { defaultHHMCowCalf, defaultLHMCowCalf } from "./cowCalfStore";
import {
	defaultLHMStockerLHMCowCalf,
	defaultHHMStockerLHMCowCalf,
	defaultHHMStockerHHMCowCalf,
	defaultLHMBackgrounderLHMCowCalf,
	defaultHHMBackgrounderLHMCowCalf,
	defaultHHMBackgrounderHHMCowCalf,
} from "./stockerStore";
import {
	defaultLHMDirectFeedlotLHMStocker,
	defaultHHMDirectFeedlotLHMStocker,
	defaultHHMDirectFeedlotHHMStocker,
	defaultLHMIndirectFeedlotLHMStocker,
	defaultHHMIndirectFeedlotLHMStocker,
	defaultHHMIndirectFeedlotHHMStocker,
	defaultHHMIndirectFeedlotLHMBackgrounder,
} from "./feedlotStore";

const defaultCowInventory: CowInventoryType = {
	numberOfHeifers: 10000000,
	numberOfCows: 20000000,
	heiferAliveThroughPregnancy: 1,
	cowsAliveThroughPregnancy: 1,
	percentCalfCropHeifers: 0.95,
	percentCalfCropCows: 0.95,
	totalNumberCalvesAvailableBeefWeight: 28500000,
	costYoungBornCalf: 170.0,
};

export {
	defaultCowInventory,
	defaultLHMCowCalf,
	defaultHHMCowCalf,
	defaultLHMStockerLHMCowCalf,
	defaultHHMStockerLHMCowCalf,
	defaultHHMStockerHHMCowCalf,
	defaultLHMBackgrounderLHMCowCalf,
	defaultHHMBackgrounderLHMCowCalf,
	defaultHHMBackgrounderHHMCowCalf,
	defaultLHMDirectFeedlotLHMStocker,
	defaultHHMDirectFeedlotLHMStocker,
	defaultHHMDirectFeedlotHHMStocker,
	defaultLHMIndirectFeedlotLHMStocker,
	defaultHHMIndirectFeedlotLHMStocker,
	defaultHHMIndirectFeedlotHHMStocker,
	defaultHHMIndirectFeedlotLHMBackgrounder,
};
