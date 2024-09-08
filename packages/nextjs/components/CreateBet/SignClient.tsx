import { AttestationResult, EvmChains, SignProtocolClient, SpMode } from "@ethsign/sp-sdk";
import axios from "axios";
import { WalletClient } from "viem";

export default class SignClient {
  private readonly signClient: SignProtocolClient;

  constructor(walletClient: WalletClient) {
    this.signClient = new SignProtocolClient(SpMode.OnChain, {
      chain: EvmChains.sepolia,
      walletClient: walletClient,
    });
  }

  async attest(address: string): Promise<AttestationResult> {
    try {
      const response = await this.signClient.createAttestation({
        schemaId: "0x209",
        data: {
          signer: address,
        },
        indexingValue: address,
      });

      return response;
    } catch (e) {
      throw e;
    }
  }

  private async makeSignProtocolRequest(endpoint: string, options: any) {
    const url = `https://testnet-rpc.sign.global/api/${endpoint}`;
    const res = await axios.request({
      url,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      ...options,
    });
    // Throw API errors
    if (res.status !== 200) {
      throw new Error(JSON.stringify(res));
    }

    return res.data;
  }
}
