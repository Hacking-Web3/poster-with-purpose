import { ref, getDatabase } from "firebase/database";
import { useList, useListVals } from "react-firebase-hooks/database";
import { useParams } from "react-router";
import Posters from "../mocks/posters.json";
import Users from "../mocks/users.json";
import { IPosterCard } from "../types/types";
import PosterPresentation from "../components/PosterPresentation";
import TagsList from "../components/TagsList";
import BackersList from "../components/BackersList";
import ProofOfUse from "../components/ProofOfUse";
import styled from "styled-components";

import firebaseApp from "../services/firebase";

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

type Poster = {
  imageURI: string;
  creator: string;
  description: string;
  signature: string;
  title: string;
  unitsPrinted: number;
};

const database = getDatabase(firebaseApp);

const Poster = () => {
  const { id } = useParams();

  const [snapshots, loading, error] = useListVals<Poster>(
    ref(database, "posters")
  );
  console.log("whatsup");
  console.log(error);
  console.log(loading);
  console.log(snapshots);
  const posters: IPosterCard[] =
    snapshots?.map((val) => ({
      image: `http://nftstorage.link/ipfs/${val.imageURI}`,
      tags: [],
      id: val.imageURI,
      author: val.creator,
      title: val.title,
      description: val.description,
      signature: val.signature,
    })) || [];

  const poster = posters.find((p: IPosterCard) => p.id === id);
  console.log(poster);
  return (
    <div>
      {poster && (
        <PresentationContainer>
          <PosterPresentation {...poster} />
          <ProofOfUse title={"Proof of use:"} posters={Posters} />
          <TagsList
            title={"Topics:"}
            titlePosition={"left"}
            tags={poster.tags}
          />
          <BackersList users={Users} />
        </PresentationContainer>
      )}
    </div>
  );
};

export default Poster;
