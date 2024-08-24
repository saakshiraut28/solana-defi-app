/** @format */

// Navbar.tsx

import React, { useContext } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { CoinContext } from "../../context/coinContext";

const Navbar: React.FC = () => {
  const coinContext = useContext(CoinContext);

  if (!coinContext) {
    throw new Error("CoinContext must be used within a CoinContextProvider");
  }

  const { setCurrency } = useContext(CoinContext);

  // Type annotation for the currencyHandler function
  const currencyHandler: (e: React.ChangeEvent<HTMLSelectElement>) => void = (
    e
  ) => {
    switch (e.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;
      case "inr":
        setCurrency({ name: "inr", symbol: "₹" });
        break;
      default:
        setCurrency({ name: "usd", symbol: "$" });
        break;
    }
  };

  return (
    <nav className="flex justify-between gap-4 px-4 py-4">
      <p className="font-bold text-3xl">Logo</p>
      <div className="flex items-center gap-2">
        <label htmlFor="currency" className="mr-2">
          Currency:
        </label>
        <select
          id="currency"
          onChange={currencyHandler}
          className="p-2 border rounded"
        >
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
      </div>
      <WalletMultiButton>Connect</WalletMultiButton>
    </nav>
  );
};

export default Navbar;
