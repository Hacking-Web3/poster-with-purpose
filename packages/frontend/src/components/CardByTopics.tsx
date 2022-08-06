import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IPosterCardArray } from "../types/types";

const PostersContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 50px;
    padding: 0 5%;
`;

const Image = styled.img`
  object-fit: cover;
  width: 25%;
  height: auto;
`;

const CardByTopics = (posters: IPosterCardArray) => {
  let navigate = useNavigate();

  return (
    <PostersContainer>
      {posters.posters.map((poster, index) => (
        <Image key={index} onClick={() => navigate("/poster")} src={poster.image} alt="Head" />
      ))}
    </PostersContainer>
  );
};

export default CardByTopics;
