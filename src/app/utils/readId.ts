import { useReadContract } from "thirdweb/react";
import { contract } from "../client";

export default async function readId() {
  const { data, isPending } = useReadContract({
    contract,
    method: "function id() view returns (uint256)",
    params: [],
  });
  const dataId = data;

  return dataId;
}
