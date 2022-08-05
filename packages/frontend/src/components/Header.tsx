import { ConnectButton } from "@rainbow-me/rainbowkit";
import styled from "styled-components";
import { useAccount } from "wagmi";

const StyledHeader = styled.div`
  display: flex;
  max-width: 1272px;
  background: #ffffff;
  margin: 0 auto;
  margin-top: 33px;
  margin-bottom: 100px;
  justify-content: space-between;
`;

const Header = () => {
//   const { data : walletData } = useAccount();
  return (
    <StyledHeader>
      <div>
        <img src="/strategy_on_lyra.svg" alt="Logo" />
      </div>
      <div>
        {/* {walletData && ( */}
          <ConnectButton
            chainStatus="name"
            accountStatus="address"
            label="Connect"
            showBalance={false}
          />
        {/* )} */}
      </div>
    </StyledHeader>
  );
};

export default Header;