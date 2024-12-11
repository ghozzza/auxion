/* eslint-disable react-hooks/rules-of-hooks */
import { useReadContract } from "thirdweb/react";
import { contract } from "../client";

export default function readId(): any {
  const { data, isPending } = useReadContract({
    contract,
    method: "function id() view returns (uint256)",
    params: [],
  });
  return data;
}
