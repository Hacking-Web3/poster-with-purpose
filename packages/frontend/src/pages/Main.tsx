import Head from "../components/Head";
import ImportantPosters from '../components/ImportantPosters';
import NewPosters from '../components/NewPosters';
import PosterByTopics from '../components/PostersByTopics';
import BrowseByTopics from '../components/BrowseByTopics';

const Main = () => {
  return (
    <div>
      <Head />
      <ImportantPosters />
      <NewPosters />
      <PosterByTopics />
      <BrowseByTopics />
    </div>
  );
};

export default Main;
