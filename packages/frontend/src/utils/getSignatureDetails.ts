import { POSTERS_WITH_PURPOSE } from "contracts/constants";

const types = {
  CreateEdition: [
    { name: "creator", type: "address" },
    { name: "name", type: "string" },
    { name: "fundsRecipient", type: "address" },
    { name: "description", type: "string" },
    { name: "imageURI", type: "string" },
  ],
};

export const getSignatureDetails = (chainId: number) => {
  const domain = {
    name: "PostersWithPurpose",
    version: "1.0",
    chainId: chainId,
    verifyingContract: POSTERS_WITH_PURPOSE[chainId],
  };
  console.log(chainId);
  console.log(POSTERS_WITH_PURPOSE);

  return {
    domain,
    types,
  };
};
