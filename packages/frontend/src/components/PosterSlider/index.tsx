import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";
import { IPostersList } from "../../types/types";

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

const PostersSlider = ({ title, posters}: IPostersList) => {
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
      {title && <Title>{title}</Title>}
      <CustomSlider {...settings}>
        {posters.map((poster, index) => {
          return (
            <Card key={index} id={poster.id} author={poster.author} title={poster.title} description={poster.description} image={poster.image} tags={poster.tags} />
          )
        })}
      </CustomSlider>
    </NewPosterContainer>
  );
};

export default PostersSlider;
