import { useEffect } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import "./App.css";
import {
  getDefaultWallets,
  darkTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ThemeProvider } from "styled-components";
import routes from "./routes";
import { useRoutes, useLocation } from "react-router-dom";
import GlobalStyle from "./globalStyles";

import SatoshiRegular from "/assets/fonts/Satoshi-Regular.otf";

const theme = {};

const { chains, provider } = configureChains(
  [chain.rinkeby],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "poster-with-purpose",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  const routing = useRoutes(routes);

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
          <ScrollToTop />
          {routing}
        </ThemeProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
