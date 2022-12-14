import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IPosterCard } from "../../types/types";
import Button from "../../components/common/Button";
import ModalPrintPoster from "../ModalPrintPoster";
import ModalSupport from "../ModalSupport";
import { useState } from "react";

const PosterCardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 50px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 90%;
`;

const Author = styled.h1`
  color: black;
  font-size: 24px;
  margin-top: 10px;
  font-weight: bold;
`;

const TimeStamp = styled.p`
  color: grey;
  font-size: 14px;
  font-weight: light;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  height: 100%;
`;

const Card = (poster: IPosterCard) => {
  let navigate = useNavigate();
  const [isDownloadModalVisible, setIsDownloadModalVisible] = useState(false);
  const [isSupportModalVisible, setIsSupportModalVisible] = useState(false);

  // <Author>{poster.author}</Author>
  return (
    <PosterCardContainer>
      <ModalPrintPoster
        poster={poster}
        isModalVisible={isDownloadModalVisible}
        setIsModalVisible={setIsDownloadModalVisible}
      />
      <ModalSupport
        poster={poster}
        isModalVisible={isSupportModalVisible}
        setIsModalVisible={setIsSupportModalVisible}
      />
      <Image
        onClick={() => navigate("/poster/" + poster.id)}
        src={poster.image}
        alt="Head"
      />
      <TimeStamp>A day ago</TimeStamp>
      <ButtonContainer>
        <Button onClick={() => setIsDownloadModalVisible(true)}>Print</Button>
        <Button onClick={() => setIsSupportModalVisible(true)}>
          Support author
        </Button>
      </ButtonContainer>
    </PosterCardContainer>
  );
};

export default Card;
