import styled from "styled-components";
import { Col, Row } from 'antd';

const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-content: center;
  width: 95%;
  height: 50vh;
  margin-top: 150px;
  margin-bottom: 150px;
  margin-left: 50px;
`;

const Title = styled.h1`
  width: 70%;
  color: black;
  font-size: 64px;
  font-weight: medium;
`;

const Description = styled.p`
  width: 70%; 
  color: black;
  margin: 0px 00px;
  font-size: 28px;
`;

const Image = styled.img`
  width: 100%;
`;

const Head = () => {
  return (
    <HeadContainer>
      <div>
        <Title>This is 24/7 live protest page</Title>
        <Description>You can download any poster for print and print it any size you wish. You can also support artst by sending some donatins and you get NFT</Description>
      </div>
      <Image src="tmp_head.png" alt="Head" />
    </HeadContainer>
  );
};

export default Head;
