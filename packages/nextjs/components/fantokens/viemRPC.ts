import { fanTokenMetadata } from "./metadata";
import { AssetType } from "./metadata";
import type { IProvider } from "@web3auth/base";
import { createPublicClient, createWalletClient, custom, erc20Abi, formatUnits } from "viem";
import { chiliz, mainnet, polygonAmoy, sepolia, spicy } from "viem/chains";
// import { galadrielChainConfig } from "../fantokens/galadrielconfig";
import { galadriel } from "viem/chains";

const getViewChain = (provider: IProvider) => {
  switch (provider.chainId) {
    case "1":
      return mainnet;
    case "0x13882":
      return polygonAmoy;
    case "0xaa36a7":
      return sepolia;
    case "0x15b32":
      return spicy;
    case "0x15b38":
      return chiliz;
    case "0xaa289":
      return galadriel;
    default:
      return mainnet;
  }
};

const getFanTokenBalance = async (provider: IProvider): Promise<Record<string, AssetType>> => {
  try {
    const publicClient = createPublicClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    const walletClient = createWalletClient({
      chain: getViewChain(provider),
      transport: custom(provider),
    });

    // User wallet address
    const address = await walletClient.getAddresses();

    const assetDictionary: Record<string, AssetType> = {};

    const fanTokens = fanTokenMetadata.chiliz;
    // const fanTokens = fanTokenMetadata.spicy;

    for (const fanToken of fanTokens) {
      const balance = await publicClient.readContract({
        address: fanToken.constractAddress,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address[0]], // user wallet add
      });
      console.log("# Found balance in %s for token %s of %s", address[0], fanToken.name, balance);
      if (balance > 0) {
        assetDictionary[fanToken.token] = {
          name: fanToken.name,
          balance: formatUnits(balance, Number(fanToken.decimal)),
          decimal: fanToken.decimal,
          token: fanToken.token,
        };
      }
    }

    return assetDictionary;
  } catch (error) {
    throw new Error("Error fetching fan token");
  }
};

export default { getFanTokenBalance };
