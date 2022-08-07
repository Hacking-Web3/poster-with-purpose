import { IModalInformation } from '../types/types';
import styled from 'styled-components';
import StyledModal from './common/Modal';

const ModalSupport = ({ poster, isModalVisible, setIsModalVisible }: IModalInformation) => {
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <StyledModal visible={isModalVisible} onCancel={handleCancel} footer={null}>
      <h1>Support author</h1>
      <p>Aprox. $1400</p>      
      <p>Your balance $3 000 423</p>
      <input></input>
      <button>Upload</button>
    </StyledModal>
  );
};

export default ModalSupport;