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
}

const AddAuctionModal = (props: IAddAuctionModal) => {
  const [_name, setName] = useState<string>("");
  const [_documents, setDocuments] = useState("");
  const [_typeDocuments, setTypeDocuments] = useState<string>("");
  const [_price, setPrice] = useState("");
  const [_gapBid, setGapBid] = useState("");
  const [_startDate, setStartDate] = useState<number | null>(null);
  const [_endDate, setEndDate] = useState<number | null>(null);

  const { mutate: sendTransaction } = useSendTransaction();
  const toGMT7ISOString = (timestamp: any) => {
    const date = new Date(timestamp + 7 * 60 * 60 * 1000);
    return date.toISOString().slice(0, 16);
  };
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value; // Input value as 'YYYY-MM-DDTHH:mm'
    const localDate = new Date(dateValue); // Convert string to Date object
    const utcTimestamp = localDate.getTime();
    setStartDate(utcTimestamp); // Save UTC timestamp
  };
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateValue = e.target.value; // Input value as 'YYYY-MM-DDTHH:mm'
    const localDate = new Date(dateValue); // Convert string to Date object
    const utcTimestamp = localDate.getTime();
    setEndDate(utcTimestamp); // Save UTC timestamp
  };
  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    setDocuments(file);
  };
  const openAuction = () => {
    const transaction = prepareContractCall({
      contract,
      method:
        "function openAuction(string _name, string _documents, string _typeDocuments, uint256 _price, uint256 _gapBid, uint256 _startDate, uint256 _endDate)",
      params: [
        _name,
        _documents?.name,
        _typeDocuments,
        BigInt(_price * 10 ** 18),
        BigInt(_gapBid * 10 ** 18),
        BigInt(_startDate ?? 0),
        BigInt(_endDate ?? 0),
      ],
    });
    sendTransaction(transaction);
    close();
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!_documents) return;
    const formData = new FormData();
    console.log(formData.append("file", _documents));
    openAuction();
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
      <form onSubmit={handleSubmit}>
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
                value={_name}
                onChange={(e) => setName(e.target.value)}
                className={clsx(
                  "mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white mb-2",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                )}
              />
              <p className="text-sm/6 font-medium text-white">Documents</p>
              <Input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={handleImageUpload}
                //   (e) => setDocuments(e?.target?.files?.[0]?.name || "")
                className={clsx(
                  "mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white mb-2",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                )}
              />
              <p className="text-sm/6 font-medium text-white">Type</p>
              <div className="relative">
                <Select
                  defaultValue={"Others"}
                  value={_typeDocuments ?? "Others"}
                  onChange={(e) => setTypeDocuments(e.target.value)}
                  className={clsx(
                    "mt-2 block w-full appearance-none rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white mb-2",
                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25",
                    "*:text-black"
                  )}
                >
                  <option value="NFT">NFT</option>
                  <option value="RWA">RWA</option>
                  <option value="Others">Others</option>
                </Select>
                <ChevronDownIcon
                  className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
                  aria-hidden="true"
                />
              </div>
              <p className="text-sm/6 font-medium text-white">Start Bid</p>
              <div className="flex flex-row gap-5">
                <div className="justify-center content-center">$ETH</div>
                <div className="w-full">
                  <Input
                    value={_price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    className={clsx(
                      "mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white mb-2",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                  />
                </div>
              </div>
              {_price}
              <p className="text-sm/6 font-medium text-white">Gap Bid</p>
              <div className="flex flex-row gap-5">
                <div className="justify-center content-center">$ETH</div>
                <div className="w-full">
                  <Input
                    value={_gapBid}
                    onChange={(e) => setGapBid(e.target.value)}
                    type="number"
                    className={clsx(
                      "mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white mb-2",
                      "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                    )}
                  />
                </div>
              </div>

              <p className="text-sm/6 font-medium text-white">
                Start Date (GMT +7)
              </p>
              <Input
                value={_startDate ? toGMT7ISOString(_startDate) : ""}
                onChange={handleStartDateChange}
                type="datetime-local"
                className={clsx(
                  "mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white mb-2",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                )}
              />
              <p className="text-sm/6 font-medium text-white">
                End Date (GMT +7)
              </p>
              <Input
                value={_endDate ? toGMT7ISOString(_endDate) : ""}
                onChange={handleEndDateChange}
                type="datetime-local"
                className={clsx(
                  "mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white mb-2",
                  "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                )}
              />
              <div className="mt-4">
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-gray-700 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700"
                  //   onClick={openAuction}
                  type="submit"
                >
                  Confirm
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </form>
    </Dialog>
  );
};

export default AddAuctionModal;
