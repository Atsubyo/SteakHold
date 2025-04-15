import React from "react";
import Simulation from "../simulator/Simulation";
import {
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

const Feedlot = () => {
  return (
    <div style={{display: "flex", justifyContent: "center", margin: "auto", padding: "1rem"}}>
    <Simulation
        operationName={"LHM Direct Feedlot LHM Cow Calf"}
        numCows={100}
        operationPresets={defaultLHMDirectFeedlotLHMStocker}
      />
      <Simulation
        operationName={"HHM Indirect Feedlod HHM Stocker"}
        numCows={100}
        operationPresets={defaultHHMIndirectFeedlotLHMStocker} 
      />
    </div>
  );
};

export default Feedlot;
