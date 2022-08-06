import styled from "styled-components";
import Posters from "../mocks/posters.json";
import PostersList from "../components/PosterList";
import TagsList from "../components/TagsList";

import Tags from "../mocks/topics.json";

const AllPostersContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  padding-bottom: 100px;
`;

const AllPosters = () => {
  return (
    <AllPostersContainer>
      <PostersList posters={Posters} numberElements={15} actionButton={"extend"} />
      <TagsList title={"Browse by topics"} tags={Tags}  />
    </AllPostersContainer>
  );
};

export default AllPosters;
