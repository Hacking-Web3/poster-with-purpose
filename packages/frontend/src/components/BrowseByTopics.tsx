import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Tags from "../mocks/topics.json";

const BrowseByTopicsContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  background-color: #F5F5F5;
`;

const Title = styled.h1`
  color: black;
  font-weight: medium;
  font-size: 28px;
  text-align: center;
  margin-bottom: 50px;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  width: 100%;
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
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 1% 2%;
  :hover {
    background-color: #B588C1;
    color: #FFFFFF;
    cursor: pointer;
  }
`;

const BrowseByTopics = () => {
  let navigate = useNavigate();
  const [tagsToPrint, setTagsToPrint] = useState(20);

  return (
    <BrowseByTopicsContainer>
      <Title>Browse by topics</Title>
      <TagsContainer>
        {Tags.slice(0, tagsToPrint).map((tag, index) => (
          <Tag key={index} onClick={() => navigate("/topic/"+tag)}>{tag}</Tag>
        ))}
        { tagsToPrint < Tags.length && (
          <Tag onClick={() => setTagsToPrint(tagsToPrint + 20)}>
            ...
          </Tag>
        )}
      </TagsContainer>
    </BrowseByTopicsContainer>
  );
};

export default BrowseByTopics;
