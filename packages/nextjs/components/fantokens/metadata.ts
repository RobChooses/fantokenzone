// Spicy fan token addresses (Kayen Protocol)
export interface AssetType {
  name: string;
  balance: string;
  token: string;
  decimal: bigint;
}

export const fanTokenMetadata = {
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
      name: "Paris Saint-Germain",
      token: "PSG",
      decimal: 0n,
    },
    {
      constractAddress: "0x8DBe49c4Dcde110616fafF53b39270E1c48F861a",
      name: "Napoli",
      token: "NAP",
      decimal: 0n,
    },
    {
      constractAddress: "0x945EeD98f5CBada87346028aD0BeE0eA66849A0e",
      name: "Juventus",
      token: "JUV",
      decimal: 0n,
    },
    {
      constractAddress: "0x641d040dB51398Ba3a4f2d7839532264EcdCc3aE",
      name: "AC Milan",
      token: "ACM",
      decimal: 0n,
    },
  ],
  chiliz: [
    {
      constractAddress: "0xF9C0F80a6c67b1B39bdDF00ecD57f2533ef5b688",
      name: "AC Milan",
      token: "ACM",
      decimal: 0n,
    },
    {
      constractAddress: "0x6401b29F40a02578Ae44241560625232A01B3F79",
      name: "Manchester City",
      token: "CITY",
      decimal: 0n,
    },
    {
      constractAddress: "0x454038003a93cf44766aF352F74bad6B745616D0",
      name: "Juventus",
      token: "JUV",
      decimal: 0n,
    },
  ],
};

export const fanTokenMapping: { [key: string]: string } = {
  ACM: "AC Milan",
  AFC: "Arsenal",
  BAR: "FC Barcelona",
  CITY: "Manchester City",
  JUV: "Juventus",
  NAP: "Napoli",
  PSG: "Paris Saint-Germain",
  SPUR: "Tottenham Hotspur",
};
