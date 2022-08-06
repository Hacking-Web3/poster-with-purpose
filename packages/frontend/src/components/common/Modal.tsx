import { Modal } from 'antd';
import styled from 'styled-components';

const StyledModal = styled(Modal)`
  {
    .ant-modal-body {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
  {
    .ant-modal-header {
      display: none;
  }
`;

export default StyledModal;
