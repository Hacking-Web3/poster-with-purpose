import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, message, Upload } from "antd";
import Modal from "./common/Modal";
import { IModalInformation } from "../types/types";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/lib/upload";
import { NFTStorage } from "nft.storage";
import { useState } from "react";
import { useAccount } from "wagmi";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = async (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt40M = file.size / 1024 / 1024 < 40;
  if (!isLt40M) {
    message.error("Image must smaller than 40MB!");
  }
  // const client = new NFTStorage({
  // token: process.env.REACT_APP_NFT_STORAGE_TOKEN!,
  // });
  // const cid = await client.storeBlob(file);
  // console.log(cid);
  return isJpgOrPng && isLt40M;
};

const ModalUploadProof = ({
  isModalVisible,
  setIsModalVisible,
}: IModalInformation) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const { address } = useAccount();

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>
  );

  const customReq = (some: any) => {
    const client = new NFTStorage({
      token: process.env.REACT_APP_NFT_STORAGE_TOKEN!,
    });
    client.storeBlob(some.file).then((cid: string) => {
      some.file.cid = cid;
      some.onSuccess(cid);
    });
  };

  const onSubmit = (form: any) => {
    console.log(form);
  };

  return (
    <Modal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      height={"35vh"}
      width={"40vh"}
      overflow={"hidden"}
      title={"Upload a poster"}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        initialValues={{ fundsRecipient: address }}
      >
        <Form.Item name="imageURI">
          <Upload
            name="avatar"
            listType="picture-card"
            className="poster-uploader"
            showUploadList={false}
            // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            customRequest={customReq}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            style={{ width: 284 }}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="form-button">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default ModalUploadProof;
