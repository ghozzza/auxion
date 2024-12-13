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

  const convertDateTime = (date: number) => {
    const dateConvert = new Date(date * 1000);
    const hours = dateConvert.getHours();
    const minutes = "0" + dateConvert.getMinutes();
    const formattedTime = hours + ":" + minutes.substr(-2);
    const formattedDate = new Date(date * 1000).toLocaleDateString("en-US");

    return `${formattedDate} ${formattedTime}`;
  };

  const convertTimeStamp = (date: number) => {
    return Math.floor(date / 1000);
  };

  return (
    <div className="w-full max-w-lg xl:max-w-lg xl:px-4 mx-auto">
      <Fieldset className="space-y-6 rounded-xl dark:bg-white/5 bg-indigo-800/5 p-5 sm:p-10">
        <Legend className="text-2xl text-center font-semibold text-gray-700 dark:text-gray-100">
          {props.name}
        </Legend>
        <Field>
          <Image
            src={props.heroImg}
            width="616"
            height="617"
            className={"object-cover size-fit text-center mx-auto"}
            alt="Hero Illustration"
            loading="eager"
            placeholder="blur"
          />
        </Field>
        <Field>
          <Label className="xl:text-sm/6 text-[12px] font-medium  text-gray-700 dark:text-gray-100/50">
            {props.type ? props.type : "NFT"}
          </Label>
          <Description className="xl:text-sm/6 text-[12px]  text-gray-700/50 dark:text-gray-100/50">
            Seller: {props.seller}
          </Description>
          <div className="flex flex-col xl:text-base text-sm">
            <div>Highest Bidder</div>
            <div className="xl:text-[14px] text-[10px]">{props.highestBidder}</div>
            <div>{props.highestBid / 10 ** 18} ETH</div>
          </div>
        </Field>
        <Field>
          <div className="flex xl:flex-row flex-col justify-between">
            <Label className="text-sm/6 font-medium text-gray-700 dark:text-gray-100">
              Start Bid: {props.startBid / 10 ** 18} ETH
            </Label>
            <Label className="text-sm/6 font-medium text-gray-700 dark:text-gray-100">
              Gap Bid: {props.gapBid / 10 ** 18} ETH
            </Label>
          </div>
          <Description className="text-sm/6 text-gray-700 dark:text-gray-100 mt-5 text-center xl:text-left xl:text-base">
            {convertDateTime(props.startDate)} -{" "}
            {convertDateTime(props.endDate)}{" "}
            {props.isEnded || convertTimeStamp(Date.now()) > props.endDate
              ? "(Ended)"
              : "(Ongoing)"}
          </Description>
          <BidModal id={props.index} disabled={props.isEnded || convertTimeStamp(Date.now()) > props.endDate ? true : false} />
        </Field>
      </Fieldset>
    </div>
  );
};

export default CardAuction;
