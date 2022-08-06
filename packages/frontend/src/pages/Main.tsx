import Head from "../components/Head";
import ImportantPosters from '../components/ImportantPosters';
import NewPosters from '../components/NewPosters';
import PosterByTopics from '../components/PostersByTopics';
import BrowseByTopics from '../components/BrowseByTopics';
import styled from "styled-components";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  width: 100%;
  height: 100%;
  margin-bottom: 100px;
`;

const Main = () => {
  return (
    <MainContainer>
      <Head />
      <ImportantPosters />
      <NewPosters />
      <PosterByTopics />
      <BrowseByTopics />
    </MainContainer>
  );
};

export default Main;
