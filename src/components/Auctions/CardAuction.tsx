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
  name: string;
  heroImg: string | StaticImport;
  type: string;
  seller: string;
  highestBidder: string;
  highestBid: number;
  isEnded: boolean;
  startBid: number;
  gapBid: number;
  startDate: number;
  endDate: number;
}
const CardAuction = (props: CardProps) => {
  const localDate = new Date(); // Convert string to Date object
  const utcTimestamp = localDate.getTime();
  const convertDate = (date: number) => {
    return new Date(date).toLocaleDateString("en-US");
  };
  return (
    <div className="w-full max-w-lg px-4">
      <Fieldset className="space-y-6 rounded-xl dark:bg-white/5 bg-indigo-800/5 p-6 sm:p-10">
        <Legend className="text-2xl text-center font-semibold text-gray-700 dark:text-gray-100">
          {props.name}
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
            {props.type ? props.type : "NFT"}
          </Label>
          <Description className="text-sm/6  text-gray-700/50 dark:text-gray-100/50">
            Seller: {props.seller}
          </Description>
          <div className="flex flex-col">
            <div>Highest Bidder</div>
            <div className="text-[14px]">{props.highestBidder}</div>
            <div>{props.highestBid / 10 ** 18} ETH</div>
          </div>
        </Field>
        <Field>
          <div className="flex flex-row justify-between">
            <Label className="text-sm/6 font-medium text-gray-700 dark:text-gray-100">
              Start Bid: {props.startBid / 10 ** 18} ETH
            </Label>
            <Label className="text-sm/6 font-medium text-gray-700 dark:text-gray-100">
              Gap Bid: {props.gapBid / 10 ** 18} ETH
            </Label>
          </div>
          <Description className="text-sm/6 text-gray-700 dark:text-gray-100 mt-5">
            {convertDate(props.startDate)} - {convertDate(props.endDate)}{" "}
            {props.isEnded || Date.now() > props.endDate
              ? "(Ended)"
              : "(Ongoing)"}
            {props.startDate} || 
            {utcTimestamp}
            {utcTimestamp > props.startDate ? "mulai" : "belum"}
          </Description>
          <BidModal id={props.index} />
        </Field>
      </Fieldset>
    </div>
  );
};

export default CardAuction;
