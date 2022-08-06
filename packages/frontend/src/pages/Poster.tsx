import { useParams } from 'react-router';
import Posters from '../mocks/posters.json';
import { IPosterCard } from '../types/types';

const Poster = () => {
  const { id } = useParams();
  const poster = Posters.find((p: IPosterCard ) => p.id === id);

  console.log(poster);
  return (
    <div>
      <img src={poster?.image} alt="poster" />
    </div>
  );
};

export default Poster;
