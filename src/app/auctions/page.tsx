"use client";
import Container from "@/components/Container";
import {
  Button,
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
} from "@headlessui/react";
import clsx from "clsx";
import React, { useState } from "react";
import heroImg from "../../../public/img/hero.png";
import Image from "next/image";

const Page = () => {
  let i = 0;
  const [filter1, setFilter1] = useState(false);
  const [filter2, setFilter2] = useState(false);
  const [filter3, setFilter3] = useState(false);
  return (
    <Container>
      <div className="grid grid-cols-3 gap-4 justify-between mb-5 content-center">
        <div>
          <div className="w-[31.33rem] max-w-xl px-4">
            <Field>
              <Input
                placeholder="Search..."
                className={clsx(
                  "mt-3 block w-full h-12 rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                )}
              />
            </Field>
          </div>
        </div>
        <div>
          <h1 className="text-4xl text-bold text-center">Auctions</h1>
        </div>
        <div className="px-4">
          <div className="grid grid-cols-3 w-[29rem] h-12 text-center justify-center content-center rounded-lg">
            <div className={`${filter1 ? "bg-indigo-500" : "bg-white/5"} hover:bg-slate-500 py-3 duration-300 rounded-l-lg border-[1px] border-black cursor-pointer`} onClick={() => setFilter1(!filter1)}>
              <p>NFT</p>
            </div>
            <div className={`${filter2 ? "bg-indigo-500" : "bg-white/5"} hover:bg-slate-500 py-3 duration-300 border-[1px] border-black cursor-pointer`}  onClick={() => setFilter2(!filter2)}>
              <p>RWA</p>
            </div>
            <div className={`${filter3 ? "bg-indigo-500" : "bg-white/5"} hover:bg-slate-500 py-3 duration-300 rounded-r-lg border-[1px] border-black cursor-pointer`}  onClick={() => setFilter3(!filter3)}>
              <p>Others</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid 2xl:grid-cols-3 sm:grid-cols-2 grid-cols gap-4">
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

export default Page;
