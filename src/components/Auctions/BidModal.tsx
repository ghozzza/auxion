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
import { useActiveAccount, useSendTransaction } from "thirdweb/react";
import {
  prepareContractCall,
  toWei,
} from "thirdweb";
import { contract } from "../../app/client";
import toast from "react-hot-toast";
interface IBidModal {
  id: number;
  disabled: boolean;
  gapBid: number;
  highestBid: number;
  seller: string;
}
const BidModal = (props: IBidModal) => {
  const [isOpen, setIsOpen] = useState(false);
  const [bid, setBid] = useState<any>(null);
  const [convert, setConvert] = useState<any>(null);
  const profile = useActiveAccount();

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

  const { mutate: sendTransaction } = useSendTransaction();

  const processTransaction = async () => {
    try {
      const transaction = prepareContractCall({
        contract,
        method: "function bid(uint256 _id) payable",
        value: toWei(bid),
        params: [BigInt(props.id)],
      });
      sendTransaction(transaction, {
        onError: (error) => {
          console.error("Transaction error:", error);
          toast.error(`Error!`, {
            duration: 5000,
            position: "top-right",
          });
        },
        onSuccess: (result) => {
          console.log("Transaction successful", result);
          toast.success(`Success! Please try to refresh the page.`, {
            duration: 5000,
            position: "top-right",
          });
          close();
        },
      });
    } catch (error) {
      console.error("Bid preparation error:", error);
    }
  };

  const sendToBid = (e: any) => {
    e.preventDefault();
    processTransaction();
    close();
  };
  return (
    <div>
      <Button
        disabled={props.disabled}
        onClick={open}
        className={
          (props.disabled
            ? "bg-slate-600 cursor-not-allowed"
            : "dark:bg-indigo-500 bg-indigo-900 data-[hover]:bg-indigo-400 data-[hover]:data-[active]:bg-indigo-300") +
          " rounded  py-2 px-4 text-sm text-gray-100 dark:text-gray-100 w-full mt-5 duration-300"
        }
      >
        Bid
      </Button>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <form onSubmit={sendToBid}>
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
                  {/* ID {typeof props.id} */}
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
                      <Input
                        type="number"
                        value={bid ?? ""}
                        onChange={(e) => setBid(e?.target?.value)}
                        disabled={profile?.address == props.seller}
                        className={clsx(
                          "mt-3 block w-full rounded-lg border-none bg-slate-500/70 py-1.5 px-3 text-sm/6 text-white ",
                          "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 ",
                          profile?.address == props.seller
                            ? "cursor-not-allowed"
                            : ""
                        )}
                      />
                    </div>
                    <div className="justify-center content-center mt-3">
                      <h1>ETH</h1>
                    </div>
                    <div className="flex flex-row gap-3">
                      <div>
                        <p className="w-full">USD</p>
                      </div>
                      <div>{bid ? convert?.USD * bid : ""}</div>
                    </div>
                  </div>
                </Field>
                <div className="mt-4">
                  <Button
                    disabled={!bid}
                    className={
                      (bid && bid > props.gapBid + props.highestBid
                        ? "bg-indigo-700 data-[hover]:bg-indigo-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-indigo-700"
                        : "bg-gray700 data-[hover]:bg-gray-600 data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-gray-700 cursor-not-allowed") +
                      " inline-flex items-center gap-2 rounded-md  py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none duration-300"
                    }
                    type="submit"
                  >
                    Confirm
                  </Button>
                </div>
                <div className="mt-4">
                  <p className="text-red-400">
                    {profile?.address == props.seller
                      ? "*You can't bid your auction"
                      : ""}
                  </p>
                </div>
              </DialogPanel>
            </div>
          </div>
        </form>
      </Dialog>
    </div>
  );
};
const fetchData = async (url: string): Promise<any> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
    throw error;
  }
};
export default BidModal;
