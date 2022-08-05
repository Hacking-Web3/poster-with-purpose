import styled from "styled-components";
import CardPosterOfWeek from "./CardPosterOfWeek";

const ImportantPosterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
`;

const Title = styled.h1`
  color: black;
  font-weight: medium;
  font-size: 28px;
  text-align: center;
  margin-bottom: 50px;
`;

const PosterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.button`
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  color: #4A6346;
  background-color: transparent;
  border: 1px solid #AFCAAC;
  border-radius: 30px;
  padding: 0.75% 4%;
  :hover {
    background: #4A6346;
    color: #FFFFFF;
  }
`;



const TopPosters = [
  {
    author: "Elvis Moss",
    title: "Era of Disinformation",
    description: "2022, Spain / 423 u. printed in last 30 days",
    tags: ["World Justice", "Disinformation", "Change", "Unity"],
    image: "assets/poster1.png"
  },
  {
    author: "Alexander Rybin",
    title: "Unity and Peace",
    description: "2022, Spain / 423 u. printed in last 30 days",
    tags: ["World Justice"],
    image: "assets/poster2.png"
  },
  {
    author: "Anna Apple",
    title: "Era of Disinformation in the new wild world",
    description: "2022, Spain / 423 u. printed in last 30 days",
    tags: ["World Justice", "Disinformation"],
    image: "assets/poster3.png"
  },
  {
    author: "Elvis Moss",
    title: "Era of Disinformation",
    description: "2022, Spain / 423 u. printed in last 30 days",
    tags: ["World Justice", "Unity"],
    image: "assets/poster4.png"
  },
  {
    author: "Alexander Rybin",
    title: "Unity and Peace",
    description: "2022, Spain / 423 u. printed in last 30 days",
    tags: ["Disinformation", "Change", "Unity"],
    image: "assets/poster5.png"
  },
  {
    author: "Anna Apple",
    title: "Era of Disinformation in the new wild world",
    description: "2022, Spain / 423 u. printed in last 30 days",
    tags: ["World Justice", "Disinformation", "Change", "Unity"],
    image: "assets/poster6.png"
  }
];

const ImportantPosters = () => {

  return (
    <ImportantPosterContainer>
      <Title>Most important posters of the week</Title>
      <PosterContainer>
        {TopPosters.map((poster, index) => {
          return (
            <CardPosterOfWeek key={index} author={poster.author} title={poster.title} description={poster.description} image={poster.image} tags={poster.tags} />
          )
        })}
      </PosterContainer>
      <Button>View all</Button>
    </ImportantPosterContainer>
  );
};

export default ImportantPosters;
