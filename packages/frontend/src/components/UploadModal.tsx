import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Form, message, Modal, Switch, Upload, Input, Tag } from "antd";
import {
  RcFile,
  UploadChangeParam,
  UploadFile,
  UploadProps,
} from "antd/lib/upload";
import { useAtom } from "jotai";
import { useState } from "react";
import styled from "styled-components";
import { addPopupVisible } from "../state/addPoster/atoms";

const Header = styled.header`
  font-size: 20px;
  line-height: 26px;
  color: #4a6346;
`;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
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
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onCreatorSwitch = (checked: boolean) => {
    setIsCreator(checked);
  };

  return (
    <Modal
      centered
      visible={modalVisible}
      onCancel={() => setModalVisibility(!modalVisible)}
      maskStyle={{ backgroundColor: "#283127", opacity: 0.78 }}
      footer={null}
    >
      <Header>Upload a poster</Header>

      <Form form={form} layout="vertical">
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
          ) : (
            uploadButton
          )}
        </Upload>
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
        <Form.Item label="Wallet address" name="fundsRecipient">
          <Input placeholder="Add title" />
        </Form.Item>
        <Form.Item label="Country" name="country">
          <Input placeholder="Your country" />
        </Form.Item>
        <Form.Item label="Year of creation" name="year">
          <Input placeholder="2022" />
        </Form.Item>
        <Form.Item label="Year of creation" name="year">
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
        <span>
          By uploading Artwork to Posters  with purpose you agree to attribute
          your creation with creative commons  0 license
        </span>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UploadModal;
