"use client"
import Container from '@/components/Container'
import React from 'react'
import { useReadContract } from "thirdweb/react";
import { contract } from "../client";



const Balance = () => {
    const { data, isPending } = useReadContract({
        contract,
        method:
          "function balances(address) view returns (uint256)",
        params: [],
      });
  return (
    <Container>
        <h1 className="text-center text-4xl">
            Current Balance
        </h1>
        {data}
        {isPending}
    </Container>
  )
}

export default Balance