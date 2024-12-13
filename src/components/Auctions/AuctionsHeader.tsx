import { Button, Field, Input } from "@headlessui/react";
import React, { useState } from "react";
import clsx from "clsx";
import AddAuction from "./AddAuction";

const AuctionsHeader = () => {
  const [filter1, setFilter1] = useState(false);
  const [filter2, setFilter2] = useState(false);
  const [filter3, setFilter3] = useState(false);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 xl:justify-between xl:mb-5 content-center justify-center">
      <div className="xl:hidden w-full">
        <h1 className="text-4xl text-bold text-center">Auctions</h1>
      </div>
      <div>
        <div className="w-full justify-center content-center xl:w-[31.33rem] xl:max-w-xl px-4 justify-self-center mx-auto">
          <Field>
            <Input
              type="text"
              placeholder="Search..."
              className={clsx(
                "mt-3 block w-full h-12 rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
          </Field>
        </div>
      </div>
      <div className="px-4 block xl:hidden w-full">
        <div className="grid grid-cols-3 w-full h-12 text-center justify-center content-center rounded-lg">
          <div
            className={`${
              filter1 ? "bg-indigo-500" : "bg-white/5"
            } hover:bg-slate-500 py-3 duration-300 rounded-l-lg border-[1px] border-black cursor-pointer`}
            onClick={() => setFilter1(!filter1)}
          >
            <p>NFT</p>
          </div>
          <div
            className={`${
              filter2 ? "bg-indigo-500" : "bg-white/5"
            } hover:bg-slate-500 py-3 duration-300 border-[1px] border-black cursor-pointer`}
            onClick={() => setFilter2(!filter2)}
          >
            <p>RWA</p>
          </div>
          <div
            className={`${
              filter3 ? "bg-indigo-500" : "bg-white/5"
            } hover:bg-slate-500 py-3 duration-300 rounded-r-lg border-[1px] border-black cursor-pointer`}
            onClick={() => setFilter3(!filter3)}
          >
            <p>Others</p>
          </div>
        </div>
      </div>
      <div className="hidden xl:block">
        <h1 className="text-4xl text-bold text-center">Auctions</h1>
      </div>
      <div className="px-4 hidden xl:block">
        <div className="grid grid-cols-3 w-[29rem] h-12 text-center justify-center content-center rounded-lg">
          <div
            className={`${
              filter1 ? "bg-indigo-500" : "bg-white/5"
            } hover:bg-slate-500 py-3 duration-300 rounded-l-lg border-[1px] border-black cursor-pointer`}
            onClick={() => setFilter1(!filter1)}
          >
            <p>NFT</p>
          </div>
          <div
            className={`${
              filter2 ? "bg-indigo-500" : "bg-white/5"
            } hover:bg-slate-500 py-3 duration-300 border-[1px] border-black cursor-pointer`}
            onClick={() => setFilter2(!filter2)}
          >
            <p>RWA</p>
          </div>
          <div
            className={`${
              filter3 ? "bg-indigo-500" : "bg-white/5"
            } hover:bg-slate-500 py-3 duration-300 rounded-r-lg border-[1px] border-black cursor-pointer`}
            onClick={() => setFilter3(!filter3)}
          >
            <p>Others</p>
          </div>
        </div>
      </div>
      <div className="xl:col-span-3 content-center text-center xl:mb-0 mb-5">
        <AddAuction />
      </div>
    </div>
  );
};

export default AuctionsHeader;
