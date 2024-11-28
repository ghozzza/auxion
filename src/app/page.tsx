"use client";

import Image from "next/image";
import { ConnectButton, useReadContract } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client, contract } from "./client";
import { createThirdwebClient } from "thirdweb";
import Hero from "@/components/Hero";

// connect to your contract

export default function Home() {
  const { data, isPending } = useReadContract({
    contract,
    method: "function id() view returns (uint256)",
    params: [],
  });
  return (
    // <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
    //   <h1>Hello World {typeof data ? "ada" : "loading"} !</h1>
    //   <h1>{isPending}</h1>
    // </main>
    <div>
      <Hero />
    </div>
  );
}
