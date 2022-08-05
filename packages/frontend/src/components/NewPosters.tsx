import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NewPosterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 100px;
  background-color: #fdf8ff;
`;

const Title = styled.h1`
  color: black;
  font-weight: bold;
  font-size: 28px;
  text-align: center;
  margin-bottom: 50px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 80%;
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

const TopPosters = [
  {
    title: "1"
  },
  {
    title: "2"
  },
  {
    title: "3"
  },
  {
    title: "4"
  },
  {
    title: "5"
  },
  {
    title: "6"
  },
  {
    title: "7"
  },
  {
    title: "8"
  },
  {
    title: "9"
  },
  {
    title: "10"
  },
]

const NewPosters = () => {
  let navigate = useNavigate();
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
      <Title>New posters</Title>
      <CustomSlider {...settings}>
        {TopPosters.map((poster, index) => {
          return (
            <div key={index} onClick={() => navigate("/poster")}>
              <Image src="tmp_poster1.png" alt="Head" />
              <p>Title</p>
              <p>Description</p>
              <p>tags</p>
            </div>
          )
        })}
      </CustomSlider>
    </NewPosterContainer>
  );
};

export default NewPosters;
