/** @format */

import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CoinContext } from "../context/coinContext";
import { LineChart } from "./ui/lineChart";
import Bg from "../assets/img.png";

interface CoinData {
  image: {
    thumb: string;
  };
  name: string;
  symbol: string;
  market_cap_rank: number;
  block_time_in_minutes: number;
  description: {
    en: string;
  };
  links: {
    homepage: [string];
    whitepaper: string;
  };
}

interface HistoricalData {
  prices: [number, number][];
}

const SingleCoin = () => {
  const coinContext = useContext(CoinContext);
  if (!coinContext) {
    throw new Error("Context undefined");
  }

  const { currency } = coinContext;
  const { coinId } = useParams<{ coinId: string }>();

  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData>({
    prices: [],
  });

  const truncateText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

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
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=10`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHistoricalData(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (coinId) {
      fetchCoinData();
      fetchHistoricalData();
    }
  }, [coinId]);

  return (
    <div className="bg-light-backgroundColor dark:bg-dark-backgroundColor h-screen">
      <img src={Bg} alt="something" className="absolute" />
      {coinData && historicalData ? (
        <div className="relative flex flex-col gap-3 px-4 lg:px-24 py-8 w-full font-comfortaa text-black dark:text-white">
          <p className="text-2xl">All about {coinData.name}!</p>
          <hr className="dark:border-white my-4 border-black w-full" />
          <div className="flex lg:flex-row flex-col gap-3 w-full h-full">
            <div className="flex flex-col w-full lg:w-1/2 h-full">
              <div className="flex lg:flex-row flex-col justify-between items-stretch gap-4 w-full h-full">
                <div className="flex-1 border-gray-200 hover:border-white bg-clip-padding bg-gray-400 bg-opacity-10 shadow-lg backdrop-blur-sm backdrop-filter px-5 py-4 border rounded-xl">
                  <p className="font-bold text-2xl">Market Cap Rank:</p>
                  <p className="text-right py-3 font-bold text-2xl">
                    #
                    <span className="text-5xl">{coinData.market_cap_rank}</span>
                  </p>
                </div>
                <div className="flex-1 border-gray-200 hover:border-white bg-clip-padding bg-gray-400 bg-opacity-10 shadow-lg backdrop-blur-sm backdrop-filter px-5 py-4 border rounded-xl">
                  <p className="font-bold text-2xl">Block time in Minutes:</p>
                  <p className="text-right py-3 font-bold text-2xl">
                    <span className="text-5xl">
                      {coinData.block_time_in_minutes}
                    </span>
                    mins
                  </p>
                </div>
                <div className="flex-1 border-gray-200 hover:border-white bg-clip-padding bg-gray-400 bg-opacity-10 shadow-lg backdrop-blur-sm backdrop-filter px-5 py-4 border rounded-xl">
                  <p className="font-bold text-2xl text-left">Crypto Symbol:</p>
                  <div className="flex justify-end items-center space-x-3 py-3">
                    <img
                      src={coinData.image.thumb}
                      alt="sym"
                      className="w-8 h-8"
                    />
                    <span className="font-bold text-5xl">
                      {coinData.symbol.toLocaleUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-1 border-gray-200 hover:border-white bg-clip-padding bg-gray-400 bg-opacity-10 shadow-lg backdrop-blur-sm backdrop-filter my-3 px-5 py-4 border rounded-xl">
                <p>
                  <span className="font-bold text-lg">Name: </span>
                  <span>{coinData.name}</span>
                </p>
                <p>
                  <span className="font-bold text-lg">Desc: </span>
                  <span>
                    {truncateText(coinData.description.en.toString(), 300)}
                  </span>
                  <Link to={coinData.links.homepage[0]}>read more</Link>
                </p>
                <div className="flex items-center gap-2 my-3">
                  <span className="font-bold text-lg">Links: </span>
                  <Link to={coinData.links.whitepaper} target="_blank">
                    <p> Checkout {coinData.name}'s Whitepaper </p>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex-1 border-gray-200 hover:border-white bg-clip-padding bg-gray-400 bg-opacity-10 shadow-lg backdrop-blur-sm backdrop-filter px-5 py-1 border rounded-xl">
              <LineChart historicalData={historicalData} />
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SingleCoin;
