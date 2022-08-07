import { Modal } from 'antd';
import React, { useState } from 'react';
import { IModalInformation } from '../types/types';
import styled from 'styled-components';
import StyledModal from './common/Modal';

const ModalPrintPoster = ({ poster, isModalVisible, setIsModalVisible }: IModalInformation) => {
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <StyledModal visible={isModalVisible} onCancel={handleCancel} footer={null}>
      <h1>Print a poster</h1>
      <img src={poster?.image} />
      <p>{poster?.author}</p>
      <p>{poster?.title}</p>
      <p>{poster?.description}</p>
      <button>Download</button>
      <p>to print at home or in you local print center any size you want</p>
      <button>External print order</button>
      <p>or you can order printing of the poster here online</p>
    </StyledModal>
  );
};

export default ModalPrintPoster;