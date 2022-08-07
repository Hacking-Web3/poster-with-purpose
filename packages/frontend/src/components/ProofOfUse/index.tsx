import { useState } from 'react';
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from "./Card";
import { IPostersList } from "../../types/types";
import ModalUploadProof from "../ModalUploadProof";

const ProofOfUseContainer = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: black;
  font-weight: medium;
  font-size: 28px;
  text-align: center;
  margin-bottom: 50px;
  align-self: flex-start;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  align-content: center;
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

const AddProof = styled.div`
  width: 20vh;
  height: 27vh;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  background-color: #F5F5F5;
  border: 1px solid #AFCAAC;
  border-radius: 10px;
  &:hover {
    background-color: #4A6346;
    cursor: pointer;
  }
`;

const ContentAdd = styled.div`
  background: #DEF3DA;
  border-radius: 30px;
  padding: 10px 20px;
`;

const ProofOfUse = (posters: IPostersList) => {
  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000
  };
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <ProofOfUseContainer>
      <ModalUploadProof isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
      {posters.title && <Title>{posters.title}</Title>}
      <Content>
        <CustomSlider {...settings}>
          {posters.posters.map((poster: any, index: any) => {
            return (
              <Card key={index} id={poster.id} author={poster.author} title={poster.title} description={poster.description} image={poster.image} tags={poster.tags} />
            )
          })}
        </CustomSlider>
        <AddProof onClick={() => setIsModalVisible(true)}>
          <ContentAdd>
            +
          </ContentAdd>
        </AddProof>
      </Content>
    </ProofOfUseContainer>
  );
};

export default ProofOfUse;
