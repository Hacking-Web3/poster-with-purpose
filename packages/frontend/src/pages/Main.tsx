import Head from "../components/Head";
import PostersSlider from '../components/PosterSlider';
import PosterByTopics from '../components/PostersByTopics';
import TagsList from '../components/TagsList';
import PostersList from '../components/PosterList';
import styled from "styled-components";

import Posters from "../mocks/posters.json";
import Tags from "../mocks/topics.json";

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
      <PostersList title={"Most important posters of the week"} posters={Posters} numberElements={6} actionButton={"navigate"}/>
      <PostersSlider title={"Newest posters"} posters={Posters} />
      <PosterByTopics />
      <TagsList title={"Browse by topics"} tags={Tags} />
    </MainContainer>
  );
};

export default Main;
