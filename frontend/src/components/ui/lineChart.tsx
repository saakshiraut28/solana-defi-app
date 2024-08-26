/** @format */

import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface LineChartProps {
  historicalData: {
    prices: [number, number][];
  };
}

export const LineChart: React.FC<LineChartProps> = ({ historicalData }) => {
  const [data, setData] = useState<any[]>([
    [
      { type: "date", label: "Date" },
      { type: "number", label: "Price" },
    ],
    [new Date(), 0],
  ]);

  useEffect(() => {
    if (
      historicalData &&
      historicalData.prices &&
      historicalData.prices.length > 0
    ) {
      const formattedData = [
        [
          { type: "date", label: "Date" },
          { type: "number", label: "Price" },
        ],
        ...historicalData.prices.map((item) => [new Date(item[0]), item[1]]),
      ];
      setData(formattedData);
    }
  }, [historicalData]);

  return (
    <Chart
      chartType="LineChart"
      width="100%"
      height="400px"
      data={data}
      options={{
        hAxis: {
          title: "Date",
          format: "MMM dd, yyyy",
        },
        vAxis: {
          title: "Price",
        },
        legend: "none",
        lineWidth: 2,
        colors: ["#3b82f6"],
      }}
    />
  );
};
