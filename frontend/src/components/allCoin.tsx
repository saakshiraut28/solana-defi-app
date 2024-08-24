/** @format */

import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../context/coinContext";

function AllCoins() {
  const coinContext = useContext(CoinContext);
  if (!coinContext) {
    throw new Error("CoinContext must be used within a CoinContextProvider");
  }
  const { allCoin, currency } = coinContext;
  const [displayCoin, setDisplayCoin] = useState<any[]>([]);

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div>
      <h3>All Coins Data</h3>
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Coins</th>
              <th>Price</th>
              <th>24H Change</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {displayCoin.slice(0, 10).map((item, index) => (
              <tr key={item.id}>
                <td>{item.market_cap_rank}</td>
                <td>{item.name}</td>
                <td>{item.current_price}</td>
                <td>{item.price_change_percentage_24h}</td>
                <td>{item.market_cap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllCoins;
