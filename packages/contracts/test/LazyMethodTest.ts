import { expect } from "chai";
import { Contract } from "ethers";
import { ethers, network } from "hardhat";
import { IERC721Drop__factory } from "../typechain-types";

describe("LazyMethodTest", function () {
  let lazyContract: Contract;
  let NFTCreatorAddress: string = "0x073e06e3a316c59c53b905bf2bf8112475ffca08";

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
    it("Should deploy the contract and init Prints to 0", async function () {
      const LazyContract = await ethers.getContractFactory("LazyMethod");
      await forkingAtBlock(14881640);
      lazyContract = await LazyContract.deploy(NFTCreatorAddress);

      expect(await lazyContract.getPrint()).to.equal(0);
    });
  });

  describe("Hashing", function () {
    it("allows update of prints count", async function () {
      let [userA, userB] = await ethers.getSigners();

      let lazyMethodDomain = {
        name: "Lazy Method",
        version: "1.0",
        chainId: (await ethers.provider.getNetwork()).chainId,
        verifyingContract: lazyContract.address,
      };

      const signature = await userA._signTypedData(
        lazyMethodDomain,
        {
          UpdatePrints: [
            { name: "prints", type: "uint256" },
            { name: "signer", type: "address" },
          ],
        },
        {
          prints: 1,
          signer: userA.address,
        }
      );

      await lazyContract.updatePrints(
        { prints: 1, signer: userA.address },
        signature
      );

      expect(await lazyContract.getPrint()).to.equal(1);
    });
  });

  describe("Create edition", function () {
    it("create an edition", async function () {
      let [userA, userB] = await ethers.getSigners();

      let lazyMethodDomain = {
        name: "Lazy Signing the creation of an edition",
        version: "1.0",
        chainId: (await ethers.provider.getNetwork()).chainId,
        verifyingContract: lazyContract.address,
      };

      let salesConfig = {
        publicSalePrice: ethers.utils.parseEther("1"),
        maxSalePurchasePerAddress: 1,
        publicSaleStart: 10,
        publicSaleEnd: 20,
        presaleStart: 5,
        presaleEnd: 6,
        presaleMerkleRoot: ethers.utils.hexlify(ethers.utils.randomBytes(32))
      }

      const signature = await userA._signTypedData(
        lazyMethodDomain,
        {
          CreateEdition: [
            { name: "creator", type: "address" },
            { name: "editName", type: "string" },
            { name: "royaltyBPS", type: "uint16" },
            { name: "defaultAdmin", type: "address" },
            { name: "saleConfig", type: "IERC721Drop.SalesConfiguration" },
            { name: "description", type: "string" },
            { name: "animationURI", type: "string" },
            { name: "imageURI", type: "string" },
          ],
        },
        {
          creator: userA.address,
          editName: "Edition's name",
          royaltyBPS: 10,
          defaultAdmin: userA.address,
          saleConfig: salesConfig,
          description: "Edition's description",
          animationURI: "",
          imageURI: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
        }
      );

      let contractAddress = await lazyContract.callStatic.createEdition([
        userA.address,
        "Edition's name",
        100,
        10,
        userA.address,
        salesConfig,
        "Edition's description",
        ""],
        signature);

      console.log(contractAddress);

      let createTx = await lazyContract.createEdition([
        userA.address,
        "Edition's name",
        100,
        10,
        userA.address,
        salesConfig,
        "Edition's description",
        ""],
        signature);
      console.log(await createTx.wait());
      
      let contractDeployed = new Contract(contractAddress, IERC721Drop__factory.abi, userA);

      expect(await contractDeployed.name()).to.equal("edition 1");
    });
  });
});
