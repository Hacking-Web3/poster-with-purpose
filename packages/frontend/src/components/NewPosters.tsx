import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardNewPoster from "./CardNewPoster";
import NewestPosters from "../mocks/posters.json"

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
