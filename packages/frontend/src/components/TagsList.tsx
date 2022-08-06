import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ITagsList } from "../types/types";
import Tag from "./common/Tag";

const TagsListContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  align-content: center;
  background-color: #F5F5F5;
`;

const Title = styled.h1`
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 500;
  font-size: 23px;
  line-height: 33px;
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

const TagsList = ({ title, titlePosition, tags }: ITagsList) => {
  let navigate = useNavigate();
  const [tagsToPrint, setTagsToPrint] = useState(20);

  return (
    <TagsListContainer>
      {title && titlePosition === "left" ?
        <Title>{title}</Title>
        :
        <Title style={{ alignSelf: "center" }}>{title}</Title>
      }
      <TagsContainer>
        {tags.slice(0, tagsToPrint).map((tag: string, index: any) => (
          <Tag key={index} onClick={() => navigate("/topic/" + tag)}>{tag}</Tag>
        ))}
        {tagsToPrint < tags.length && (
          <Tag onClick={() => setTagsToPrint(tagsToPrint + 20)}>
            ...
          </Tag>
        )}
      </TagsContainer>
    </TagsListContainer>
  );
};

export default TagsList;
