/** @format */

import React, { useContext, useEffect, useState } from "react";
import { CoinContext } from "../../context/coinContext";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [theme, setTheme] = useState<string>("light");
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

  const handleSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <nav className="flex justify-between items-center gap-4 bg-light-backgroundColor dark:bg-dark-backgroundColor px-4 lg:px-24 py-2 font-comfortaa text-black dark:text-white">
      <Link to="/">
        <p className="font-bold text-2xl">
          <span className="text-light-green dark:text-dark-green">De</span>
          <span>fi</span>
        </p>
      </Link>
      <div className="flex md:flex-row flex-col justify-between items-center items-center gap-3">
        <div className="flex gap-3">
          <select
            onChange={currencyHandler}
            className="border-1 dark:border-white bg-transparent px-4 py-1 border border-black rounded-full text-md"
          >
            <option value="usd">USD</option>
            <option value="eur">EUR</option>
            <option value="inr">INR</option>
          </select>
          <div className="border-1 dark:border-white px-1 py-1 border border-black rounded-full">
            {theme === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
                onClick={handleSwitch}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
                onClick={handleSwitch}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            )}
          </div>
          <Link to="/swap">
            <p>Swap</p>
          </Link>
        </div>
        <WalletMultiButton className="bg-light-green rounded-full w-32 md:w-96">
          Connect
        </WalletMultiButton>
      </div>
    </nav>
  );
};

export default Navbar;
