"use client";
import Container from "@/components/Container";
import React, { useState } from "react";
import AuctionsHeader from "@/components/Auctions/AuctionsHeader";
import readId from "../utils/readId";
import GetCardAuction from "@/components/Auctions/GetCardAuction";

const Page = () => {
  const [search, setSearch] = useState<string>();
  return (
    <div data-aos="fade-up">
      <Container>
        <AuctionsHeader search={search ?? ""} setSearch={setSearch} />
        <div className="grid 2xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {Array.from({ length: Number(readId()?.toString()) }).map((_, i) => (
            <GetCardAuction id={i} search={search ?? ""} key={i} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Page;
