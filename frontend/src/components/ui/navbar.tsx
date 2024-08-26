/** @format */

import React, { useContext } from "react";
import { CoinContext } from "../../context/coinContext";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Navbar: React.FC = () => {
  const context = useContext(CoinContext);

  if (!context) {
    throw new Error("CoinContext must be used within a CoinContextProvider");
  }

  const { setCurrency } = context;

  const currencyHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      <p className="font-bold text-xl">Defi</p>
      <select
        onChange={currencyHandler}
        className="px-4 border rounded-full text-sm"
      >
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="inr">INR</option>
      </select>
      <WalletMultiButton className="rounded-full w-96">
        Connect
      </WalletMultiButton>
    </nav>
  );
};

export default Navbar;
