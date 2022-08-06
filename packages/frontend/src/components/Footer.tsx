import styled from "styled-components";

const FooterContent = styled.div`
  background: #f2fcff;;
  width: 100%;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  padding-bottom: 20px;
  padding-top: 40px;
`;

const BlackText = styled.span`
  color: black;
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
`;

const FooterContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  &:last-child {
    justify-content: flex-end;
  }
`;

const FooterItem = styled.div`
  margin-right: 20px;
  &:last-child {
    margin-right: 0;
  }
`;

const Image = styled.img`
  object-fit: cover;
  width: 150%;
  height: auto;
`;

const Link = styled.a`
  color: black;
  text-decoration: none;
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Policy = styled.p`
font-family: 'Satoshi';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  /* identical to box height */

  letter-spacing: 0.14em;
  text-transform: uppercase;

  color: #131428;

  opacity: 0.7;
`;

const Footer = () => {
  return (
    <FooterContent>
      <FooterContainer>
        <FooterContainer>
          <FooterItem><Link href="">GitHub Link</Link></FooterItem>
          <FooterItem><Link href="">Privacy Policy</Link></FooterItem>
        </FooterContainer>
        <FooterContainer>
          <FooterItem><BlackText>2022</BlackText></FooterItem>
          <FooterItem><Image src="/logo.png" alt="logo" /></FooterItem>
        </FooterContainer>
      </FooterContainer>
      <Policy>By uploading Artwork to Posters with purpose you agree to attribute your creation with creative commons 0 license</Policy >
    </FooterContent>
  );
};

export default Footer;