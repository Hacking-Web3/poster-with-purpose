import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardNewPoster from "./CardNewPoster";

const NewPosterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 100px;
  background-color: rgba(217, 117, 244, 0.05);
`;

const Title = styled.h1`
  color: black;
  font-weight: medium;
  font-size: 28px;
  text-align: center;
  margin-bottom: 50px;
`;

const CustomSlider = styled(Slider)`
  width: 90%;
  height: 100%;
  .slick-next,
  .slick-prev {
    z-index: 1;
  }
  .slick-prev:before,
  .slick-next:before {
    font-size: 50px;
    line-height: 0;
    color: black;
  }
`

const NewestPosters = [
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
  },
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
  },
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

const NewPosters = () => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <NewPosterContainer>
      <Title>Newest posters</Title>
      <CustomSlider {...settings}>
        {NewestPosters.map((poster, index) => {
          return (
            <CardNewPoster key={index} author={poster.author} title={poster.title} description={poster.description} image={poster.image} tags={poster.tags} />
          )
        })}
      </CustomSlider>
    </NewPosterContainer>
  );
};

export default NewPosters;
