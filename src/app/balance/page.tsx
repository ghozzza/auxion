"use client";
import Container from "@/components/Container";
import React from "react";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { contract } from "../client";

const Balance = () => {
  const profile = useActiveAccount();
  const { data, isPending } = useGetBalance(profile?.address);

  return (
    <Container>
      <h1 className="text-center text-4xl text-gray-500 dark:text-gray-100">
        Current Balance
      </h1>
      <h1 className="text-center text-2xl text-gray-500 dark:text-gray-100">
        {profile?.address ? profile.address : <p>Loading...</p>}
      </h1>
      <h1 className="text-center text-2xl text-gray-500 dark:text-gray-100">
        {isPending ? <p>Loading...</p> : <p>{data ? "100 " : "0 "}ETH</p>}
      </h1>
    </Container>
  );
};
const useGetBalance = (profile: any) => {
  const { data, isPending } = useReadContract({
    contract,
    method: "function balances(address) view returns (uint256)",
    params: [profile],
  });

  return { data, isPending };
};

// function balances() {

// }

export default Balance;
