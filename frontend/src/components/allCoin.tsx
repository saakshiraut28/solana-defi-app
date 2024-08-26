/** @format */

import { useContext, useEffect, useState } from "react";
import { CoinContext } from "../context/coinContext";
import { Link } from "react-router-dom";

function AllCoins() {
  const coinContext = useContext(CoinContext);
  if (!coinContext) {
    throw new Error("CoinContext must be used within a CoinContextProvider");
  }
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
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center w-full">
        <p className="py-4 font-bold text-2xl">All Coins Data</p>
        <form onSubmit={searchHandler}>
          <input
            required
            value={input}
            onChange={inputHandler}
            type="text"
            placeholder="Search Coin or Token"
            className="px-4 py-2"
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="mx-2 lg:mx-8 my-8 px-4 py-4">
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
            {displayCoin.slice(0, 10).map((item, index) => (
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
                  <Link to={`/coin/${item.id}`}>View Chart</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllCoins;
