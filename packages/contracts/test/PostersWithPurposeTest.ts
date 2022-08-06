import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, network } from "hardhat";
import { IERC721Drop__factory } from "../typechain-types";

describe("PostersWithPurpose test", function () {
  let postersWithPurpose: Contract;
  let NFTCreatorAddress: string = "0x073e06e3a316C59c53b905Bf2bF8112475FfcA08";

  async function forkingAtBlock(blockNumber: number) {
    await network.provider.request({
      method: "hardhat_reset",
      params: [
        {
          forking: {
            // TODO: Remove into env
            jsonRpcUrl:
              "https://eth-mainnet.g.alchemy.com/v2/LjjqK5PekBuJj8FxfyX2ZZLcU1HYZWvI",
            blockNumber: blockNumber,
          },
        },
      ],
    });
  }

  describe("Deployment", function () {
    it("Should deploy the contract and set zora nft creator address", async function () {
      const PostersWithPurpose = await ethers.getContractFactory(
        "PostersWithPurpose"
      );
      await forkingAtBlock(14881640);
      postersWithPurpose = await PostersWithPurpose.deploy(
        NFTCreatorAddress,
        0
      );

      expect(await postersWithPurpose.ZoraNFTCreatorAddress()).to.equal(
        NFTCreatorAddress
      );
    });
  });

  describe("Hashing", function () {
    it("allows creating edition via signature", async function () {
      let [userA, userB] = await ethers.getSigners();

      let postersWithPurposeDomain = {
        name: "PostersWithPurpose",
        version: "1.0",
        chainId: (await ethers.provider.getNetwork()).chainId,
        verifyingContract: postersWithPurpose.address,
      };

      let saleConfig = {
        publicSalePrice: ethers.utils.parseEther("1"),
        maxSalePurchasePerAddress: 1,
        publicSaleStart: 10,
        publicSaleEnd: 20,
        presaleStart: 5,
        presaleEnd: 6,
        presaleMerkleRoot: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
      };

      const signature = await userA._signTypedData(
        postersWithPurposeDomain,
        {
          CreateEdition: [
            { name: "creator", type: "address" },
            { name: "name", type: "string" },
            { name: "fundsRecipient", type: "address" },
            { name: "description", type: "string" },
            { name: "imageURI", type: "string" },
          ],
        },
        {
          creator: userA.address,
          name: "collection's name",
          fundsRecipient: userB.address,
          description: "collection's description",
          imageURI:
            "https://www.unocero.com/noticias/rickroll-lleva-a-record-en-youtube/",
        }
      );

      let contractAddress = await postersWithPurpose.callStatic.createEdition(
        {
          creator: userA.address,
          name: "collection's name",
          fundsRecipient: userB.address,
          description: "collection's description",
          imageURI:
            "https://www.unocero.com/noticias/rickroll-lleva-a-record-en-youtube/",
        },
        signature
      );

      let createTx = await postersWithPurpose.connect(userB).createEdition(
        {
          creator: userA.address,
          name: "collection's name",
          fundsRecipient: userB.address,
          description: "collection's description",
          imageURI:
            "https://www.unocero.com/noticias/rickroll-lleva-a-record-en-youtube/",
        },
        signature
      );
      await createTx.wait();

      let contractDeployed = new Contract(
        contractAddress,
        IERC721Drop__factory.abi,
        userA
      );

      expect(await contractDeployed.name()).to.equal("collection's name");
    });
  });
});
