import styled from "styled-components";
import Card from "./Card";
import { useNavigate } from "react-router-dom";
import { IPostersList } from "../../types/types";
import { useState } from "react";

const PostersListContainer = styled.div`
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
  :hover {
    background: #4A6346;
    color: #FFFFFF;
    cursor: pointer;
  }
`;

const PostersList = (postersList: IPostersList) => {
    const [postersToPrint, setPostersToPrint] = useState(postersList.numberElements ? postersList.numberElements : postersList.posters.length);
    let navigate = useNavigate();

    return (
        <PostersListContainer>
            {postersList.title && <Title>{postersList.title}</Title>}
            <PostersContainer>
                {postersList.posters.slice(0, postersToPrint).map((poster, index) => {
                    return (
                        <Card key={index} {...poster} />
                    )
                })}
            </PostersContainer>
            {postersList.actionButton === "navigate" ? (
                <Button onClick={() => navigate("/allPosters")} >View all</Button>
            ) : (
                postersToPrint < postersList.posters.length && (
                    <Button onClick={() => setPostersToPrint(postersToPrint + 15)}>
                        Show more
                    </Button>
                )
            )}
        </PostersListContainer>
    );
};

export default PostersList;
