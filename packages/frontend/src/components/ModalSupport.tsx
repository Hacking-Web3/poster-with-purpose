import { IModalInformation } from "../types/types";
import styled from "styled-components";
import { ethers } from "ethers";
import Modal from "./common/Modal";
import {
  useAccount,
  useBalance,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import { POSTERS_WITH_PURPOSE } from "contracts/constants";
import PostersWithPurposeAbi from "../abi/PostersWithPurposeAbi.json";
import { ChangeEvent, useState } from "react";

const Input = styled.input`
  width: 100%;
  height: 20%;
  background: #ffffff;
  border: 1px solid #afcaac;
  border-radius: 8px;
  color: #4a6346;
  font-family: "Satoshi";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  padding-left: 10px;
  margin-bottom: 20px;
  :hover {
    cursor: pointer;
    border: 1px solid #4a6346;
  }
`;

const Button = styled.button`
  height: 20%;
  width: 100%;
  padding: 2% 5%;
  background: #def3da;
  border-radius: 30px;
  border: none;
  color: #4a6346;
  font-family: "Satoshi";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
  text-align: center;
  margin-right: 10px;
  :hover {
    background: #4a6346;
    color: #ffffff;
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
  font-family: "Satoshi";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 15px;
  text-align: right;
  color: #83a380;
`;

const Label = styled.label`
  position: relative;
  ::after {
    content: "ETH";
    position: absolute;
    top: 0px;
    right: 10px;
    display: block;
    font-family: "Satoshi";
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 20px;
    text-align: right;
    color: #797981;
  }
`;

const ModalSupport = ({
  isModalVisible,
  setIsModalVisible,
  poster,
}: IModalInformation) => {
  // <InputDescription>Aprox. $1400</InputDescription>
  const { address } = useAccount();
  const [amount, setAmount] = useState("0");
  const { data } = useBalance({
    addressOrName: address,
  });
  const { chain } = useNetwork();
  const { config } = usePrepareContractWrite({
    addressOrName: POSTERS_WITH_PURPOSE[chain?.id || 1],
    contractInterface: PostersWithPurposeAbi,
    functionName: "mintNft",
    args: [
      {
        creator: poster?.author,
        name: poster?.title,
        fundsRecipient: poster?.author,
        description: poster?.description,
        imageURI: "ipfs://" + poster?.image?.substring(28),
      },
      poster?.signature,
    ],
    overrides: {
      value: ethers.utils.parseEther(parseFloat(amount).toString()),
    },
  });
  console.log(parseFloat(amount).toString());
  console.log(POSTERS_WITH_PURPOSE[chain?.id || 1]);
  console.log({
    creator: poster?.author,
    name: poster?.title,
    fundsRecipient: poster?.author,
    description: poster?.description,
    imageURI: "ipfs://" + poster?.image?.substring(28),
  });
  console.log("ipfs://" + poster?.image?.substring(28));
  console.log(poster?.signature);
  const {
    data: dataWrite,
    isLoading,
    isSuccess,
    write,
  } = useContractWrite(config);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };
  return (
    <Modal
      isModalVisible={isModalVisible}
      setIsModalVisible={setIsModalVisible}
      height={"35vh"}
      width={"50vh"}
      overflow={"hidden"}
      title={"Support author"}
    >
      <InputDescriptionContainer>
        <InputDescription>Your balance {data?.formatted} ETH</InputDescription>
      </InputDescriptionContainer>
      <Label>
        <Input placeholder="0" onChange={handleChange} />
      </Label>
      <Button
        onClick={() => {
          console.log("SHOULD HAPPEN");
          write?.();
        }}
      >
        Donate
      </Button>
    </Modal>
  );
};

export default ModalSupport;

