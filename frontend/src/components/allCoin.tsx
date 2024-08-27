/** @format */

import { useContext, useEffect, useState } from "react";
import { CoinContext } from "../context/coinContext";
import { Link } from "react-router-dom";
import Bg from "../assets/img.png";
function AllCoins() {
  const coinContext = useContext(CoinContext);
  if (!coinContext) {
    throw new Error("CoinContext must be used within a CoinContextProvider");
  }

  const [loading, setLoading] = useState<boolean>(true);
  const { allCoin, currency } = coinContext;
  const [displayCoin, setDisplayCoin] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value === "") {
      setDisplayCoin(allCoin);
    }
  };

  const searchHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const coins = allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    });
    setDisplayCoin(coins);
  };
  useEffect(() => {
    if (Array.isArray(allCoin)) {
      setDisplayCoin(allCoin);
    } else {
      console.error("Expected allCoin to be an array, but got:", allCoin);
      setDisplayCoin([]); // Fallback to an empty array
    }
  }, [allCoin]);

  if (allCoin) {
    return (
      <div className="bg-light-backgroundColor dark:bg-dark-backgroundColor w-full font-comfortaa text-black dark:text-white">
        <div className="absolute">
          <img src={Bg} alt="something" />
        </div>
        <div className="relative flex flex-col justify-center items-center py-4 w-full">
          <p className="py-1 font-bold text-2xl">Welcome to Defi 🥰</p>
          <p className="py-1 w-1/3 font-medium text-center text-lg">
            An application that provides robust features for wallet
            connectivity, token swapping, and real-time visualization of
            cryptocurrency prices
          </p>
          <p className="py-4">
            Thanks to{" "}
            <Link to={"https://www.coingecko.com/"} className="hover:underline">
              @Coingecko_API
            </Link>
          </p>
          <form
            onSubmit={searchHandler}
            className="border-1 dark:border-white my-8 px-4 border border-black rounded-full"
          >
            <input
              required
              value={input}
              onChange={inputHandler}
              type="text"
              placeholder="Search Coin/Token"
              className="bg-light-backgroundColor dark:bg-dark-backgroundColor py-2 text-md outline-none"
            />
            <button
              type="submit"
              className="bg-transparent hover:outline-none border-none hover:border-none w-fit outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </form>
          <div className="mx-2 lg:mx-8 px-4 py-4">
            <table className="border-gray-300 border min-w-full">
              <thead className="border-gray-300 bg-gray-100 border-b text-black">
                <tr>
                  <th className="px-4 py-2 border-r">#</th>
                  <th className="px-4 py-2 border-r">Coins</th>
                  <th className="px-4 py-2 border-r">Price</th>
                  <th className="px-4 py-2 border-r">24H Change</th>
                  <th className="px-4 py-2">Market Cap</th>
                  <th className="px-4 py-2">View Chart</th>
                </tr>
              </thead>
              <tbody>
                {displayCoin.slice(0, 10).map((item) => (
                  <tr key={item.id} className="border-gray-300 border-b">
                    <td className="px-4 py-2">{item.market_cap_rank}</td>
                    <td className="flex items-center gap-3 px-4 py-2">
                      <div>
                        <img src={item.image} width={20} height={20} />
                      </div>
                      <p>{item.name}</p>
                    </td>
                    <td className={`px-4 py-2`}>
                      {currency.symbol}
                      {item.current_price.toLocaleString()}
                    </td>
                    <td
                      className={`px-4 py-2 ${
                        item.price_change_percentage_24h > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item.price_change_percentage_24h}
                    </td>
                    <td className="px-4 py-2">
                      {currency.symbol}
                      {item.market_cap.toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      <Link
                        to={`/coin/${item.id}`}
                        className="text-black dark:text-white"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                          />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  } else {
    return <p>Loading ...</p>;
  }
}

export default AllCoins;
