import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, network } from "hardhat";
import { IERC721Drop__factory } from "../typechain-types";
import ERC721Abi from "./ERC721Abi.json";

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
      let [userA, userB] = await ethers.getSigners();
      const PostersWithPurpose = await ethers.getContractFactory(
        "PostersWithPurpose"
      );
      await forkingAtBlock(14881640);
      postersWithPurpose = await PostersWithPurpose.deploy(
        NFTCreatorAddress,
        0,
        3,
        userB.getAddress()
      );

      expect(await postersWithPurpose.ZoraNFTCreatorAddress()).to.equal(
        NFTCreatorAddress
      );
      expect(await postersWithPurpose.getMinDonation()).to.equal(3);
      expect(await postersWithPurpose.getEditionNum()).to.equal(0);
    });
  });

  describe("Hashing", function () {

    async function createEdition(userA: SignerWithAddress, userB: SignerWithAddress, signature: string, URI: string) {
      let contractAddress = await postersWithPurpose.callStatic.createEdition(
        {
          creator: userA.address,
          name: "collection's name",
          fundsRecipient: userB.address,
          description: "collection's description",
          imageURI: URI,
        },
        signature
      );

      let createTx = await postersWithPurpose.connect(userB).createEdition(
        {
          creator: userA.address,
          name: "collection's name",
          fundsRecipient: userB.address,
          description: "collection's description",
          imageURI: URI,
        },
        signature
      );
      await createTx.wait();

      return contractAddress;
    } 

    it("allows creating edition via signature", async function () {
      let [userA, userB] = await ethers.getSigners();
      let image1 = "https://www.unocero.com/noticias/rickroll-lleva-a-record-en-youtube/";
      let image2 = "https://pbs.twimg.com/profile_images/1541920820204797952/RaMNiqHx_400x400.jpg";

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

      const signature1 = await userA._signTypedData(
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
          imageURI: image1,
        }
      );

      let contractAddress = await createEdition(userA, userB, signature1, image1);

      let contractDeployed = new Contract(
        contractAddress,
        IERC721Drop__factory.abi,
        userA
      );

      expect(await postersWithPurpose.getDAOAddress()).to.equal(userB.address);
      expect(await contractDeployed.name()).to.equal("collection's name");
      expect(await contractDeployed.symbol()).to.equal("PWP0");

      const signature2 = await userA._signTypedData(
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
          imageURI: image2,
        }
      );
      
      let contractAddress2 = await createEdition(userA, userB, signature2, image2);

      let contractDeployed2 = new Contract(
        contractAddress2,
        IERC721Drop__factory.abi,
        userA
      );
      expect(await contractDeployed2.symbol()).to.equal("PWP1");
    });
  });

  describe("Minting", function () {
    it("allows minting first edition", async function () {
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

      let prevBalanceA = await userA.getBalance();
      let prevBalanceB = await userB.getBalance();

      let contractAddress = await postersWithPurpose.callStatic.mintNft(
        {
          creator: userA.address,
          name: "collection's name",
          fundsRecipient: userB.address,
          description: "collection's description",
          imageURI:
            "https://www.unocero.com/noticias/rickroll-lleva-a-record-en-youtube/",
        },
        signature,
        { value: ethers.utils.parseEther("0.001") }
      );

      let createTx = await postersWithPurpose.connect(userA).mintNft(
        {
          creator: userA.address,
          name: "collection's name",
          fundsRecipient: userB.address,
          description: "collection's description",
          imageURI:
            "https://www.unocero.com/noticias/rickroll-lleva-a-record-en-youtube/",
        },
        signature,
        { value: ethers.utils.parseEther("0.001") }
      );
      await createTx.wait();

      let postBalanceA = await userA.getBalance();
      let postBalanceB = await userB.getBalance();

      expect(prevBalanceA).to.be.greaterThan(postBalanceA);
      expect(prevBalanceB).to.be.lessThan(postBalanceB);

      let contractDeployed = new Contract(
        contractAddress,
        IERC721Drop__factory.abi,
        userA
      );

      expect(await contractDeployed.name()).to.equal("collection's name");

      let erc721 = new Contract(contractAddress, ERC721Abi, userA);
      expect(await erc721.totalSupply()).to.equal(1);

      let createTx2 = await postersWithPurpose.connect(userB).mintNft(
        {
          creator: userA.address,
          name: "collection's name",
          fundsRecipient: userB.address,
          description: "collection's description",
          imageURI:
            "https://www.unocero.com/noticias/rickroll-lleva-a-record-en-youtube/",
        },
        signature,
        { value: ethers.utils.parseEther("0.001") }
      );
      await createTx2.wait();
      expect(await erc721.totalSupply()).to.equal(2);

      const balanceA = await erc721.balanceOf(userA.address);
      const balanceB = await erc721.balanceOf(userB.address);

      expect(balanceA).to.equal(1);
      expect(balanceB).to.equal(1);

      await expect(postersWithPurpose.connect(userB).mintNft(
        {
          creator: userA.address,
          name: "collection's name",
          fundsRecipient: userB.address,
          description: "collection's description",
          imageURI:
            "https://www.unocero.com/noticias/rickroll-lleva-a-record-en-youtube/",
        },
        signature,
        { value: 0 }
      )).to.be.revertedWith("make some donation to mint");
    });

    it("Shouldn't allowed the purchase", async function () {
      let [userA, userB] = await ethers.getSigners();
      
      let postersWithPurposeDomain = {
        name: "PostersWithPurpose",
        version: "1.0",
        chainId: (await ethers.provider.getNetwork()).chainId,
        verifyingContract: postersWithPurpose.address,
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
            "https://picsum.photos/id/237/536/354",
        }
      );

      let contractAddress = await postersWithPurpose.callStatic.createEdition(
        {
          creator: userA.address,
          name: "collection's name",
          fundsRecipient: userB.address,
          description: "collection's description",
          imageURI:
            "https://picsum.photos/id/237/536/354",
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
            "https://picsum.photos/id/237/536/354",
        },
        signature
      );
      await createTx.wait();

      let contractDeployed = new Contract(
        contractAddress,
        IERC721Drop__factory.abi,
        userA
      );

      await expect(contractDeployed.connect(userB).purchase(1)).to.be.reverted;

      let erc721 = new Contract(contractAddress, ERC721Abi, userB);
      const balanceB = await erc721.balanceOf(userB.address);

      expect(balanceB).to.equal(0);
    });
  });

  describe("Modification", function () {
    it("Should modify the minimum donation OK", async function () {
      let [userA, userB] = await ethers.getSigners();
      await postersWithPurpose.connect(userB).updateMinDonation(5);
      expect(await postersWithPurpose.getMinDonation()).to.equal(5);
    });
  });

  describe("modification of DAOAddress", function () {
    it("Updates the DAO Address OK", async function () {
      let [userA, userB] = await ethers.getSigners();

      let DAOAddress = await postersWithPurpose.getDAOAddress();
      expect(DAOAddress).to.equal(userB.address);

      await postersWithPurpose.connect(userB).updateDAOAddress(userA.address);

      let newDAOAddress = await postersWithPurpose.getDAOAddress();
      expect(newDAOAddress).to.equal(userA.address);
    });

    it("Updates the DAOAddress KO, no right", async function () {
      let [userA, userB] = await ethers.getSigners();

      let DAOAddress = await postersWithPurpose.getDAOAddress();
      expect(DAOAddress).to.equal(userA.address);

      await expect(postersWithPurpose.connect(userB).updateDAOAddress(userA.address)).to.be.revertedWith("You don't have the right to update the address");
    });

    it("Updates the DAOAddress KO, null address", async function () {
      let [userA, userB] = await ethers.getSigners();

      let DAOAddress = await postersWithPurpose.getDAOAddress();
      expect(DAOAddress).to.equal(userA.address);

      let nullAddress = "0x0000000000000000000000000000000000000000";
      await expect(postersWithPurpose.connect(userA).updateDAOAddress(nullAddress)).to.be.revertedWith("Address shouldn't be null address");
    });

  });
});
