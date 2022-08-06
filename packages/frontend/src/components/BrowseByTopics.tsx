import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IPosterCard, IPosterCardArray } from "../types/types";

const BrowseByTopicsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
  background-color: #F5F5F5;
  padding-left: 50px;
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
  align-items: center;
  width: 95%;
  margin-top: 5px;
  margin-bottom: 5px;
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
  }
`;

const Tags = ["Art", "Design", "Technology", "Music", "Film", "Literature", "Photography", "Desinformation", "Design", "Technology", "Music", "Film", "Literature", "Photography", "Desinformation", "Art", "Design", "Technology", "Music", "Film", "Literature", "Photography", "Desinformation", "Design", "Technology", "Music", "Film", "Literature", "Photography", "Desinformation", "..."];

const BrowseByTopics = () => {
    let navigate = useNavigate();

    return (
        <BrowseByTopicsContainer>
            <Title>Browse by topics</Title>
            <TagsContainer>
                {Tags.map((tag) => (
                    <Tag>{tag}</Tag>
                ))}
            </TagsContainer>
        </BrowseByTopicsContainer>
    );
};

export default BrowseByTopics;
