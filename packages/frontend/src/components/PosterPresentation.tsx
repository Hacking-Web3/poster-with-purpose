import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IPosterCard } from "./../types/types";
import ModalPrintPoster from "./ModalPrintPoster";
import ModalSupport from "./ModalSupport";
import { useState } from "react";

const PosterPresentationContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 25px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 20%;
`;

const Author = styled.h1`
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  text-align: center;
  margin-top: 50px;
`;

const Title = styled.h1`
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  text-align: center;
`;

const Description = styled.p`
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  color: #72748D
`;

const ButtonStatsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 20%;
  height: 100%;
`;

const ButtonStatsDivider = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  padding: 4% 5%;
  background: #DEF3DA;
  border-radius: 30px;
  border: none;
  color: #4A6346;
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  text-align: center;
  :hover {
    background: #4A6346;
    color: #FFFFFF;
    cursor: pointer;
  }
`;

const Stats = styled.p`
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;
  color: #72748D
`;

const PosterPresentation = (poster: IPosterCard) => {
  let navigate = useNavigate();
  const [isDownloadModalVisible, setIsDownloadModalVisible] = useState(false);
  const [isSupportModalVisible, setIsSupportModalVisible] = useState(false);

  return (
    <PosterPresentationContainer>
      <ModalPrintPoster poster={poster} isModalVisible={isDownloadModalVisible} setIsModalVisible={setIsDownloadModalVisible} />
      <ModalSupport poster={poster} isModalVisible={isSupportModalVisible} setIsModalVisible={setIsSupportModalVisible} />

      <Image src={poster.image} alt="Head" />
      <Author>{poster.author}</Author>
      <Title>{poster.title}</Title>
      <Description>{poster.description}</Description>
      <ButtonStatsContainer>
        <ButtonStatsDivider>
          <Button onClick={() => setIsDownloadModalVisible(true)} >Print</Button>
          <Stats>3987 u. total printed</Stats>
        </ButtonStatsDivider>
        <ButtonStatsDivider>
          <Button onClick={() => setIsSupportModalVisible(true)} style={{ marginLeft: "10px" }}>Support author</Button>
          <Stats>348 times supported</Stats>
          <Stats>(5.4 ETH)</Stats>
        </ButtonStatsDivider>
      </ButtonStatsContainer>
    </PosterPresentationContainer>
  );
};

export default PosterPresentation;
