import styled from "styled-components";
import CardPoster from "./CardPoster";
import { useNavigate } from "react-router-dom";
import TopPosters from "../mocks/posters.json";

const ImportantPosterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`;

const Title = styled.h1`
  color: black;
  font-weight: medium;
  font-size: 28px;
  text-align: center;
  margin-bottom: 50px;
`;

const PosterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.button`
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: #4A6346;
  background-color: transparent;
  border: 1px solid #AFCAAC;
  border-radius: 30px;
  padding: 0.75% 4%;
  :hover {
    background: #4A6346;
    color: #FFFFFF;
    cursor: pointer;
  }
`;

const ImportantPosters = () => {
  let navigate = useNavigate();

  return (
    <ImportantPosterContainer>
      <Title>Most important posters of the week</Title>
      <PosterContainer>
        {TopPosters.slice(0, 6).map((poster, index) => {
          return (
            <CardPoster key={index} author={poster.author} title={poster.title} description={poster.description} image={poster.image} tags={poster.tags} />
          )
        })}
      </PosterContainer>
      <Button onClick={() => navigate("/allPosters")} >View all</Button>
    </ImportantPosterContainer>
  );
};

export default ImportantPosters;
