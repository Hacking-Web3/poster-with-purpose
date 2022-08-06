import styled from "styled-components";
import Posters from "../mocks/postersByTopics.json";
import TagsList from "../components/TagsList";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import PostersList from "../components/PosterList";
import Tag from "../components/common/Tag";

import Tags from "../mocks/topics.json";

const TopicPostersContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
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
  margin-left: 50px;
  margin-right: 50px;
`;

const TopicTitle = styled.h1`
  color: black;
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
`;

const Topic = () => {
  const params = useParams();
  let navigate = useNavigate();
  const topic = Posters.find(poster => poster.topic === params.topic) || { topic: "", posters: [] };

  useEffect(() => {
    if (!topic || topic.posters.length === 0) {
      navigate("/404");
    }
  });

  return (
    <TopicPostersContainer>
      <TitleContainer>
        <TopicTitle>All posters with topic</TopicTitle>
        <Tag style={{marginLeft: "20px"}} onClick={() => navigate("/topic/" + params.topic)}>{params.topic}</Tag>
      </TitleContainer>
      <PostersList posters={topic?.posters} numberElements={15} actionButton={"extend"} />
      <TagsList title={"Browse by topics"} tags={Tags} />
    </TopicPostersContainer>
  );
};

export default Topic;
