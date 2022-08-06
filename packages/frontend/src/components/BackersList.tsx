import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const BackersListContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  align-content: center;
  background-color: #F5F5F5;
  margin-top: 50px;
`;

const Title = styled.h1`
  font-family: 'Satoshi';
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
  border: 1px solid #AFCAAC;
  border-radius: 30px;
  background-color: transparent;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 0.5% 1%;
  color: #4A6346;
  width: 10%;
  height: 100%;
  :hover {
    background-color: #4A6346;
    color: #f5f5f5;
    cursor: pointer;
  }
`;

const Username = styled.p`
  font-size: 16px;
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 500;
  width: 100%;
  height: 100%;
`;

const ProfilePicture = styled.img`
  width: 20%;
  height: auto;
  object-fit: cover;
`;

const Backers = [
  {
    "username": "0x0904...9859",
    "profilePicture": "/assets/profile1.png"
  },
  {
    "username": "lilyrose.eth",
    "profilePicture": "/assets/profile2.png"
  },
  {
    "username": "0x0904...9859",
    "profilePicture": "/assets/profile1.png"
  },
  {
    "username": "lilyrose.eth",
    "profilePicture": "/assets/profile2.png"
  },
  {
    "username": "0x0904...9859",
    "profilePicture": "/assets/profile1.png"
  },
  {
    "username": "lilyrose.eth",
    "profilePicture": "/assets/profile2.png"
  },
  {
    "username": "0x0904...9859",
    "profilePicture": "/assets/profile1.png"
  },
  {
    "username": "lilyrose.eth",
    "profilePicture": "/assets/profile2.png"
  },
  {
    "username": "0x0904...9859",
    "profilePicture": "/assets/profile1.png"
  },
  {
    "username": "lilyrose.eth",
    "profilePicture": "/assets/profile2.png"
  },
  {
    "username": "0x0904...9859",
    "profilePicture": "/assets/profile1.png"
  },
  {
    "username": "lilyrose.eth",
    "profilePicture": "/assets/profile2.png"
  },
];

const BackersList = () => {
  let navigate = useNavigate();
  const [backersToPrint, setBackersToPrint] = useState(10);

  return (
    <BackersListContainer>
      <Title>Bakers:</Title>
      <BackersContainer>
        {Backers.slice(0, backersToPrint).map((backer, index) => (
          <Backer key={index} onClick={() => navigate("/user/" + backer.username)}>
            <ProfilePicture src={backer.profilePicture} />
            <Username>{backer.username}</Username>
          </Backer>
        ))}
        {backersToPrint < Backers.length && (
          <Backer onClick={() => setBackersToPrint(backersToPrint + 10)}>
            View more
          </Backer>
        )}
      </BackersContainer>
    </BackersListContainer>
  );
};

export default BackersList;
