import React, { useMemo } from "react";
import { Table, Skeleton, Typography, Divider, Card } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const SimulationResultsTable = ({
  isRunning,
  isFinished,
  cows,
  chartData,
  configInputs,
  operationName,
}) => {
  const statistics = useMemo(() => {
    if (!isFinished || cows.length === 0) return null;

    const totalCows = configInputs.numCows;
    const survivingCows = cows.length;
    const avgWeight =
      cows.reduce((sum, cow) => sum + cow.weight, 0) / survivingCows;

    const finalProfit = chartData[1].datasets[0].data.slice(-1)[0] || 0;
    const finalExpenses = chartData[1].datasets[1].data.slice(-1)[0] || 0;
    const netProfit = finalProfit - finalExpenses;

    return {
      herdStats: [
        { key: "1", metric: "Starting Herd Size", value: totalCows },
        { key: "2", metric: "Surviving Cows", value: survivingCows },
        {
          key: "3",
          metric: "Survival Rate",
          value: `${((survivingCows / totalCows) * 100).toFixed(1)}%`,
        },
        {
          key: "4",
          metric: "Average Final Weight",
          value: `${avgWeight.toFixed(1)} lbs`,
        },
      ],
      economics: [
        {
          key: "1",
          metric: "Gross Revenue",
          value: `$${finalProfit.toFixed(2)}`,
        },
        {
          key: "2",
          metric: "Total Expenses",
          value: `$${finalExpenses.toFixed(2)}`,
        },
        { key: "3", metric: "Net Profit", value: `$${netProfit.toFixed(2)}` },
        {
          key: "4",
          metric: "Profit per Starting Cow",
          value: `$${(netProfit / totalCows).toFixed(2)}`,
        },
        {
          key: "5",
          metric: "Profit per Surviving Cow",
          value: `$${(netProfit / survivingCows).toFixed(2)}`,
        },
      ],
    };
  }, [isFinished, cows, chartData, configInputs]);

  const columns = [
    { title: "Metric", dataIndex: "metric", key: "metric" },
    { title: "Value", dataIndex: "value", key: "value" },
  ];

  // Card title based on simulation state
  const cardTitle = isRunning
    ? "Simulation in Progress"
    : isFinished
    ? `${operationName} Simulation Results`
    : "Simulation Results";

  // Card content based on simulation state
  const renderCardContent = () => {
    if (isRunning) {
      return (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <LoadingOutlined style={{ fontSize: 36, marginBottom: 16 }} spin />
          <Skeleton active paragraph={{ rows: 6 }} />
          <Text type="secondary">Processing simulation data...</Text>
        </div>
      );
    }

    if (!isFinished) {
      return (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <Text>
            Complete the simulation to view final results and statistics.
          </Text>
        </div>
      );
    }

    return (
      <>
        <Title level={4}>Herd Statistics</Title>
        <Table
          dataSource={statistics?.herdStats}
          columns={columns}
          pagination={false}
          size="small"
          bordered
        />

        <Divider />

        <Title level={4}>Economic Analysis</Title>
        <Table
          dataSource={statistics?.economics}
          columns={columns}
          pagination={false}
          size="small"
          bordered
        />
      </>
    );
  };

  return (
    <Card
      title={cardTitle}
      style={{ width: "100%", marginTop: 32 }}
      variant="outlined"
    >
      {renderCardContent()}
    </Card>
  );
};

export default SimulationResultsTable;
