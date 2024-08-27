/** @format */

import React, {
  createContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

// Define an interface for the coin data structure
interface Coin {
  id: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  market_cap_rank: number;
}

// Define an interface for the context value
interface CoinContextType {
  allCoin: Coin[];
  currency: {
    name: string;
    symbol: string;
  };
  setCurrency: Dispatch<SetStateAction<{ name: string; symbol: string }>>;
}

// Initialize the context with a default value
export const CoinContext = createContext<CoinContextType | undefined>(
  undefined
);

const CoinContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allCoin, setAllCoin] = useState<Coin[]>([]);
  const [currency, setCurrency] = useState<{ name: string; symbol: string }>({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": import.meta.env.VITE_COINGECKO_API_KEY || "",
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        options
      );
      const data = await response.json();
      setAllCoin(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  const contextValue: CoinContextType = {
    allCoin,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>{children}</CoinContext.Provider>
  );
};

export default CoinContextProvider;
