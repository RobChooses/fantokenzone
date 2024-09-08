import { CHAIN_NAMESPACES } from "@web3auth/base";

// spicy
// export const chainConfig = {
//   chainNamespace: CHAIN_NAMESPACES.EIP155,
//   chainId: "0x15b32",
//   rpcTarget: "https://spicy-rpc.chiliz.com",
//   displayName: "Chiliz Spicy Testnet",
//   blockExplorerUrl: "http://spicy-explorer.chiliz.com",
//   ticker: "CHZ",
//   tickerName: "CHZ",
//   logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
// };

// chiliz mainnet
export const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x15b38",
  rpcTarget: "https://rpc.ankr.com/chiliz",
  displayName: "Chiliz Mainnet",
  blockExplorerUrl: "https://scan.chiliz.com",
  ticker: "CHZ",
  tickerName: "CHZ",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};
