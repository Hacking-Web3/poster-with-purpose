import { useParams } from 'react-router';
import Posters from '../mocks/posters.json';
import Users from '../mocks/users.json';
import ProfilePresentation from '../components/ProfilePresentation';
import PosterSlider from '../components/PosterSlider';
import styled from 'styled-components';
import PostersList from '../components/PosterList';

const PresentationContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

const Profile = () => {
  const { id } = useParams();
  const user = Users.find((u: any) => u.walletAdress === id);

  return (
    <div>
      {
        user &&
        <PresentationContainer>
          <ProfilePresentation {...user} />
          <PostersList title={"Created Posters"} posters={Posters} numberElements={6} actionButton={"extend"} />
          <PostersList title={"Uploaded Posters"} posters={Posters} numberElements={3} actionButton={"extend"} />
          <PosterSlider title={"Printed Posters"} posters={Posters} />
          <PosterSlider title={"Posters collected as NFT by supporting Authors"} posters={Posters} />
        </PresentationContainer>
      }
    </div>
  );
};

export default Profile;
