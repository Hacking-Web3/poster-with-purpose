import { Carousel } from 'antd';
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Head from "../components/Head";

const Poster = styled.h3`
  height: 50vh;
  color: #fff;
  line-height: 160px;
  text-align: center;
  background: #364d79;
`;

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

const Main = () => {
  let navigate = useNavigate();

  return (
    <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
    }}>
      <Head />
      <Carousel style={{
        width: "100%",
        height: "50vh"
      }} autoplay>
        {TopPosters.map((poster, index) => {
          return (
            <div key={index} onClick={() => navigate("/poster")}>
              <Poster>
                {poster.title}
              </Poster>
            </div>
          )
        })}
      </Carousel>
    </div>
  );
};

export default Main;
