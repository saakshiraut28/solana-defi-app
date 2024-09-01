/** @format */

import { Route, Routes } from "react-router-dom"; // Import Routes and Route
import AllCoins from "./components/allCoin";
import SingleCoin from "./components/singleCoin";
import Navbar from "./components/ui/navbar";
import CoinContextProvider from "./context/coinContext";
import { useMemo } from "react";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";

import "@solana/wallet-adapter-react-ui/styles.css";
import Swap from "./components/swap";

function App() {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const wallets = useMemo(() => [new PhantomWalletAdapter()], [network]);

  return (
    <div className="bg-light-backgroundColor dark:bg-dark-backgroundColor">
      <CoinContextProvider>
        <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
              <Navbar />
              <Routes>
                <Route path="/" element={<AllCoins />} />
                <Route path="/coin/:coinId" element={<SingleCoin />} />
                <Route path="/swap" element={<Swap />} />
              </Routes>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </CoinContextProvider>
    </div>
  );
}

export default App;
