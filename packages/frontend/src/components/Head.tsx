import styled from "styled-components";

const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-content: center;
  width: 95%;
  height: 100%;
  margin-bottom: 150px;
  margin-left: 50px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  height: 100%;
`;

const Title = styled.h1`
  width: 60%;
  color: black;
  font-family: "Satoshi-Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 64px;
  line-height: 72px;
`;

const Description = styled.p`
  width: 70%; 
  color: black;
  margin: 0px 00px;
  font-size: 28px;
  font-family: 'Satoshi';
`;

const Image = styled.img`
  object-fit: cover;
  width: 70%;
  height: auto;
`;

const Head = () => {
  return (
    <HeadContainer>
      <TextContainer>
        <Title>This is 24/7 live protest page</Title>
        <Description>You can download any poster for print and print it any size you wish. You can also support artst by sending some donatins and you get NFT</Description>
      </TextContainer>
      <Image src="assets/head.png" alt="Head" />
    </HeadContainer>
  );
};

export default Head;
