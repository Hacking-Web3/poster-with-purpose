import React from 'react';
import "@rainbow-me/rainbowkit/styles.css";
import "./App.css"
import { getDefaultWallets, darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Routes, Route } from 'react-router-dom';
import Main from "./pages/Main";
import Poster from "./pages/Poster";
import Layout from "./components/Layout";

const theme = {

};

const GlobalStyle = createGlobalStyle`
`;

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "poster-with-purpose",
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});

function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "#e9fbe6",
          accentColorForeground: "black",
          borderRadius: "large",
          fontStack: "system",
        })}
      >
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Layout>
            <Routes>
              <Route path='/' element={<Main />} />
              <Route path='/poster/:id' element={<Poster />} />
            </Routes>
          </Layout>
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
