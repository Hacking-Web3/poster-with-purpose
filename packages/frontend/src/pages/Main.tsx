import { ref, getDatabase } from "firebase/database";
import { useList, useListVals } from "react-firebase-hooks/database";
import Head from "../components/Head";
import PostersSlider from "../components/PosterSlider";
import PosterByTopics from "../components/PostersByTopics";
import TagsList from "../components/TagsList";
import PostersList from "../components/PosterList";
import styled from "styled-components";

import Posters from "../mocks/posters.json";
import Tags from "../mocks/topics.json";

import firebaseApp from "../services/firebase";
import { IPosterCard } from "types";

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

const database = getDatabase(firebaseApp);

type Poster = {
  imageURI: string;
  creator: string;
  description: string;
  signature: string;
  title: string;
  unitsPrinted: number;
};

const Main = () => {
  const [postersData, loading, error] = useListVals<Poster>(
    ref(database, "posters")
  );
  const posters: IPosterCard[] =
    postersData?.map((val) => ({
      image: `http://nftstorage.link/ipfs/${val.imageURI}`,
      tags: [],
      id: val.imageURI,
      author: val.creator,
      title: val.title,
      description: val.description,
    })) || [];

  const [tagsData, tagsLoading, tagsError] = useListVals<string>(
    ref(database, "tags")
  );
  const tags: string[] = tagsData?.map((tag) => tag.toString()) || [];
  return (
    <MainContainer>
      <Head />
      <PostersList
        title={"Most important posters of the week"}
        posters={posters}
        numberElements={6}
        actionButton={"navigate"}
      />
      <PostersSlider title={"Newest posters"} posters={posters} />
      <PosterByTopics />
      <TagsList title={"Browse by topics"} tags={tags} />
    </MainContainer>
  );
};

export default Main;
