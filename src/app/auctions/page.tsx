"use client";
import Container from "@/components/Container";
import React from "react";
import AuctionsHeader from "@/components/Auctions/AuctionsHeader";
import readId from "../utils/readId";
import GetCardAuction from "../../components/Auctions/GetCardAuction";

const Page = () => {
  return (
    <Container>
      <AuctionsHeader />
      <div className="grid 2xl:grid-cols-3 sm:grid-cols-2 grid-cols gap-4">
        {Array.from({ length: Number(readId()?.toString()) }).map((_, i) => (
          <div key={i}>
            <GetCardAuction id={i} />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Page;
