import { useState, useCallback, useRef } from "react";
import OperationModel from "./OperationModel";
import { Button, Drawer, Card, Slider, InputNumber, Flex } from "antd";
import { Line } from "react-chartjs-2";
import { Chart, registerables, CategoryScale } from "chart.js";
import SimulationResultsTable from "./SimulationResultsTable";
Chart.register(...registerables, CategoryScale);
import styles from "./Simulation.module.css";
import { Typography } from "antd";
const { Title, Paragraph } = Typography;

const useDebouncedCallback = (callback, delay) => {
  const timeoutRef = useRef(null);

  return useCallback(
    (...args) => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
};

const drawerStyle = {
  backgroundColor: "#fff7ea",
};

const initialChartData = [
  {
    labels: [],
    datasets: [
      {
        label: "Cows Alive",
        data: [],
        borderColor: "blue",
        fill: false,
      },
    ],
  },
  {
    labels: [],
    datasets: [
      {
        label: "Profit",
        data: [],
        borderColor: "green",
        fill: false,
      },
      {
        label: "Expenses",
        data: [],
        borderColor: "yellow",
        fill: false,
      },
    ],
  },
];

const Simulation = (props) => {
  const LHM = [
    props.initialWeight,
    props.numCows,
    props.growthRate,
    props.deathLoss,
    props.maxDays,
    props.salePrice,
  ];
  const [configInputs, setConfigInputs] = useState({
    initialWeight: props.initialWeight,
    numCows: props.numCows,
    growthRate: props.growthRate,
    deathLoss: props.deathLoss,
    maxDays: props.maxDays,
    salePrice: props.salePrice,
  });
  const operationName = props.operationName || "Low Health Management Cow Calf";
  const [operationModel, setOperationModel] = useState(
    new OperationModel(...LHM)
  );
  const [cows, setCows] = useState([]);
  const [day, setDay] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [chartData, setChartData] = useState(initialChartData);
  const [openDrawer, setOpenDrawer] = useState(false);
  const initialized = useRef(false);

  const sum = (arr) => arr.reduce((acc, val) => acc + val, 0);
  const startSimulation = () => {
    if (isRunning) return;
    const interval = setInterval(() => {
      stepSimulation(interval);
    }, 100);

    setIntervalId(interval);
    setIsRunning(true);
  };
  const stepSimulation = (currentIntervalId = null) => {
    if (day === 0 && !initialized.current) {
      console.log(`On day ${day}`);
      for (let i = 0; i < configInputs.numCows; i++) {
        console.log(`Adding cow: #${i}`);
        operationModel.addCow();
      }
      initialized.current = true;
    }

    setDay((prevDay) => {
      const newDay = prevDay + 1;
      if (newDay >= operationModel.max_days) {
        if (currentIntervalId) clearInterval(currentIntervalId);
        stopSimulation();
        setIsFinished(true);
      }

      setOperationModel((prevModel) => {
        const newModel = new OperationModel(
          configInputs.initialWeight,
          configInputs.numCows,
          configInputs.growthRate,
          configInputs.deathLoss,
          configInputs.maxDays,
          configInputs.salePrice
        );
        Object.assign(newModel, prevModel);
        newModel.step();
        setCows([...newModel.cows]);
        setChartData((prevData) => {
          return [
            {
              labels: [...prevData[0].labels, newDay],
              datasets: [
                {
                  label: "Cows Alive",
                  data: [...prevData[0].datasets[0].data, newModel.cows.length],
                  borderColor: "blue",
                  fill: false,
                },
              ],
            },
            {
              labels: [...prevData[1].labels, newDay],
              datasets: [
                {
                  label: "Profit",
                  data: [
                    ...prevData[1].datasets[0].data,
                    (configInputs.salePrice *
                      sum(newModel.cows.map((cow) => cow.weight))) /
                      100,
                  ],
                  borderColor: "green",
                  fill: false,
                },
                {
                  label: "Expenses",
                  data: [
                    ...prevData[1].datasets[1].data,
                    (prevData[1].datasets[1].data.length > 0
                      ? prevData[1].datasets[1].data.at(-1)
                      : 0) + newModel.cows.length,
                  ],
                  borderColor: "yellow",
                  fill: false,
                },
              ],
            },
          ];
        });
        return newModel;
      });
      return newDay;
    });
  };
  const stopSimulation = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setIsRunning(false);
  };
  const resetSimulation = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIsFinished(false);
    }
    setOperationModel(
      new OperationModel(
        configInputs.initialWeight,
        configInputs.numCows,
        configInputs.growthRate,
        configInputs.deathLoss,
        configInputs.maxDays,
        configInputs.salePrice
      )
    );
    setCows([]);
    setDay(0);
    setIsRunning(false);
    setChartData(initialChartData);
  };

  const debouncedUpdate = useDebouncedCallback((slider, value) => {
    setConfigInputs((state) => ({
      ...state,
      [slider]: value,
    }));
  }, 0);
  const handleSliderChange = (slider) => (value) => {
    debouncedUpdate(slider, value);
  };
  const operationInputsRange = {
    initialWeightMin: 50,
    initialWeightMax: 1200,
    numCowsMin: 10,
    numCowsMax: 500,
    growthRateMin: 0.01,
    growthRateMax: 4.0,
    deathLossMin: 0.0,
    deathLossMax: 1.0,
    maxDaysMin: 1,
    maxDaysMax: 365,
    salePriceMin: 50,
    salePriceMax: 500,
  };
  const onDrawerClose = () => {
    setOpenDrawer(false);
    resetSimulation();
  };
  const onDrawerOpen = () => {
    setOpenDrawer(true);
    stopSimulation();
  };

  return (
    <div className={styles.contentCol}>
      <div>
        <Title level={3} style={{ marginBottom: 4 }}>
          {operationName} Operation Visualizer
        </Title>
        <Paragraph>Day - {day}</Paragraph>
      </div>
      <div
        style={{
          position: "relative",
          width: "500px",
          height: "500px",
          border: "1px solid black",
          borderRadius: "10px",
        }}
      >
        {cows.map((cow) => (
          <div
            key={cow.id}
            style={{
              position: "absolute",
              top: `${cow.location.y}%`,
              left: `${cow.location.x}%`,
              width: `${cow.weight / 25}px`,
              height: `${cow.weight / 25}px`,
              borderRadius: "50%",
              backgroundColor: "brown",
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
        <Button onClick={startSimulation} disabled={isRunning || isFinished}>
          Start
        </Button>
        <Button onClick={stepSimulation} disabled={isRunning || isFinished}>
          Step
        </Button>
        <Button onClick={stopSimulation} disabled={!isRunning}>
          Pause
        </Button>
        <Button onClick={resetSimulation} disabled={isRunning}>
          Reset
        </Button>
        <Button onClick={onDrawerOpen}>Configure Simulation</Button>
      </div>
      <SimulationResultsTable
        isFinished={isFinished}
        isRunning={isRunning}
        cows={cows}
        chartData={chartData}
        operationName={operationName}
        configInputs={configInputs}
      />
      <div style={{ width: "600px" }}>
        <h3>Cows Alive Over Time</h3>
        <Line
          data={chartData[0]}
          options={{
            responsive: true,
            scales: {
              x: { title: { display: true, text: "Days" } },
              y: { title: { display: true, text: "Cows Alive" } },
            },
          }}
        />
      </div>
      <div style={{ width: "600px" }}>
        <h3>Profit Over Time</h3>
        <Line
          data={chartData[1]}
          options={{
            responsive: true,
            scales: {
              x: { title: { display: true, text: "Days" } },
              y: {
                title: { display: true, text: "USD" },
                position: "left",
              },
            },
          }}
        />
      </div>
      <Drawer
        title="Simulation Configs"
        placement="left"
        width={500}
        onClose={onDrawerClose}
        open={openDrawer}
        style={drawerStyle}
      >
        <Flex gap={20} vertical>
          <Card title="Initial Weight (Pounds [lbs])" variant="borderless">
            <Slider
              min={operationInputsRange.initialWeightMin}
              max={operationInputsRange.initialWeightMax}
              value={configInputs.initialWeight}
              step={0.5}
              marks={{
                [operationInputsRange.initialWeightMin]: `${operationInputsRange.initialWeightMin}lbs`,
                [operationInputsRange.initialWeightMax]: `${operationInputsRange.initialWeightMax}lbs`,
              }}
              onChange={handleSliderChange("initialWeight")}
            />
            <InputNumber
              min={operationInputsRange.initialWeightMin}
              max={operationInputsRange.initialWeightMax}
              style={{ margin: "0 16px" }}
              value={configInputs.initialWeight}
              step={0.01}
              onChange={handleSliderChange("initialWeight")}
            />
          </Card>
          <Card title="Number of Cows" variant="borderless">
            <Slider
              min={operationInputsRange.numCowsMin}
              max={operationInputsRange.numCowsMax}
              value={configInputs.numCows}
              marks={{
                [operationInputsRange.numCowsMin]: `${operationInputsRange.numCowsMin} Cows`,
                [operationInputsRange.numCowsMax]: `${operationInputsRange.numCowsMax} Cows`,
              }}
              onChange={handleSliderChange("numCows")}
            />
            <InputNumber
              min={operationInputsRange.numCowsMin}
              max={operationInputsRange.numCowsMax}
              style={{ margin: "0 16px" }}
              value={configInputs.numCows}
              onChange={handleSliderChange("numCows")}
            />
          </Card>
          <Card
            title="Growth Rate (Average Daily Gains [ADG])"
            variant="borderless"
          >
            <Slider
              min={operationInputsRange.growthRateMin}
              max={operationInputsRange.growthRateMax}
              value={configInputs.growthRate}
              step={0.01}
              marks={{
                [operationInputsRange.growthRateMin]: `${operationInputsRange.growthRateMin} ADG`,
                [operationInputsRange.growthRateMax]: `${operationInputsRange.growthRateMax} ADG`,
              }}
              onChange={handleSliderChange("growthRate")}
            />
            <InputNumber
              min={operationInputsRange.growthRateMin}
              max={operationInputsRange.growthRateMax}
              style={{ margin: "0 16px" }}
              value={configInputs.growthRate}
              step={0.01}
              onChange={handleSliderChange("growthRate")}
            />
          </Card>
          <Card title="Death Loss (%)" variant="borderless">
            <Slider
              min={operationInputsRange.deathLossMin}
              max={operationInputsRange.deathLossMax}
              value={configInputs.deathLoss}
              step={0.01}
              marks={{
                [operationInputsRange.deathLossMin]: `${operationInputsRange.deathLossMin}%`,
                [operationInputsRange.deathLossMax]: `${operationInputsRange.deathLossMax}%`,
              }}
              onChange={handleSliderChange("deathLoss")}
            />
            <InputNumber
              min={operationInputsRange.deathLossMin}
              max={operationInputsRange.deathLossMax}
              style={{ margin: "0 16px" }}
              value={configInputs.deathLoss}
              step={0.01}
              onChange={handleSliderChange("deathLoss")}
            />
          </Card>
          <Card title="Max Days" variant="borderless">
            <Slider
              min={operationInputsRange.maxDaysMin}
              max={operationInputsRange.maxDaysMax}
              value={configInputs.maxDays}
              marks={{
                [operationInputsRange.maxDaysMin]: `${operationInputsRange.maxDaysMin} Days`,
                [operationInputsRange.maxDaysMax]: `${operationInputsRange.maxDaysMax} Days`,
              }}
              onChange={handleSliderChange("maxDays")}
            />
            <InputNumber
              min={operationInputsRange.maxDaysMin}
              max={operationInputsRange.maxDaysMax}
              style={{ margin: "0 16px" }}
              value={configInputs.maxDays}
              onChange={handleSliderChange("maxDays")}
            />
          </Card>
          <Card title="Sale Price ($)" variant="borderless">
            <Slider
              min={operationInputsRange.salePriceMin}
              max={operationInputsRange.salePriceMax}
              value={configInputs.salePrice}
              step={0.01}
              marks={{
                [operationInputsRange.salePriceMin]: `$${operationInputsRange.salePriceMin}`,
                [operationInputsRange.salePriceMax]: `$${operationInputsRange.salePriceMax}`,
              }}
              onChange={handleSliderChange("salePrice")}
            />
            <InputNumber
              min={operationInputsRange.salePriceMin}
              max={operationInputsRange.salePriceMax}
              style={{ margin: "0 16px" }}
              value={configInputs.salePrice}
              step={0.01}
              onChange={handleSliderChange("salePrice")}
            />
          </Card>
        </Flex>
      </Drawer>
    </div>
  );
};

export default Simulation;
