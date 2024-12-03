import {
  Button,
  Description,
  Field,
  Fieldset,
  Label,
  Legend,
} from "@headlessui/react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";
import BidModal from "./BidModal";

interface CardProps {
  index: number;
  heroImg: string | StaticImport;
  //   seller: string;
  //   highestBidder: string;
  //   startBid: string;
  //   gapBid: string;
  //   title: string;
  //   startDate: string;
  //   endDate: string;
}

const CardAuction = (props: CardProps) => {
  return (
    <div className="w-full max-w-lg px-4" key={props.index}>
      <Fieldset className="space-y-6 rounded-xl dark:bg-white/5 bg-indigo-800/5 p-6 sm:p-10">
        <Legend className="text-2xl text-center font-semibold text-gray-700 dark:text-gray-100">
          Mutant Apes
        </Legend>
        <Field>
          <Image
            src={props.heroImg}
            width="616"
            height="617"
            className={"object-cover"}
            alt="Hero Illustration"
            loading="eager"
            placeholder="blur"
          />
        </Field>
        <Field>
          <Label className="text-sm/6 font-medium  text-gray-700 dark:text-gray-100/50">
            Type: NFT/RWA/Certificate
          </Label>
          <Description className="text-sm/6  text-gray-700/50 dark:text-gray-100/50">
            Seller: 0x000{props.index}
          </Description>
          <div className="flex flex-col">
            <div>Highest Bidder(0x000{props.index + 76})</div>
            <div>{props.index} ETH</div>
          </div>
        </Field>
        <Field>
          <div className="flex flex-row justify-between">
            <Label className="text-sm/6 font-medium text-gray-700 dark:text-gray-100">
              Start Bid: 0.{props.index + 1} ETH
            </Label>
            <Label className="text-sm/6 font-medium text-gray-700 dark:text-gray-100">
              Gap Bid: 0.0{props.index + 1} ETH
            </Label>
          </div>
          <Description className="text-sm/6 text-gray-700 dark:text-gray-100 mt-5">
            Start(Date) - End(Date) (Still Going/Ended)
          </Description>
          <BidModal index={props.index} />
        </Field>
      </Fieldset>
    </div>
  );
};

export default CardAuction;
