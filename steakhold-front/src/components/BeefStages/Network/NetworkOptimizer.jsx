import {
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
  defaultLHMIndirectFeedlotLHMBackgrounder,
  defaultHHMIndirectFeedlotLHMBackgrounder,
  defaultHHMIndirectFeedlotHHMBackgrounder,
} from "@/stores/operationStagePresets";

import OperationModel from "@/components/simulator/OperationModel.js";
import React, { useState } from "react";

const presets = [
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
  defaultLHMIndirectFeedlotLHMBackgrounder,
  defaultHHMIndirectFeedlotLHMBackgrounder,
  defaultHHMIndirectFeedlotHHMBackgrounder,
];

const NetworkOptimizer = () => {
  const [operationModels, setOperationModels] = useState(
    presets.map((preset) => new OperationModel(...preset))
  );

  return (
    <div>
      <h1>Network Optimizer</h1>
      <ul>
        {operationModels.map((model, index) => (
          <li key={index}>
            {model.num_cows} cows, {model.max_days} days, sale $
            {model.sale_price}, growth/day {model.growth_rate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NetworkOptimizer;
