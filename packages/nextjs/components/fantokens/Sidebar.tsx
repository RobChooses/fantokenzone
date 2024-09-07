import { useEffect, useState } from "react";
import RPC from "./viemRPC";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";
import { GrRefresh } from "react-icons/gr";
import { useAccount } from "wagmi";

const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || "";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x15b32",
  rpcTarget: "https://spicy-rpc.chiliz.com",
  displayName: "Chiliz Spicy Testnet",
  blockExplorerUrl: "http://spicy-explorer.chiliz.com",
  ticker: "CHZ",
  tickerName: "CHZ",
  logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});

const Sidebar: React.FC = () => {
  const [provider, setProvider] = useState<IProvider | null>(null);

  const [isCollapsed, setIsCollapsed] = useState(true);
  const { isConnected } = useAccount();

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);

  const toggleCollapse = async () => {
    setIsCollapsed(!isCollapsed);
    console.log("#### ############## toggle collapse");
    if (!provider) {
      console.log("### provider is not set, return");
      return;
    }

    // Get fan token balances
    if (isCollapsed) {
      const fanTokenBalances = await RPC.getFanTokenBalance(provider);

      for (const fanToken in fanTokenBalances) {
        console.log(
          "#### fanTokenBalance %s %s: ",
          fanTokenBalances[fanToken].name,
          fanTokenBalances[fanToken].balance,
        );
      }
    }
  };

  const getFanTokenBalances = async () => {
    if (!provider) {
      return;
    }
    const fanTokenBalances = await RPC.getFanTokenBalance(provider);

    for (const fanToken in fanTokenBalances) {
      console.log("#### fanTokenBalance %s %s: ", fanTokenBalances[fanToken].name, fanTokenBalances[fanToken].balance);
    }
  };

  const openView = (
    <>
      <button onClick={getFanTokenBalances} className="text-white">
        <GrRefresh />
      </button>
    </>
  );

  const unOpenView = <></>;

  return (
    <div>
      {isConnected && (
        <div
          className={`sidebar ${
            !isCollapsed ? "w-64" : "w-16"
          } h-screen bg-gray-800 text-white p-4 transition-width duration-300 ease-in-out`}
        >
          <button onClick={toggleCollapse} className="text-white focus:outline-none mb-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
          {!isCollapsed && (
            <>
              <h2 className="text-2xl font-bold mb-4">
                My Fan Tokens <span>{!isCollapsed ? openView : unOpenView}</span>
              </h2>

              <ul className="space-y-2">
                <li className="p-2 hover:bg-gray-700 rounded">
                  <a href="#" className="block">
                    Home
                  </a>
                </li>
                <li className="p-2 hover:bg-gray-700 rounded">
                  <a href="#" className="block">
                    About
                  </a>
                </li>
                <li className="p-2 hover:bg-gray-700 rounded">
                  <a href="#" className="block">
                    Services
                  </a>
                </li>
                <li className="p-2 hover:bg-gray-700 rounded">
                  <a href="#" className="block">
                    Contact
                  </a>
                </li>
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
