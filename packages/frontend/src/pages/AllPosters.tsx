import styled from "styled-components";
import CardPoster from "../components/CardPoster";
import Posters from "../mocks/posters.json";
import BrowseByTopics from "../components/BrowseByTopics";
import { useState } from "react";

const AllPostersContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  padding-bottom: 100px;
`;

const PostersContainer = styled.div`
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
  margin-bottom: 50px;
  :hover {
    background: #4A6346;
    color: #FFFFFF;
    cursor: pointer;
  }
`;

const AllPosters = () => {
  const [postersToPrint, setPostersToPrint] = useState(15);

  return (
    <AllPostersContainer>
      <PostersContainer>
        {Posters.slice(0, postersToPrint).map((poster, index) => {
          return (
            <CardPoster key={index} author={poster.author} title={poster.title} description={poster.description} image={poster.image} tags={poster.tags} />
          )
        })}
      </PostersContainer>
      {postersToPrint < Posters.length && (
        <Button onClick={() => setPostersToPrint(postersToPrint + 15)}>
          Show more
        </Button>
      )}
      <BrowseByTopics />
    </AllPostersContainer>
  );
};

export default AllPosters;
