import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, message, Modal, Switch, Upload, Input, Tag } from "antd";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/lib/upload";
import { useAtom } from "jotai";
import { NFTStorage } from "nft.storage";
import { useState } from "react";
import styled from "styled-components";
import { useAccount } from "wagmi";
import { addPopupVisible } from "../state/addPoster/atoms";

const Header = styled.header`
  font-size: 20px;
  line-height: 26px;
  color: #4a6346;
`;

const UploadingRules = styled.span`
  font-size: 11px;
  text-transform: uppercase;

  color: #83a380;
`;

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

// TODO: Fetch tags from firebase
const tagsData = ["Movies", "Books", "Music", "Sports"];

const UploadModal = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isCreator, setIsCreator] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [modalVisible, setModalVisibility] = useAtom(addPopupVisible);
  const [selectedTags, setSelectedTags] = useState<string[]>(["Books"]);
  const { address } = useAccount();
  const handleTagsChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };
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

  const onCreatorSwitch = (checked: boolean) => {
    setIsCreator(checked);
  };

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
      centered
      visible={modalVisible}
      onCancel={() => setModalVisibility(!modalVisible)}
      maskStyle={{ backgroundColor: "#283127", opacity: 0.78 }}
      footer={null}
      width={350}
    >
      <Header>Upload a poster</Header>

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
        <Form.Item label="I'm a creator" name="isCreator">
          <Switch
            checkedChildren="ON"
            unCheckedChildren="OFF"
            checked={isCreator}
            onChange={onCreatorSwitch}
          />
        </Form.Item>
        {!isCreator && (
          <Form.Item label="Author's name" name="author">
            <Input placeholder="Add name" />
          </Form.Item>
        )}
        <Form.Item label="Title" name="title">
          <Input placeholder="Add title" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea
            showCount
            maxLength={150}
            style={{ height: 120 }}
            placeholder="Add short description"
          />
        </Form.Item>
        <Form.Item label="Donations recipient" name="fundsRecipient">
          <Input placeholder="Add polygon address" />
        </Form.Item>
        <Form.Item label="Country" name="country">
          <Input placeholder="Your country" />
        </Form.Item>
        <Form.Item label="Year of creation" name="year">
          <Input placeholder="2022" />
        </Form.Item>
        <Form.Item label="Choose topics" name="tags" className="tags">
          {tagsData.map((tag) => (
            <Tag.CheckableTag
              key={tag}
              checked={selectedTags.indexOf(tag) > -1}
              onChange={(checked) => handleTagsChange(tag, checked)}
            >
              {tag}
            </Tag.CheckableTag>
          ))}
        </Form.Item>
        <UploadingRules>
          By uploading Artwork to Posters  with purpose you agree to attribute
          your creation with creative commons  0 license
        </UploadingRules>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="form-button">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UploadModal;
