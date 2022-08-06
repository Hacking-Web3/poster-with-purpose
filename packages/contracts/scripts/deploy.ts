import { ethers, network } from "hardhat";
import { ZORA_NFT_CREATOR } from "../constants";

async function main() {
  const { chainId } = network.config;
  if (!chainId) {
    console.error("No chain id is specified");
    return;
  }
  const ZoraNFTCreatorAddress = ZORA_NFT_CREATOR[chainId];
  if (!ZoraNFTCreatorAddress) {
    console.error("No nft creator address is known for this network");
    return;
  }

  const PostersWithPurpose = await ethers.getContractFactory(
    "PostersWithPurpose"
  );
  const postersWithPurpose = await PostersWithPurpose.deploy(
    ZoraNFTCreatorAddress,
    0,
    1
  );

  await postersWithPurpose.deployed();

  console.log("Posters With Purpose deployed:", postersWithPurpose.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
