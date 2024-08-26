/** @format */

import React, { useEffect, useState } from "react";
import Chart from "react-google-charts";

interface LineChartProps {
  historicalData: {
    prices: [number, number][];
  };
}

export const LineChart: React.FC<LineChartProps> = ({ historicalData }) => {
  const [data, setData] = useState<[string, number][]>([["Date", 0]]);

  useEffect(() => {
    const datacopy: [string, number][] = [["Date", 0]];
    if (historicalData.prices) {
      historicalData.prices.forEach((item) => {
        datacopy.push([new Date(item[0]).toLocaleDateString(), item[1]]);
      });
      setData(datacopy);
    }
  }, [historicalData]);

  return <Chart chartType="LineChart" data={data} height={"100px"} />;
};
