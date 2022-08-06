export enum NETWORK_IDS {
  MAINNET = 1,
  RINKEBY = 4,
}

export type AddressMap = { [chainId: number]: string };

export const ZORA_NFT_CREATOR: AddressMap = {
  [NETWORK_IDS.MAINNET]: "0x073e06e3a316C59c53b905Bf2bF8112475FfcA08",
  [NETWORK_IDS.RINKEBY]: "0xf2162d53e31019f0e964290f68c5e38e27c4e173",
};

export const POSTERS_WITH_PURPOSE: AddressMap = {
  [NETWORK_IDS.RINKEBY]: "0x1c28516c1F40c355b9BdC1DAeEc26353c23fa5b1",
};
