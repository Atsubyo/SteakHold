import React from "react";
import Simulation from "@/components/simulator/Simulation";
import {
  defaultLHMCowCalf,
  defaultHHMCowCalf,
} from "@/stores/operationStagePresets";

const CowCalf = () => {
  return (
    <div style={{display: "flex", justifyContent: "center", margin: "auto", padding: "1rem"}}>
      <Simulation
        operationName={"LHM Cow Calf"}
        numCows={100}
        operationPresets={defaultLHMCowCalf}
      />
      <Simulation
        operationName={"HHM Cow Calf"}
        numCows={100}
        operationPresets={defaultHHMCowCalf} 
      />
    </div>
  );
};

export default CowCalf;
