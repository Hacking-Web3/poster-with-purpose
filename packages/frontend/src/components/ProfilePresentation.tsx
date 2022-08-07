import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IUser } from "../types/types";
import ModalSupport from "./ModalSupport";
import { useState } from "react";
import ProfileTag from "./common/ProfileTag";
import Button from "./common/Button";
import { TwitterOutlined, InstagramOutlined } from "@ant-design/icons/lib/icons/";

const ProfilePresentationContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 25px;
`;

const ProfilePicture = styled.img`
  object-fit: cover;
  width: 10%;
  height: auto;
  border-radius: 50%;
`;

const Author = styled.h1`
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 700;
  font-size: 35px;
  text-align: center;
`;

const Description = styled.p`
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  flex-wrap: wrap;
  width: 20%;
  text-align: center;
`;

const ButtonStatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 50%;
  height: 100%;
`;

const Stats = styled.p`
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  text-align: center;
  text-transform: uppercase;
  color: #72748D
`;

const Social = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  width: 15%;
  height: 100%;
  margin-bottom: 25px;
`;

const SocialButton = styled.button`
  padding: 1% 5%;
  background: #transparent;
  background: #FFFFFF;
  border: 1px solid #AFCAAC;
  border-radius: 30px;
  color: #4A6346;
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  text-align: center;
  :hover {
    background: #4A6346;
    color: #FFFFFF;
    cursor: pointer;
  }
`;

const ProfilePresentation = (user: IUser) => {
  let navigate = useNavigate();
  const [isSupportModalVisible, setIsSupportModalVisible] = useState(false);

  return (
    <ProfilePresentationContainer>
      <ModalSupport isModalVisible={isSupportModalVisible} setIsModalVisible={setIsSupportModalVisible} />
      <ProfilePicture src={user.profilePicture} alt="Head" />
      <Author>{user.name}</Author>
      <Description>{user.description}</Description>
      <Social>
        {/* <ProfileTag {...user} /> */}
        <SocialButton><TwitterOutlined /></SocialButton>
        <SocialButton><InstagramOutlined /></SocialButton>
        <SocialButton>{user.website}</SocialButton>
      </Social>
      <ButtonStatsContainer>
        <Button onClick={() => setIsSupportModalVisible(true)} style={{ marginLeft: "10px" }}>Support author</Button>
        <Stats>348 times supported</Stats>
        <Stats>(5.4 ETH)</Stats>
      </ButtonStatsContainer>
    </ProfilePresentationContainer>
  );
};

export default ProfilePresentation;
