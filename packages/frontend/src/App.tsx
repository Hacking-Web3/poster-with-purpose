import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { apiProvider, configureChains, getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, createClient, WagmiProvider } from "wagmi";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import { Layout } from "./components/Layout";
import { Main } from "./pages/Main";

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
  [apiProvider.alchemy(process.env.ALCHEMY_ID), apiProvider.fallback()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});


function App() {
  return (
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Layout>
            <Main />
          </Layout>
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiProvider>
  );
}

export default App;
