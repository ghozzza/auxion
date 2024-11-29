"user client";
import Container from "@/components/Container";
import {
  Button,
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Select,
  Textarea,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import React from "react";
import heroImg from "../../../public/img/hero.png";
import Image from "next/image";

const page = () => {
  let i = 0;
  return (
    <Container>
      <div className="grid 2xl:grid-cols-3 sm:grid-cols-2 grid-cols gap-4">
        {/* uint256 id;
        string name;
        string documents;
        string typeDocuments;
        address seller;
        address highestBidder;
        uint256 highestBid;
        bool isEnded;
        uint256 startBid;
        uint256 gapBid;
        uint256 startDate;
        uint256 endDate; */}
        {Array.from({ length: 10 }).map((_, i) => (
          <div className="w-full max-w-lg px-4" key={i}>
            <Fieldset className="space-y-6 rounded-xl dark:bg-white/5 bg-indigo-800/5 p-6 sm:p-10">
              <Legend className="text-2xl text-center font-semibold text-gray-700 dark:text-gray-100">
                Mutant Apes
              </Legend>
              <Field>
                <Image
                  src={heroImg}
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
                  Seller: 0x000{i}
                </Description>
                <div className="flex flex-col">
                  <div>Highest Bidder(0x000{i + 76})</div>
                  <div>{i} ETH</div>
                </div>
              </Field>
              <Field>
                <div className="flex flex-row justify-between">
                  <Label className="text-sm/6 font-medium text-gray-700 dark:text-gray-100">
                    Start Bid: 0.{i + 1} ETH
                  </Label>
                  <Label className="text-sm/6 font-medium text-gray-700 dark:text-gray-100">
                    Gap Bid: 0.0{i + 1} ETH
                  </Label>
                </div>
                <Description className="text-sm/6 text-gray-700 dark:text-gray-100 mt-5">
                  Start(Date) - End(Date) (Still Going/Ended)
                </Description>
                <Button className="rounded dark:bg-indigo-500 bg-indigo-900 py-2 px-4 text-sm text-gray-100 dark:text-gray-100 data-[hover]:bg-indigo-400 data-[hover]:data-[active]:bg-indigo-300 w-full mt-5 duration-300">
                  Bid
                </Button>
              </Field>
            </Fieldset>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default page;
