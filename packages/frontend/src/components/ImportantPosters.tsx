import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImportantPosterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 150px;
`;

const Title = styled.h1`
  color: black;
  font-weight: bold;
  font-size: 28px;
  text-align: center;
`;

const Image = styled.img`
  object-fit: cover;
  width: 90%;
`;

const CustomSlider = styled(Slider)`
  width: 80%;
  height: 100%;
  .slick-next,
  .slick-prev {
    width: 0%;
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
    title: "3"
  },
  {
    title: "4"
  }
]

const ImportantPosters = () => {
  let navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 500,
    // centerMode: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    // autoplay: true,
    // autoplaySpeed: 4000
  };

  return (
    <ImportantPosterContainer>
      <Title>Most important posters of the week</Title>
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
    </ImportantPosterContainer>
  );
};

export default ImportantPosters;
