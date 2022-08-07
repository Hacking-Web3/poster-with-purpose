import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IPosterCard } from "../../types/types";
import ProfileTag from "../common/ProfileTag";

import Users from "../../mocks/users.json";

const PosterCardContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 50px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 90%;
  margin-bottom: 20px;
`;


const Card = (poster: IPosterCard) => {
  let navigate = useNavigate();
  const user = Users.find((u: any) => u.name === poster.author);

  return (
    <PosterCardContainer>
      <Image onClick={() => navigate("/poster/" + poster.id)} src={process.env.PUBLIC_URL + poster.image} alt="Head" />
      {user && <ProfileTag {...user} />}
    </PosterCardContainer>
  );
};

export default Card;
