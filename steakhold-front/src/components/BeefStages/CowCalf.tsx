import React from "react";
import Simulation from "@/components/simulator/Simulation";

const CowCalf = () => {
  return (
    <div style={{display: "flex", justifyContent: "center", margin: "auto", padding: "1rem"}}>
      <Simulation
        operationName={"Cow Calf"}
        initialWeight={50}
        numCows={100}
        growthRate={2}
        deathLoss={0.03}
        maxDays={200}
        salePrice={130}
      />
      <Simulation
        operationName={"Cow Calf"}
        initialWeight={100}
        numCows={100}
        growthRate={2.2}
        deathLoss={0.01}
        maxDays={200}
        salePrice={130}
      />
    </div>
  );
};

export default CowCalf;
