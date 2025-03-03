import { useEffect, useState } from "react";
import OperationModel from "./OperationModel";
import { PiCowFill } from "react-icons/pi";

const LHM = [50, 100, 2, 0.001, 100, 130];

const Simulation = () => {
  const [operationModel] = useState(new OperationModel(...LHM));
  const [cows, setCows] = useState([]);
  const [day, setDay] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const startSimulation = () => {
    if (isRunning) return;
    for (let i = 0; i < 100; i++) {
      operationModel.addCow();
    }

    const interval = setInterval(() => {
      operationModel.step();
      setDay((prevDay) => {
        const newDay = prevDay + 1;
        if (newDay >= operationModel.max_days) {
          clearInterval(interval);
          setIsRunning(false);
        }
        return newDay;
      });
      setCows([...operationModel.cows]);
    }, 100);

    setIntervalId(interval);
    setIsRunning(true);
  };

  // Stop the simulation
  const stopSimulation = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIsRunning(false);
    }
  };

  // Reset the simulation
  const resetSimulation = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    operationModel.reset(); // Assuming OperationModel has a reset method to reset the model
    setDay(0);
    setCows([]);
    setIsRunning(false);
  };

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
              width: `${(cow.weight+30)/10}px`,
              height: `${(cow.weight+30)/10}px`,

              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              backgroundColor: cow.isAlive ? "green" : "red", // Green for healthy, red for dead
              borderRadius: "50%",
            }}
          >
            <PiCowFill size={(cow.weight+30)/10} color="white" weight="bold" />
            {/* Optionally: You can add more visual details here */}
          </div>
        ))}
      </div>

      <div>
        <button onClick={startSimulation} disabled={isRunning}>
          Start
        </button>
        <button onClick={stopSimulation} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={resetSimulation} disabled={isRunning}>
          Reset
        </button>
      </div>
      <div>Day: {day}</div>
    </div>
  );
};

export default Simulation;
