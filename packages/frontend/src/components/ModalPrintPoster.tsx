import { IModalInformation } from "../types/types";
import styled from "styled-components";
import Modal from "./common/Modal";

const Button = styled.a`
  height: 100%;
  width: 100%;
  padding: 4% 2%;
  background: #def3da;
  border-radius: 30px;
  border: none;
  color: #4a6346;
  font-family: "Satoshi";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  margin-right: 10px;
  margin-bottom: 10px;
  :hover {
    background: #4a6346;
    color: #ffffff;
    cursor: pointer;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 95%;
`;

const Title = styled.h1`
  color: black;
  font-family: "Satoshi";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: auto;
`;

const Description = styled.p`
  font-family: "Satoshi";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 13px;
  color: #72748d;
`;

const ButtonDescription = styled.p`
  font-family: "Satoshi";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 15px;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  color: #83a380;
`;

const ModalPrintPoster = ({
  poster,
  isModalVisible,
  setIsModalVisible,
}: IModalInformation) => {
  return (
    <Modal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      height={"80vh"}
      width={"50vh"}
      overflow={"scroll"}
      title={"Print a poster"}
    >
      <Content>
        <Image src={poster?.image} />
        <Title>
          <span style={{ fontWeight: "bold" }}>{poster?.author}</span>,{" "}
          {poster?.title}
        </Title>
        <Description>{poster?.description}</Description>
        <Button href={poster?.image} download={poster?.title}>
          Download
        </Button>
        <ButtonDescription>
          to print at home or in you local print center any size you want
        </ButtonDescription>
        <Button href={""}>External print order</Button>
        <ButtonDescription>
          or you can order printing of the poster here online
        </ButtonDescription>
      </Content>
    </Modal>
  );
};

export default ModalPrintPoster;

