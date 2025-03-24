import React, { useEffect } from "react";
import { useState, useCallback, useRef } from "react";
import OperationModel from "./OperationModel.js";
import { Button, Drawer, Card, Slider, InputNumber, Flex } from "antd";
import styles from "./Simulation.module.css";
import CowIcon from "./CowIcon.tsx";

const COW_CALF = "cow_calf";
const STOCKER = "stocker";
const FEEDLOT = "feedlot";

// TODO: CHANGE TEMP EXPECTED PROPS
const OperationVisualizer = (props) => {
  const {
    operationModel, // type OperationModel,
    setOperationModel, // useState setter
    setNextOperationalModel, // useState setter
    operationStageName, // string
    operationName, // string
    isRunning, // boolean
    isFinished, // boolean
  } = props;

  const [intervalId, setIntervalId] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const initialized = useRef(false);
  const [configInputs, setConfigInputs] = useState({
    initial_weight: operationModel.initial_weight,
    num_cows: operationModel.num_cows,
    growth_rate: operationModel.growth_rate,
    death_rate: operationModel.death_rate,
    max_days: operationModel.max_days,
    sale_price: operationModel.sale_price,
  });

  useEffect(() => {
    if (isFinished || !isRunning) {
      stopSimulation();
    }
    if (isRunning) {
      startSimulation();
    }
  }, [isRunning, isFinished]);

  const startSimulation = () => {
    const interval = setInterval(() => {
      stepSimulation(interval);
    }, 100);
    setIntervalId(interval);
  };
  const stepSimulation = () => {
    if (operationStageName === COW_CALF && !initialized.current) {
      for (let i = 0; i < configInputs.num_cows; i++) {
        operationModel.addCow();
      }
      initialized.current = true;
    }
    setOperationModel((prevModel) => {
      const newModel = new OperationModel(
        configInputs.initial_weight,
        configInputs.num_cows,
        configInputs.growth_rate,
        configInputs.death_rate,
        configInputs.max_days,
        configInputs.sale_price
      );
      Object.assign(newModel, prevModel);
      let transferredCows = newModel.step();
      if (transferredCows.length > 0 && operationStageName !== FEEDLOT) {
        setNextOperationalModel((prevNextModel) => {
          const newNextModel = new OperationModel(
            configInputs.initial_weight,
            configInputs.num_cows,
            configInputs.growth_rate,
            configInputs.death_rate,
            configInputs.max_days,
            configInputs.sale_price
          );
          Object.assign(newNextModel, prevNextModel);
          transferredCows.forEach((cow) => {
            newNextModel.addCow(cow);
          });
          return newNextModel;
        });
      }
      return newModel;
    });
  };
  const stopSimulation = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
  };
  const resetSimulation = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    setOperationModel(
      new OperationModel(
        configInputs.initial_weight,
        configInputs.num_cows,
        configInputs.growth_rate,
        configInputs.death_rate,
        configInputs.max_days,
        configInputs.sale_price
      )
    );
    initialized.current = false;
  };

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
    initial_weightMin: 50,
    initial_weightMax: 1200,
    num_cowsMin: 10,
    num_cowsMax: 500,
    growth_rateMin: 0.01,
    growth_rateMax: 4.0,
    death_rateMin: 0.0,
    death_rateMax: 1.0,
    max_daysMin: 1,
    max_daysMax: 365,
    sale_priceMin: 50,
    sale_priceMax: 500,
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
      <div
        style={{
          position: "relative",
          width: "400px",
          height: "400px",
          border: "1px solid black",
        }}
      >
        {operationModel.cows.map((cow) => (
          <CowIcon key={cow.id} cow={cow} />
        ))}
        <div
          style={{
            position: "absolute",
            top: `${0}%`,
            left: `${0}%`,
          }}
        >
          <Button onClick={onDrawerOpen} disabled={isRunning}>
            Configure Simulation
          </Button>
        </div>
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
              min={operationInputsRange.initial_weightMin}
              max={operationInputsRange.initial_weightMax}
              value={configInputs.initial_weight}
              step={0.5}
              marks={{
                [operationInputsRange.initial_weightMin]: `${operationInputsRange.initial_weightMin}lbs`,
                [operationInputsRange.initial_weightMax]: `${operationInputsRange.initial_weightMax}lbs`,
              }}
              onChange={handleSliderChange("initial_weight")}
            />
            <InputNumber
              min={operationInputsRange.initial_weightMin}
              max={operationInputsRange.initial_weightMax}
              style={{ margin: "0 16px" }}
              value={configInputs.initial_weight}
              step={0.01}
              onChange={handleSliderChange("initial_weight")}
            />
          </Card>
          <Card title="Number of Cows" variant="borderless">
            <Slider
              min={operationInputsRange.num_cowsMin}
              max={operationInputsRange.num_cowsMax}
              value={configInputs.num_cows}
              marks={{
                [operationInputsRange.num_cowsMin]: `${operationInputsRange.num_cowsMin} Cows`,
                [operationInputsRange.num_cowsMax]: `${operationInputsRange.num_cowsMax} Cows`,
              }}
              onChange={handleSliderChange("num_cows")}
            />
            <InputNumber
              min={operationInputsRange.num_cowsMin}
              max={operationInputsRange.num_cowsMax}
              style={{ margin: "0 16px" }}
              value={configInputs.num_cows}
              onChange={handleSliderChange("num_cows")}
            />
          </Card>
          <Card
            title="Growth Rate (Average Daily Gains [ADG])"
            variant="borderless"
          >
            <Slider
              min={operationInputsRange.growth_rateMin}
              max={operationInputsRange.growth_rateMax}
              value={configInputs.growth_rate}
              step={0.01}
              marks={{
                [operationInputsRange.growth_rateMin]: `${operationInputsRange.growth_rateMin} ADG`,
                [operationInputsRange.growth_rateMax]: `${operationInputsRange.growth_rateMax} ADG`,
              }}
              onChange={handleSliderChange("growth_rate")}
            />
            <InputNumber
              min={operationInputsRange.growth_rateMin}
              max={operationInputsRange.growth_rateMax}
              style={{ margin: "0 16px" }}
              value={configInputs.growth_rate}
              step={0.01}
              onChange={handleSliderChange("growth_rate")}
            />
          </Card>
          <Card title="Death Loss (%)" variant="borderless">
            <Slider
              min={operationInputsRange.death_rateMin}
              max={operationInputsRange.death_rateMax}
              value={configInputs.death_rate}
              step={0.01}
              marks={{
                [operationInputsRange.death_rateMin]: `${operationInputsRange.death_rateMin}%`,
                [operationInputsRange.death_rateMax]: `${operationInputsRange.death_rateMax}%`,
              }}
              onChange={handleSliderChange("death_rate")}
            />
            <InputNumber
              min={operationInputsRange.death_rateMin}
              max={operationInputsRange.death_rateMax}
              style={{ margin: "0 16px" }}
              value={configInputs.death_rate}
              step={0.01}
              onChange={handleSliderChange("death_rate")}
            />
          </Card>
          <Card title="Max Days" variant="borderless">
            <Slider
              min={operationInputsRange.max_daysMin}
              max={operationInputsRange.max_daysMax}
              value={configInputs.max_days}
              marks={{
                [operationInputsRange.max_daysMin]: `${operationInputsRange.max_daysMin} Days`,
                [operationInputsRange.max_daysMax]: `${operationInputsRange.max_daysMax} Days`,
              }}
              onChange={handleSliderChange("max_days")}
            />
            <InputNumber
              min={operationInputsRange.max_daysMin}
              max={operationInputsRange.max_daysMax}
              style={{ margin: "0 16px" }}
              value={configInputs.max_days}
              onChange={handleSliderChange("max_days")}
            />
          </Card>
          <Card title="Sale Price ($)" variant="borderless">
            <Slider
              min={operationInputsRange.sale_priceMin}
              max={operationInputsRange.sale_priceMax}
              value={configInputs.sale_price}
              step={0.01}
              marks={{
                [operationInputsRange.sale_priceMin]: `$${operationInputsRange.sale_priceMin}`,
                [operationInputsRange.sale_priceMax]: `$${operationInputsRange.sale_priceMax}`,
              }}
              onChange={handleSliderChange("sale_price")}
            />
            <InputNumber
              min={operationInputsRange.sale_priceMin}
              max={operationInputsRange.sale_priceMax}
              style={{ margin: "0 16px" }}
              value={configInputs.sale_price}
              step={0.01}
              onChange={handleSliderChange("sale_price")}
            />
          </Card>
        </Flex>
      </Drawer>
    </div>
  );
};

export default OperationVisualizer;
