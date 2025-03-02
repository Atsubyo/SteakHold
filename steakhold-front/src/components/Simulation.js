import { useEffect, useState } from "react";
import OperationModel from "./OperationModel";
import { PiCowFill } from "react-icons/pi";

const LHM = [50, 100, 2, 0.001, 100, 130];

const Simulation = () => {
  const [operationModel] = useState(new OperationModel(...LHM));
  const [cows, setCows] = useState([]);
  const [day, setDay] = useState(0);

  useEffect(() => {
    for (let i = 0; i < 100; i++) {
      operationModel.addCow();
    }
    const interval = setInterval(() => {
      operationModel.step();
      setDay((prevDay) => {
        const newDay = prevDay + 1;
        if (newDay >= operationModel.max_days) {
          clearInterval(interval);
        }
        return newDay;
      });
      setCows([...operationModel.cows]);
    }, 100);

    return () => clearInterval(interval);
  }, []);

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
              width: "${(cow.weight+10)/10}px",
              height: "${(cow.weight+10)/10}px",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              backgroundColor: cow.health > 0 ? "green" : "red", // Green for healthy, red for dead
              borderRadius: "50%",
            }}
          >
            <PiCowFill size={(cow.weight+10)/10} color="white" weight="bold" />
            {/* Optionally: You can add more visual details here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Simulation;
