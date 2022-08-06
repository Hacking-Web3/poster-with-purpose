import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IPosterCard } from "../../types/types";
import Tag from "../common/Tag";

const PosterCardContainer = styled.div`
    width: 25%;
    margin-right: 5px;
    margin-left: 5px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 25px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 90%;
`;

const Title = styled.h1`
  color: black;
  font-size: 24px;
  margin-top: 10px;
`;

const Description = styled.p`
  color: grey;
  font-weight: lighter;
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
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
  :hover {
    background: #4A6346;
    color: #FFFFFF;
    cursor: pointer;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  width: 95%;
  margin-top: 5px;
`;

const CardPoster = (poster: IPosterCard) => {
  let navigate = useNavigate();

  return (
    <PosterCardContainer>
      <Image onClick={() => navigate("/poster/" + poster.id)} src={poster.image} alt="Head" />
      <Title><span style={{ fontWeight: "bold" }}>{poster.author}</span>, {poster.title}</Title>
      <Description>{poster.description}</Description>
      <ButtonContainer>
        <Button>Print</Button>
        <Button style={{ marginLeft: "10px" }}>Support author</Button>
      </ButtonContainer>
      <TagsContainer>
        {poster.tags.map((tag, index) => (
          <Tag onClick={() => navigate("/topic/" + tag)} key={index}>{tag}</Tag>
        ))}
      </TagsContainer>
    </PosterCardContainer>
  );
};

export default CardPoster;
