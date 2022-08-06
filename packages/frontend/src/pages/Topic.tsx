import styled from "styled-components";
import CardPoster from "../components/CardPoster";
import Posters from "../mocks/postersByTopics.json";
import BrowseByTopics from "../components/BrowseByTopics";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";

const TopicPostersContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 100px;
`;

const TitleContainer = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin-bottom: 50px;
`;

const TopicTitle = styled.h1`
  color: black;
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
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

const Tag = styled.button`
  font-size: 16px;
  line-height: 22px;
  color: #B588C1;
  background: #F9F1FC;
  border: none;
  border-radius: 30px;
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 500;
  margin-bottom: 10px;
  margin-left: 20px;
  padding: 1% 2%;
  :hover {
    background-color: #B588C1;
    color: #FFFFFF;
    cursor: pointer;
  }
`;

const Topic = () => {
  const [postersToPrint, setPostersToPrint] = useState(15);
  const params = useParams();
  let navigate = useNavigate();
  const topic = Posters.find(poster => poster.topic === params.topic);

  useEffect(() => {
    if (!topic || topic.posters.length === 0) {
      navigate("/404");
    } else {
      console.log(topic);
    }
  }, []);

  return (
    <TopicPostersContainer>
      <TitleContainer>
        <TopicTitle>All posters with topic</TopicTitle>
        <Tag onClick={() => navigate("/topic/"+topic?.topic)}>{topic?.topic}</Tag>
      </TitleContainer>
      <PostersContainer>
        {topic?.posters.slice(0, postersToPrint).map((poster, index) => {
          return (
            <CardPoster key={index} author={poster.author} title={poster.title} description={poster.description} image={poster.image} tags={poster.tags} />
          )
        })}
      </PostersContainer>
      {topic && postersToPrint < topic.posters.length ? (
        <Button onClick={() => setPostersToPrint(postersToPrint + 15)}>
          View more
        </Button>
      ) : null
      }
      <BrowseByTopics />
    </TopicPostersContainer>
  );
};

export default Topic;
