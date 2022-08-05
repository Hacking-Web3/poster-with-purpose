import styled from "styled-components";
import { Col, Row } from 'antd';

const HeadContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 50vh;
  margin: 150px auto;
`;

const Title = styled.h1`
  color: black;
  margin: 0px 100px;
  font-size: 88px;
`;

const Image = styled.img`
  margin: 0px 100px;
`;

const Head = () => {
  return (
    <HeadContainer>
      <Row>
        <Col span={12}><Title>Welcome to text text text text text text text</Title></Col>
        <Col span={12}><Image src="tmp_head.png" alt="Head"/></Col>
      </Row>
    </HeadContainer>
  );
};

export default Head;
