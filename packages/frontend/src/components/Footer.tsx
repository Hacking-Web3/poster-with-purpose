import styled from "styled-components";

const FooterContent = styled.div`
  background: #f2fcff;;
  width: 100%;
  height: 25vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 10vh;
  bottom: 0;
`;

const BlackText = styled.span`
  color: black;
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
`;

const FooterContainer = styled.ul`
  width: 50%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
  &:last-child {
    justify-content: flex-end;
  }
`;

const FooterItem = styled.li`
  list-style-type: none;
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

const Footer = () => {
  return (
    <FooterContent>
      <FooterContainer>
        <FooterItem><Link href="">GitHub Link</Link></FooterItem>
        <FooterItem><Link href="">Privacy Policy</Link></FooterItem>
      </FooterContainer>
      <FooterContainer>
        <FooterItem><BlackText>2022</BlackText></FooterItem>
        <FooterItem><Image src="logo.png" alt="logo" /></FooterItem>
      </FooterContainer>
    </FooterContent>
  );
};

export default Footer;