// "use client";
import {
  Button,
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
  Label,
} from "@headlessui/react";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
interface IBidModal {
  index: number;
}

const fetchData = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

// Usage

const BidModal = (props: IBidModal) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bid, setBid] = useState<any>(null);
  const [convert, setConvert] = useState<any>(null);
  useEffect(() => {
    fetchData("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD")
      .then((data) => setConvert(data))
      .catch((error) => console.error("Error:", error));
  }, [bid]);
  function open() {
    setIsOpen(true);
  }

  function close() {
    setBid(null);
    setConvert(null);
    setIsOpen(false);
  }

  return (
    <>
      <Button
        onClick={open}
        className="rounded dark:bg-indigo-500 bg-indigo-900 py-2 px-4 text-sm text-gray-100 dark:text-gray-100 data-[hover]:bg-indigo-400 data-[hover]:data-[active]:bg-indigo-300 w-full mt-5 duration-300"
      >
        Bid {props.index}
      </Button>

      <Dialog
        open={isOpen}
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
                className="text-base/7 font-medium text-white"
              >
                TITLE {props.index}
              </DialogTitle>
              <Field>
                <Label className="text-sm/6 font-medium text-white">
                  Bid Amount
                </Label>
                <Description className="text-sm/6 text-white/50">
                  Make sure you have enough to bid.
                </Description>
                <div className="grid grid-cols-8 gap-8">
                  <div className="col-span-7">
                    <Input type="number"
                      value={bid ?? ""}
                      onInput={(e) => setBid(e?.target?.value)}
                      className={clsx(
                        "mt-3 block w-full rounded-lg border-none bg-slate-500/70 py-1.5 px-3 text-sm/6 text-white",
                        "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                      )}
                    />
                  </div>
                  <div className="justify-center content-center mt-3">
                    <h1>ETH</h1>
                  </div>
                  <p>US$ {bid ? convert.USD * bid : ""}</p>
                </div>
              </Field>
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
    </>
  );
};

export default BidModal;
