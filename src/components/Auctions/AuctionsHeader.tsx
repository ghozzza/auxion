import { Button, Field, Input } from "@headlessui/react";
import React, { useState } from "react";
import clsx from "clsx";
import AddAuction from "./AddAuction";

const AuctionsHeader = () => {
  const [filter1, setFilter1] = useState(false);
  const [filter2, setFilter2] = useState(false);
  const [filter3, setFilter3] = useState(false);

  return (
    <div className="grid grid-cols-3 gap-4 justify-between mb-5 content-center">
      <div>
        <div className="w-[31.33rem] max-w-xl px-4">
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
      <div>
        <h1 className="text-4xl text-bold text-center">Auctions</h1>
      </div>
      <div className="px-4">
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
      <div className="col-span-3 content-center text-center">
        <AddAuction />
      </div>
    </div>
  );
};

export default AuctionsHeader;
