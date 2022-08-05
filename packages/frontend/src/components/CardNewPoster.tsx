import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IPosterCard } from "../types/types";

const PosterCardContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    background-color: #fdf8ff;
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

const Button = styled.button`
  height: 100%;
  width: auto;
  padding: 2% 5%;
  background: #DEF3DA;
  border-radius: 30px;
  border: none;
  color: #4A6346;
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 20px;
  text-align: center;
  margin-bottom: 10px;
  :hover {
    background: #4A6346;
    color: #FFFFFF;
  } 
`;


const CardNewPoster = ({ author, image }: IPosterCard) => {
  let navigate = useNavigate();

  return (
    <PosterCardContainer onClick={() => navigate("/poster")}>
      <Image src={image} alt="Head" />
      <Author>{author}</Author>
      <TimeStamp>A day ago</TimeStamp>
      <ButtonContainer>
        <Button>Print</Button>
        <Button>Support author</Button>
      </ButtonContainer>
    </PosterCardContainer>
  );
};

export default CardNewPoster;
