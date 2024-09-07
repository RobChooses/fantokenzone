// Spicy fan token addresses (Kayen Protocol)
export interface AssetType {
  name: string;
  balance: string;
  token: string;
  decimal: bigint;
}

const fanTokenMetadata = {
  spicy: [
    {
      constractAddress: "0x44B190D30198F2E585De8974999a28f5c68C6E0F",
      name: "Arsenal",
      token: "AFC",
      decimal: 0n,
    },
    {
      constractAddress: "0x66F80ddAf5ccfbb082A0B0Fae3F21eA19f6B88ef",
      name: "Manchester City",
      token: "CITY",
      decimal: 0n,
    },
    {
      constractAddress: "0x9B9C9AAa74678FcF4E1c76eEB1fa969A8E7254f8",
      name: "Tottenham Hotspur",
      token: "SPUR",
      decimal: 0n,
    },
    {
      constractAddress: "0x7F73C50748560BD2B286a4c7bF6a805cFb6f735d",
      name: "FC Barcelona",
      token: "BAR",
      decimal: 0n,
    },
    {
      constractAddress: "0xb0Fa395a3386800658B9617F90e834E2CeC76Dd3",
      name: "Paris Saint-Germain (PSG)",
      token: "PSG",
      decimal: 0n,
    },
  ],
};

export default fanTokenMetadata;
