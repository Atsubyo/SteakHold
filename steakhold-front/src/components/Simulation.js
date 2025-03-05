import { useEffect, useState } from "react";
import OperationModel from "./OperationModel";
import { PiCowFill } from "react-icons/pi";
import { GiCow } from "react-icons/gi";
import { Button } from "antd";
import { Line } from "react-chartjs-2";
import { Chart, registerables, CategoryScale } from "chart.js";
Chart.register(...registerables, CategoryScale);

const Simulation = (props) => {
  const { LHM } = props;
  const operationName = props.operationName || "Low Health Management Cow Calf";
  const [operationModel, setOperationModel] = useState(
    new OperationModel(...LHM)
  );
  const [cows, setCows] = useState([]);
  const [day, setDay] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Cows Alive",
        data: [],
        borderColor: "blue",
        fill: false,
      },
    ],
  });

  const startSimulation = () => {
    if (isRunning) return;

    if (day === 0) {
      for (let i = 0; i < 200; i++) {
        operationModel.addCow();
      }
    }

    if (intervalId) {
      clearInterval(intervalId);
    }

    const interval = setInterval(() => {
      setDay((prevDay) => {
        const newDay = prevDay + 1;
        if (newDay >= operationModel.max_days) {
          clearInterval(interval);
          setIsRunning(false);
        }
        setOperationModel((prevModel) => {
          const newModel = new OperationModel(...LHM);
          Object.assign(newModel, prevModel);
          newModel.step();
          console.log(newDay);
          setCows([...newModel.cows]);
          setChartData((prevData) => ({
            labels: [...prevData.labels, newDay],
            datasets: [
              {
                ...prevData.datasets[0],
                data: [...prevData.datasets[0].data, newModel.cows.length],
              },
            ],
          }));
          return newModel;
        });
        return newDay;
      });
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

  const resetSimulation = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setOperationModel(new OperationModel(...LHM));
    setCows([]);
    setDay(0);
    setIsRunning(false);
    setChartData({
      labels: [],
      datasets: [
        {
          label: "Cows Alive",
          data: [],
          borderColor: "blue",
          fill: false,
        },
      ],
    });
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
              width: `${(cow.weight+30)/10}px`,
              height: `${(cow.weight+30)/10}px`,

              display: "flex",
              justifyContent: "center",
              alignItems: "center",

              // backgroundColor: cow.isAlive ? "green" : "red", // Green for healthy, red for dead
              borderRadius: "50%",
            }}
          >
            {/* <PiCowFill size={(cow.weight+30)/10} color="white" weight="bold" /> */}
            <GiCow size={(cow.weight+30)/10} color={cow.isAlive ? "green" : "red"} weight="bold" />
            {/* Optionally: You can add more visual details here */}
          </div>
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
      <div style={{ width: "600px", margin: "auto", paddingTop: "20px" }}>
        <h3>Cows Alive Over Time</h3>
        <Line
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: { title: { display: true, text: "Days" } },
              y: { title: { display: true, text: "Cows Alive" } },
            },
          }}
        />
      </div>
    </div>
  );
};

export default Simulation;
