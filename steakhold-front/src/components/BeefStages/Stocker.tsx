import React from "react";
import Simulation from "../simulator/Simulation";
import {
  defaultLHMStockerLHMCowCalf,
  defaultHHMStockerLHMCowCalf,
  defaultHHMStockerHHMCowCalf,
  defaultLHMBackgrounderLHMCowCalf,
  defaultHHMBackgrounderLHMCowCalf,
  defaultHHMBackgrounderHHMCowCalf,
} from "@/stores/operationStagePresets";

const Stocker = () => {
  const presets = [
    defaultLHMStockerLHMCowCalf,
    defaultHHMStockerLHMCowCalf,
    defaultHHMStockerHHMCowCalf,
    defaultLHMBackgrounderLHMCowCalf,
    defaultHHMBackgrounderLHMCowCalf,
    defaultHHMBackgrounderHHMCowCalf,
  ]
  return (
    <div style={{display: "flex", justifyContent: "center", margin: "auto", padding: "1rem"}}>
      <Simulation
        operationName={"LHM Stocker LHM Cow Calf"}
        numCows={100}
        operationPresets={presets[0]}
      />
      <Simulation
        operationName={"HHM Stocker HHM Cow Calf"}
        numCows={100}
        operationPresets={presets[2]}
      />
    </div>
  );
};

export default Stocker;
