import { useEffect, useState } from "react";
import OperationModel from "./OperationModel";

const Simulation = () => {
  const [operationModel] = useState(new OperationModel());
  const [cows, setCows] = useState([]);

  useEffect(() => {
    // Add cows to the farm when component mounts
    for (let i = 0; i < 5; i++) {
      operationModel.addCow();
    }

    const interval = setInterval(() => {
      operationModel.step(); // Simulate the farm model
      setCows([...operationModel.cows]); // Update cows state
    }, 1000); // Update farm every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [operationModel]);

  return (
    <div>
      <h2>Farm Visualizer</h2>
      <div
        style={{
          position: "relative",
          width: "500px",
          height: "500px",
          border: "1px solid black",
        }}
      >
        {cows.map((cow) => (
          <div
            key={cow.id}
            style={{
              position: "absolute",
              top: `${cow.location.y}%`,
              left: `${cow.location.x}%`,
              width: "10px",
              height: "10px",
              backgroundColor: cow.health > 0 ? "green" : "red", // Green for healthy, red for dead
              borderRadius: "50%",
            }}
          >
            {/* Optionally: You can add more visual details here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Simulation;
