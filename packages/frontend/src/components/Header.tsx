import { ConnectButton } from "@rainbow-me/rainbowkit";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAccount } from "wagmi";

const StyledHeader = styled.div`
  display: flex;
  padding-top: 33px;
  margin-bottom: 50px;
  justify-content: space-around;
  margin-left: 50px;
`;

const Logo = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    img:first-child {
        margin-right: 20px;
    }
    img:last-child {
        margin-left: 20px;
    }
    :hover {
        cursor: pointer;
    }
`;

const Button = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-right: 100px;
`;

const Header = () => {
  //   const { data : walletData } = useAccount();
  let navigate = useNavigate();

  return (
    <StyledHeader>
      <Logo onClick={() => navigate("/")}>
        <img src="/logo.png" alt="Logo" />
        <img src="/brandName.png" alt="BrandName" />
      </Logo>
      <Button>
        {/* {walletData && ( */}
        <ConnectButton
          chainStatus="name"
          accountStatus="address"
          label="Connect"
          showBalance={false}
        />
        {/* )} */}
      </Button>
    </StyledHeader>
  );
};

export default Header;