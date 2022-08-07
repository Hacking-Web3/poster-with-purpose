import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IUser } from "../../types/types";

const Tag = styled.button`
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

const ProfileTag = (user: IUser) => {
  let navigate = useNavigate();

  return (
    <Tag onClick={() => navigate("/profile/" + user.walletAdress)}>
      <ProfilePicture src={user.profilePicture} />
      <Username>{user.walletAdress}</Username>
    </Tag>
  );
};

export default ProfileTag;
