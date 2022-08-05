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
  margin-bottom: 150px;
`;

const Title = styled.h1`
  color: black;
  font-weight: bold;
  font-size: 28px;
  text-align: center;
`;

const Image = styled.img`
`;

const CustomSlider = styled(Slider)`
  width: 80%;
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
  }
]

const ImportantPosters = () => {
  let navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <ImportantPosterContainer>
      <Title>Most important posters of the week</Title>
      <CustomSlider {...settings}>
        {TopPosters.map((poster, index) => {
          return (
            <div key={index} onClick={() => navigate("/poster")}>
              <Image src="tmp_head.png" alt="Head" />
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
