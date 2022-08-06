import { createGlobalStyle } from "styled-components";

// @font-face {
// font-family: Satoshi-Regular;
// src: url("/assets/fonts/Satoshi-Regular.otf");
// }
const GlobalStyle = createGlobalStyle`
  .ant-modal-content {
    border-radius: 10px;
  }
  label {
    color: yellow;
  }
  .poster-uploader {
    margin-top: 32px;

    .ant-upload {
      width: 100%;
      background: transparent;
      border: 1px solid #AFCAAC;
      border-radius: 10px;
    }

  }
  .ant-form label {
    font-size: 11px;
    line-height: 15px;

    /* identical to box height */
    letter-spacing: 0.07em;
    text-transform: uppercase;

    color: #83A380;
  }

  .ant-form .ant-input {
    background: #FFFFFF;
    border: 1px solid #AFCAAC;
    border-radius: 8px;
  }

  .ant-form .ant-input-textarea-show-count::after {
    font-size: 9px;
  }

  .tags {
    .ant-tag {
      font-size: 11px;
      line-height: 24px;
      color: #B588C1;
      background: #F9F1FC;
      border-radius: 30px;

      &.ant-tag-checkable-checked {
        border: 1px solid #B588C1;

        &:after {
          background: #B588C1;
          content: "";
          width: 12px;
          height: 12px;
          dislay: block;
          position: absolute;
          border-radius: 12px; 
        }
      }

      &:hover {
        color: #B588C1;
        border: 1px solid #B588C1;
      }
    }
  }

  .form-button {
    width: 100%;
    height: 50px;

    background: #D8D8DD;
    border-radius: 30px;
    border: 0px;
    box-shadow: none;

    font-size: 18px;
    line-height: 16px;
    text-align: center;
    color: #72748D;
    font-weight: 400;
  }

  .ant-modal {
    max-height: 100%;
    padding: 30px 0px;
  }

  .ant-modal-content {
    height: 100%;
    overflow: scroll;
  }
`;

export default GlobalStyle;
