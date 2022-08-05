import { expect } from "chai";
import { ethers } from "hardhat";

describe("LazyMethodTest", function () {

    describe("Deployment", function () {
        it("Shoudl deploy the contract + init Prints to 0", async function () {
            const LazyContract = await ethers.getContractFactory("LazyMethod");
            const lazyContract = await LazyContract.deploy();

            expect(await lazyContract.getPrint()).to.equal(0);
        });
    });
});