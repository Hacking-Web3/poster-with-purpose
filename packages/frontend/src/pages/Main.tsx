import Head from "../components/Head";
import ImportantPosters from '../components/ImportantPosters';
import NewPosters from '../components/NewPosters';
import PosterByTopics from '../components/PostersByTopics';

const Main = () => {
  return (
    <div>
      <Head />
      <ImportantPosters />
      <NewPosters />
      <PosterByTopics />
    </div>
  );
};

export default Main;
