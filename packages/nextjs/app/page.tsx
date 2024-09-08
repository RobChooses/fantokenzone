"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Fan Token Zone</span>
          </h1>
          <h1 className="text-center py-10">
            <span className="block text-2xl mb-2">Login with your social account using web3auth</span>
            <span className="block text-2xl mb-2">to manage all your fan tokens in one place!</span>
          </h1>
          <h1 className="text-center py-10">
            <span className="block text-2xl mb-2">Using fan tokens make predictions against your rivals</span>
          </h1>

          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
