import React from 'react';
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Main from "./pages/Main";

const theme = {
  position: {
    bg: "#2C2E32",
    inactiveTabBg: "#1F2124",
    tabs: {
      inactive: {
        bg: "#1F2124",
        color: "#42454A",
      },
    },
  },
  button: {
    bg: "#06C799",
    color: "#000",
  },
};

const GlobalStyle = createGlobalStyle`
  body {
     font-family: serif;
     background: #000;
     color: #99A0AB;
     font-family: 'Satoshi', sans-serif;
  }
  header {
    color: white;
  }
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
      <RainbowKitProvider chains={chains}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Main />
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
