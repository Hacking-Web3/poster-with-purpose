import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IUsersList } from "../types/types";
import ProfileTag from "./common/ProfileTag";

const BackersListContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  align-content: center;
  background-color: #f5f5f5;
  margin-top: 50px;
`;

const Title = styled.h1`
  font-family: "Satoshi";
  font-style: normal;
  font-weight: 500;
  font-size: 23px;
  line-height: 33px;
`;

const BackersContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  width: 100%;
`;

const Backer = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 1px solid #afcaac;
  border-radius: 30px;
  background-color: transparent;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 0.5% 1%;
  color: #4a6346;
  width: 10%;
  height: 100%;
  :hover {
    background-color: #4a6346;
    color: #f5f5f5;
    cursor: pointer;
  }
`;

const BackersList = ({ users }: IUsersList) => {
  let navigate = useNavigate();
  const [backersToPrint, setBackersToPrint] = useState(10);

  return (
    <BackersListContainer>
      <Title>Backers:</Title>
      <BackersContainer>
        {users.slice(0, backersToPrint).map((user, index) => (
          <ProfileTag key={index} {...user} />
        ))}
        {backersToPrint < users.length && (
          <Backer onClick={() => setBackersToPrint(backersToPrint + 10)}>
            View more
          </Backer>
        )}
      </BackersContainer>
    </BackersListContainer>
  );
};

export default BackersList;
