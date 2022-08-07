import { IModalInformation } from '../types/types';
import styled from 'styled-components';
import Modal from './common/Modal';

const Input = styled.input`
  width: 100%;
  height: 20%;
  background: #FFFFFF;
  border: 1px solid #AFCAAC;
  border-radius: 8px;
  color: #4A6346;
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  padding-left: 10px;
  margin-bottom: 20px;
  :hover {
    cursor: pointer;
    border: 1px solid #4A6346;
  }
`;

const Button = styled.button`
  height: 20%;
  width: 100%;
  padding: 2% 5%;
  background: #DEF3DA;
  border-radius: 30px;
  border: none;
  color: #4A6346;
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  margin-right: 10px;
  :hover {
    background: #4A6346;
    color: #FFFFFF;
    cursor: pointer;
  } 
`;

const InputDescriptionContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 0px;
  margin-top: 50px;
`;

const InputDescription = styled.p`
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 15px;
  text-align: right;
  color: #83A380;
`;

const Label = styled.label`
  position: relative;
  ::after {
    content: 'MATIC';
    position: absolute;
    top: 0px;
    right: 10px;
    display: block;
    font-family: 'Satoshi';
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    text-align: right;
    color: #797981;
    
  }
`;

const ModalSupport = ({ isModalVisible, setIsModalVisible }: IModalInformation) => {

  return (
    <Modal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      height={'35vh'}
      width={'50vh'}
      overflow={'hidden'}
      title={"Support author"}
    >
      <InputDescriptionContainer>
        <InputDescription>Aprox. $1400</InputDescription>
        <InputDescription>Your balance $3 000 423</InputDescription>
      </InputDescriptionContainer>
      <Label>
        <Input placeholder="0" />
      </Label>
      <Button>Upload</Button>
    </Modal>
  );
};

export default ModalSupport;