import React, { useState } from "react";
import {
  Button,
} from "@headlessui/react";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import AddAuctionModal from "./AddAuctionModal";

const AddAuction = () => {
  const [isOpen, setIsOpen] = useState(false);

  function open() {
    setIsOpen(true);
  }
  return (
    <div>
      <Button
        onClick={open}
        className="inline-flex items-center gap-2 rounded-md bg-indigo-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-indigo-600 data-[open]:bg-indigo-700 data-[focus]:outline-1 data-[focus]:outline-white duration-300"
      >
        Add Your Auction
      </Button>
      <AddAuctionModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default AddAuction;
