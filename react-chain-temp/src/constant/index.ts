
export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GÖRLI = 5,
  KOVAN = 42,
  BSC_MAINNET = 56,
  BSC_TESTNET = 97,
}

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

export const currentChainId = Number(
  process.env.NEXT_PUBLIC_CHAIN_ID || 97
) as ChainId;