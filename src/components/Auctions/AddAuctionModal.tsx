import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Input,
  Select,
} from "@headlessui/react";
import clsx from "clsx";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { prepareContractCall } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { contract } from "../../app/client";

interface IAddAuctionModal {
  isOpen: boolean;
  setIsOpen: any;
  close: Function;
}

const AddAuctionModal = (props: IAddAuctionModal) => {
  const [_name, setName] = useState<string>("");
  const [_documents, setDocuments] = useState<string>("");
  const [_typeDocuments, setTypeDocuments] = useState<string>("");
  const [_price, setPrice] = useState<bigint>(BigInt(0));
  const [_gapBid, setGapBid] = useState<bigint>(BigInt(0));
  const [_startDate, setStartDate] = useState<bigint>(BigInt(0));
  const [_endDate, setEndDate] = useState<bigint>(BigInt(0));

  const { mutate: sendTransaction } = useSendTransaction();

  const onClick = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function openAuction(string _name, string _documents, string _typeDocuments, uint256 _price, uint256 _gapBid, uint256 _startDate, uint256 _endDate)",
      params: [
        _name,
        _documents,
        _typeDocuments,
        _price,
        _gapBid,
        _startDate,
        _endDate,
      ],
    });
    sendTransaction(transaction);
  };
  function close() {
    props.setIsOpen(false);
  }
  return (
    <Dialog
      open={props.isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={close}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-md rounded-xl bg-white/20 bg-white/ p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle
              as="h3"
              className="text-base/7 font-medium text-white text-center"
            >
              Add Auction
            </DialogTitle>
            <p className="text-sm/6 font-medium text-white">Product Name</p>
            <Input
              type="text"
              className={clsx(
                "mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white mb-2",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
            <p className="text-sm/6 font-medium text-white">Documents</p>
            <Input
              type="file"
              className={clsx(
                "mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white mb-2",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
            <p className="text-sm/6 font-medium text-white">Type</p>
            <div className="relative">
              <Select
                className={clsx(
                  "mt-2 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white mb-2",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                  "*:text-black"
                )}
              >
                <option value="active">Active</option>
                <option value="paused">Paused</option>
                <option value="delayed">Delayed</option>
                <option value="canceled">Canceled</option>
              </Select>
              <ChevronDownIcon
                className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                aria-hidden="true"
              />
            </div>
            <p className="text-sm/6 font-medium text-white">Start Bid</p>
            <Input
              type="text"
              className={clsx(
                "mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white mb-2",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
            <p className="text-sm/6 font-medium text-white">Gap Bid</p>
            <Input
              type="text"
              className={clsx(
                "mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white mb-2",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
            <p className="text-sm/6 font-medium text-white">Start Date</p>
            <Input
              type="datetime-local"
              className={clsx(
                "mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white mb-2",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
            <p className="text-sm/6 font-medium text-white">End Date</p>
            <Input
              type="datetime-local"
              className={clsx(
                "mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white mb-2",
                "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
              )}
            />
            <div className="mt-4">
              <Button
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                onClick={close}
              >
                Confirm
              </Button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AddAuctionModal;
