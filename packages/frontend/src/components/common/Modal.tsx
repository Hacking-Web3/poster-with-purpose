import { Modal } from 'antd';
import styled from 'styled-components';
import React from 'react';

const MyModal = styled(Modal)`  
  {
    .ant-modal-header {
      display: none;
    }
  }
  {
    .ant-modal-content {
      height: 100%;
      display: flex;
      flex-direction: column;
      width: 100%;
      padding-top: 10px;
      padding-right: 20px;
      overflow: hidden;
    }
  }
  {
    .ant-modal-body {
      height: 100%;
      &::-webkit-scrollbar-track {
        margin-bottom: 20vh;
        margin-top: 5vh;
        background:  #EBEBEB;
      }
      &::-webkit-scrollbar {
        width: 15px;
        background-color: transparent;
        display: block;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #B588C1;        
      }
  }
`;

const ModalTitle = styled.h1`
  font-family: 'Satoshi';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 26px;
  color: #4A6346;
`;

interface IProps {
  isModalVisible: boolean;
  setIsModalVisible: (isModalVisible: boolean) => void;
  children: React.ReactNode;
  height: string;
  width: string;
  overflow: "visible" | "hidden" | "clip" | "scroll" | "auto";
  title?: string;
}

const StyledModal = ({ isModalVisible, setIsModalVisible, children, height, width, overflow, title }: IProps) => {
  return (
    <MyModal centered width={width} visible={isModalVisible} style={{ height: height }} bodyStyle={{ overflowY: overflow }} onCancel={() => setIsModalVisible(false)} footer={null}>
      {title && <ModalTitle>{title}</ModalTitle>}
      {children}
    </MyModal>
  );
};

export default StyledModal;
