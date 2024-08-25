/** @format */

import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CoinContext } from "../context/coinContext";
import { LineChart } from "./ui/lineChart";

interface CoinData {
  image: {
    large: string;
  };
  name: string;
  symbol: string;
}

const SingleCoin = () => {
  const coinContext = useContext(CoinContext);
  if (!coinContext) {
    throw new Error("Context undefined");
  }

  const { currency } = coinContext;
  const { coinId } = useParams<{ coinId: string }>();

  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [historicalData, setHistoricalData] = useState({});

  const fetchCoinData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-39jigAWXdmoZB63GNKTsjTWE",
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        options
      );
      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      console.error("Failed to fetch coin data:", err);
    }
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-39jigAWXdmoZB63GNKTsjTWE	",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=10`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHistoricalData(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (coinId) {
      fetchCoinData();
    }
  }, [coinId]);

  return (
    <>
      {coinData && historicalData ? (
        <div>
          <h2>Coin data: {coinId}</h2>
          <img src={coinData.image.large} alt={coinData.name} />
          <p>{coinData.name}</p>
          <p>{coinData.symbol}</p>
          <div></div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default SingleCoin;
