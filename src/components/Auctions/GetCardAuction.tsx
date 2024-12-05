import { useReadContract } from "thirdweb/react";
import { contract } from "../../app/client";
import CardAuction from "@/components/Auctions/CardAuction";
import heroImg from "../../../public/img/hero.png";
import Loading from "@/components/loading";

const GetCardAuction = ({ id }: { id: number }) => {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function listAuctions(uint256) view returns (uint256 id, string name, string documents, string typeDocuments, address seller, address highestBidder, uint256 highestBid, bool isEnded, uint256 startBid, uint256 gapBid, uint256 startDate, uint256 endDate)",
    params: [BigInt(id + 1)],
  });
  if (isPending) {
    return <Loading />;
  }
  return (
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
  );
};

export default GetCardAuction;
