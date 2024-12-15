import { useReadContract } from "thirdweb/react";
import { contract } from "../../app/client";
import CardAuction from "@/components/Auctions/CardAuction";
import heroImg from "../../../public/img/hero.png";
import heroImgLight from "../../../public/img/hero_light.png";
import Loading from "@/components/Loading";
import { useTheme } from "next-themes";
interface IGetCardAuction {
  id: number;
  search: string;
}
const GetCardAuction = (props: IGetCardAuction) => {
  const { theme, setTheme } = useTheme();
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function listAuctions(uint256) view returns (uint256 id, string name, string documents, string typeDocuments, address seller, address highestBidder, uint256 highestBid, bool isEnded, uint256 startBid, uint256 gapBid, uint256 startDate, uint256 endDate)",
    params: [BigInt(props?.id + 1)],
  });
  const searchFilter = (name: string) => {
    return name.includes(props.search.toUpperCase() ?? "");
  };
  if (!isPending) {
    if (searchFilter(data?.[1]?.toUpperCase() ?? "")) {
      return (
        <div>
            <CardAuction
              key={Number(data?.[0]) ?? ""}
              index={Number(data?.[0]) ?? ""}
              name={data?.[1] ?? ""}
              heroImg={theme === "light" ? heroImgLight : heroImg}
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
        
        </div>
      );
    }
  } else {
    return <Loading />;
  }
};

export default GetCardAuction;
