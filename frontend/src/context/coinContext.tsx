/** @format */

import {
  createContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

// Define an interface for the context value
interface CoinContextType {
  allCoin: any[]; // Adjust the type of allCoin according to your data
  currency: {
    name: string;
    symbol: string;
  };
  setCurrency: Dispatch<SetStateAction<{ name: string; symbol: string }>>;
}

// Initialize the context with a default value (optional)
export const CoinContext = createContext<CoinContextType | undefined>(
  undefined
);

const CoinContextProvider = ({ children }: { children: ReactNode }) => {
  const [allCoin, setAllCoin] = useState<any[]>([]); // Use the correct type for your data
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  const fetchAllCoin = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-39jigAWXdmoZB63GNKTsjTWE",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setAllCoin(response))
      .catch((err) => console.error(err));
  };

  const contextValue: CoinContextType = {
    allCoin,
    currency,
    setCurrency,
  };

  useEffect(() => {
    fetchAllCoin();
  }, [currency]);

  return (
    <CoinContext.Provider value={contextValue}>{children}</CoinContext.Provider>
  );
};

export default CoinContextProvider;
