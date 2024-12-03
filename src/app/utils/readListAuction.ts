import { useReadContract } from "thirdweb/react";
import { contract } from "../client";

export default async function readListAuction(id: bigint) {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function listAuctions(uint256) view returns (uint256 id, string name, string documents, string typeDocuments, address seller, address highestBidder, uint256 highestBid, bool isEnded, uint256 startBid, uint256 gapBid, uint256 startDate, uint256 endDate)",
    params: [id],
  });
  return data;
}
