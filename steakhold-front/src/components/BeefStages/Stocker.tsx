import React from "react";
import Simulation from "../simulator/Simulation";

const Stocker = () => {
  return (
    <div style={{display: "flex", justifyContent: "center", margin: "auto", padding: "1rem"}}>
      <Simulation
        operationName={"Stocker"}
        initialWeight={50}
        numCows={100}
        growthRate={2}
        deathLoss={0.03}
        maxDays={200}
        salePrice={130}
      />
      <Simulation
        operationName={"Stocker"}
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

export default Stocker;
