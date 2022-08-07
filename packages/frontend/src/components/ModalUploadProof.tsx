import { IModalInformation } from '../types/types';
import styled from 'styled-components';
import StyledModal from './common/Modal';

const ModalUploadProof = ({ isModalVisible, setIsModalVisible }: IModalInformation) => {
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <StyledModal visible={isModalVisible} onCancel={handleCancel} footer={null}>
      <h1>Upload a photo</h1>
      <div>
        <input type="file" />
      </div>
      <button>Upload</button>
    </StyledModal>
  );
};

export default ModalUploadProof;