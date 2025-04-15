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
  return (
    <div style={{display: "flex", justifyContent: "center", margin: "auto", padding: "1rem"}}>
      <Simulation
        operationName={"LHM Stocker LHM Cow Calf"}
        numCows={100}
        operationPresets={defaultLHMStockerLHMCowCalf}
      />
      <Simulation
        operationName={"HHM Stocker HHM Cow Calf"}
        numCows={100}
        operationPresets={defaultHHMStockerHHMCowCalf} 
      />
    </div>
  );
};

export default Stocker;
