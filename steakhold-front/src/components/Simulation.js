import { useEffect, useState } from "react";
import OperationModel from "./OperationModel";
import { Button } from "antd";

const LHM = [50, 100, 2, 0.001, 100, 130];

const Simulation = (props) => {
  const operationName = props.operationName || "Low Health Management Cow Calf";
  const [operationModel, setOperationModel] = useState(
    new OperationModel(...LHM)
  );
  const [cows, setCows] = useState([]);
  const [day, setDay] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const startSimulation = () => {
    if (isRunning) return;
    if (day === 0) {
      for (let i = 0; i < 100; i++) {
        operationModel.addCow();
      }
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
    setOperationModel(new OperationModel(...LHM));
    setCows([]);
    setDay(0);
    setIsRunning(false);
  };

  return (
    <div>
      <h2>{operationName} Operation Visualizer</h2>
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
          ></div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          columnGap: "16px",
          padding: "16px",
        }}
      >
        <Button onClick={startSimulation} disabled={isRunning}>
          Start
        </Button>
        <Button onClick={stopSimulation} disabled={!isRunning}>
          Pause
        </Button>
        <Button onClick={resetSimulation} disabled={isRunning}>
          Reset
        </Button>
      </div>
      <p>Day: {day}</p>
    </div>
  );
};

export default Simulation;
