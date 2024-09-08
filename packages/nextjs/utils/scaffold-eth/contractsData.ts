import scaffoldConfig from "~~/scaffold.config";
import { contracts } from "~~/utils/scaffold-eth/contract";

export function getAllContracts() {
  const contractsData = contracts?.[scaffoldConfig.targetNetworks[0].id]; // spicy
  // const contractsData = contracts?.[scaffoldConfig.targetNetworks[3].id]; // hardhat
  return contractsData ? contractsData : {};
}
