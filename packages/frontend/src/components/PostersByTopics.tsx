import { useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import postersByTopics from "../mocks/postersByTopics.json";
import { useNavigate } from "react-router-dom";

const NewPosterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  padding-top: 100px;
  padding-bottom: 100px;
  background-color: #f5f5f5;
  padding-left: 50px;
  padding-right: 50px;
`;

const Title = styled.h1`
  color: black;
  font-weight: medium;
  font-size: 28px;
  text-align: center;
  margin-bottom: 50px;
`;

const CustomSlider = styled(Slider)`
  background-color: rgba(145, 225, 254, 0.35);
  width: 80%;
  padding-top: 50px;
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

  .slick-dots {
    width: 80%;
    left: -20%;
  }

  .ft-slick__dots--custom {
    height: 6px;
    width: 85px;
    background-color: #ebebeb;
    margin-top: 20px;
    :hover {
      background-color: grey;
      cursor: pointer;
    }
  }

  .slick-dots li {
    width: 85px;
  }

  .slick-dots .slick-active .ft-slick__dots--custom {
    background-color: #b588c1 !important;
  }
`;

const TopicTitle = styled.h1`
  width: 80%;
  margin-left: 10%;
  color: black;
  font-weight: bold;
  font-size: 18px;
  align-self: flex-start;
  margin-top: 50px;
`;

const PostersContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 50px;
  padding: 0 5%;
`;

const Image = styled.img`
  object-fit: cover;
  width: 25%;
  height: auto;
`;

const PosterByTopics = () => {
  const [topic, setTopic] = useState(postersByTopics[0].topic);
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    afterChange: (current: any) => {
      setTopic(postersByTopics[current].topic);
    },
    customPaging: () => <div className="ft-slick__dots--custom"></div>,
  };

  return (
    <NewPosterContainer>
      <Title>Posters by topics</Title>
      <CustomSlider {...settings}>
        {postersByTopics.map((posters, index) => {
          return (
            <div key={index}>
              <PostersContainer>
                {posters.posters.slice(0, 3).map((poster, index) => (
                  <Image
                    key={index}
                    onClick={() => navigate("/poster/" + poster.id)}
                    src={poster.image}
                    alt="Head"
                  />
                ))}
              </PostersContainer>
            </div>
          );
        })}
      </CustomSlider>
      <TopicTitle>{topic}</TopicTitle>
    </NewPosterContainer>
  );
};

export default PosterByTopics;
