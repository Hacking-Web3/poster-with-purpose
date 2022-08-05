import styled from "styled-components";

const StyledFooter = styled.div`
  background: #f2fcff;;
  width: 100%;
  height: 25vh;
  position: absolute;
  bottom: 0;
`;

const FooterContent = styled.div`
  display: flex;
  max-width: 1272px;
  margin: 0 auto;
  justify-content: space-between;
  margin-top: 25px;
`;

const BlackText = styled.span`
  color: black;
`;

const FooterContainer = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const FooterItem = styled.li`
  list-style-type: none;
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
`;

const Link = styled.a`
  color: black;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      <FooterContent>
        <FooterContainer>
          <FooterItem><Link href="">GitHub Link</Link></FooterItem>
          <FooterItem><Link href="">Privacy Policy</Link></FooterItem>
        </FooterContainer>
        <FooterContainer>
          <FooterItem><BlackText>2022</BlackText></FooterItem>
          <FooterItem><img src="" alt="logo" /></FooterItem>
        </FooterContainer>
      </FooterContent>
    </StyledFooter>
  );
};

export default Footer;