import { useParams } from 'react-router';
import Posters from '../mocks/posters.json';
import Users from '../mocks/users.json';
import { IPosterCard } from '../types/types';
import PosterPresentation from '../components/PosterPresentation';
import TagsList from '../components/TagsList';
import BackersList from '../components/BackersList';
import ProofOfUse from '../components/ProofOfUse';
import styled from 'styled-components';

const PresentationContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  padding-bottom: 150px;
`;

const Poster = () => {
  const { id } = useParams();
  const poster = Posters.find((p: IPosterCard) => p.id === id);

  console.log(poster);
  return (
    <div>
      {
        poster &&
        <PresentationContainer>
          <PosterPresentation {...poster} />
          <ProofOfUse title={"Proof of use:"} posters={Posters} />
          <TagsList title={"Topics:"} titlePosition={"left"} tags={poster.tags} />
          <BackersList users={Users} />
        </PresentationContainer>
      }
    </div>
  );
};

export default Poster;
