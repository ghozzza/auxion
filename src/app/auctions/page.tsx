"use client";
import Container from "@/components/Container";
import React, { useState } from "react";
import heroImg from "../../../public/img/hero.png";
import AuctionsHeader from "@/components/Auctions/AuctionsHeader";
import CardAuction from "@/components/Auctions/CardAuction";
import { useReadContract } from "thirdweb/react";
import { contract } from "../client";
import Loading from "@/components/loading";
import readId from "../utils/readId";
import readListAuction from "../utils/readListAuction";

const Page = () => {
  let i = 0;
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function listAuctions(uint256) view returns (uint256 id, string name, string documents, string typeDocuments, address seller, address highestBidder, uint256 highestBid, bool isEnded, uint256 startBid, uint256 gapBid, uint256 startDate, uint256 endDate)",
    params: [BigInt(1)],
  });
  const [id, setId] = useState(Number(readId()));
  console.log(readId())
  return (
    <Container>
      <AuctionsHeader />
      <div className="grid 2xl:grid-cols-3 sm:grid-cols-2 grid-cols gap-4">
        {/* {readListAuction(readId() ?? BigInt(0))} */}
        {id}
        {readId().toString()}
        {isPending ? (
          <Loading />
        ) : (
          <CardAuction
            key={Number(data?.[0]) ?? ""}
            index={Number(data?.[0]) ?? ""}
            name={data?.[1] ?? ""}
            heroImg={heroImg}
            type={data?.[3] ?? ""}
            seller={data?.[4] ?? ""}
            highestBidder={data?.[5] ?? ""}
            highestBid={Number(data?.[6]) ?? ""}
            isEnded={data?.[7] ?? false}
            startBid={Number(data?.[8]) ?? ""}
            gapBid={Number(data?.[9]) ?? ""}
            startDate={Number(data?.[10]) ?? ""}
            endDate={Number(data?.[11]) ?? ""}
          />
        )}
        {Array.from({ length: 10 }).map((_, i) => (
          <CardAuction
            key={i}
            index={i}
            name="Mutant Apes"
            heroImg={heroImg}
            type="NFT"
            seller="0x0"
            highestBidder="0x00"
            highestBid={1}
            isEnded={false}
            startBid={1}
            gapBid={1}
            startDate={1}
            endDate={1}
          />
        ))}
      </div>
    </Container>
  );
};

export default Page;
