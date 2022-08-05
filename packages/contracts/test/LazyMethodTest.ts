import { expect } from "chai";
import { Contract } from "ethers";
import { ethers } from "hardhat";

describe("LazyMethodTest", function () {
  let lazyContract: Contract;

  describe("Deployment", function () {
    it("Shoudl deploy the contract + init Prints to 0", async function () {
      const LazyContract = await ethers.getContractFactory("LazyMethod");
      lazyContract = await LazyContract.deploy();

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
});
