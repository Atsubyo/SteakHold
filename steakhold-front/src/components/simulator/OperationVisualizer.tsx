import React from "react";
import { useState, useCallback, useRef } from "react";
import OperationModel from "./OperationModel";
import { Button, Drawer, Card, Slider, InputNumber, Flex } from "antd";
import { Typography } from "antd";
import  CowAgent from "./CowAgent.js";
const { Title, Paragraph } = Typography;
import styles from "./OperationVisualizer.module.css";

// the current cows + setState
// the current operational model + setState 
// the nextOperation model's setState

// TODO: CHANGE TEMP EXPECTED PROPS
const OperationVisualizer = (props: any) => {
  const { operationModel, setOperationModel, operationName } = props;
  const { type, value, address } = operationModel;

   return (
      <div className={styles.contentCol}>
        <div
          style={{
            position: "relative",
            width: "100px",
            height: "100px",
            border: "1px solid black",
          }}
        >
          {operationModel.cows.map((cow: CowAgent) => (
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
    </div>
  );
}