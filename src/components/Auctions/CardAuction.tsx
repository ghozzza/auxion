import {
  Button,
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
} from "@headlessui/react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { useState } from "react";
import BidModal from "./BidModal";
import {
  useActiveAccount,
  useReadContract,
  useSendTransaction,
} from "thirdweb/react";
import clsx from "clsx";
import { prepareContractCall } from "thirdweb";
import { contract } from "../../app/client";
import toast, { Toaster } from "react-hot-toast";

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
  const profile = useActiveAccount();
  const [pendingShip, setPendingShip] = useState<number>(0);
  const [showPendingShip, setShowPendingShip] = useState<boolean>(false);
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
  const { mutate: sendTransaction } = useSendTransaction();
  const submitEndAuction = (e: any) => {
    const transaction = prepareContractCall({
      contract,
      method: "function endAuction(uint256 _id)",
      params: [BigInt(props.index)],
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
  };
  const finishAuction = (e: any) => {
    console.log("Finished");
    e.preventDefault();
    const transaction = prepareContractCall({
      contract,
      method: "function finishAuction(uint256 _id)",
      params: [BigInt(props.index)],
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
  };
  const buyerApproval = (e: any) => {
    e.preventDefault();
    const transaction = prepareContractCall({
      contract,
      method: "function buyerApproval(uint256 _id)",
      params: [BigInt(props.index)],
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
  };
  const sellerApproval = (e: any) => {
    e.preventDefault();
    const transaction = prepareContractCall({
      contract,
      method: "function approval(uint256 _id, uint256 _pendingShip)",
      params: [BigInt(props.index), BigInt(pendingShip * 86400)],
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
    setShowPendingShip(false);
  };

  const winner = winnerAuction(props.index);
  console.log(winner);
  return (
    <div className="w-full max-w-lg xl:max-w-lg xl:px-4 mx-auto">
      <Toaster />
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
            <div className="xl:text-[14px] text-[10px]">
              {props.highestBidder}
            </div>
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
          {(props.highestBidder === profile?.address ||
            props.seller === profile?.address) &&
          convertTimeStamp(Date.now()) > props.endDate ? (
            <div>
              <Button
                onClick={submitEndAuction}
                className={clsx(
                  "dark:bg-indigo-500 bg-indigo-900 data-[hover]:bg-indigo-400 data-[hover]:data-[active]:bg-indigo-300",
                  " rounded  py-2 px-4 text-sm text-gray-100 dark:text-gray-100 w-full mt-5 duration-300",
                  props.isEnded ? "hidden" : ""
                )}
              >
                End Auction
              </Button>
              {props.isEnded ? (
                <div>
                  <form onSubmit={finishAuction}>
                    <Button
                      type="submit"
                      disabled={winner[0].isFinished}
                      className={clsx(
                        " rounded  py-2 px-4 text-sm text-gray-100 dark:text-gray-100 w-full mt-5 duration-300",
                        winner[0].buyerApproval && winner[0].sellerApproval
                          ? ""
                          : "hidden",
                        winner[0].isFinished
                          ? "dark:bg-gray-500 bg-gray-900 data-[hover]:bg-gray-400 data-[hover]:data-[active]:bg-gray-300 cursor-not-allowed"
                          : "dark:bg-indigo-500 bg-indigo-900 data-[hover]:bg-indigo-400 data-[hover]:data-[active]:bg-indigo-300"
                      )}
                    >
                      Finish Auction
                    </Button>
                  </form>
                  <div
                    className={
                      winner[0].buyerApproval && winner[0].sellerApproval
                        ? "hidden"
                        : "" +
                          " grid grid-cols-2 gap-2 justify-center content-center"
                    }
                  >
                    <div>
                      {winner[0].sellerApproval ? (
                        <p className="mt-7 text-center">Seller has approve</p>
                      ) : (
                        <div>
                          <Button
                            onClick={() => setShowPendingShip(!showPendingShip)}
                            disabled={profile?.address !== props.seller}
                            className={clsx(
                              "dark:bg-indigo-500 bg-indigo-900 data-[hover]:bg-indigo-400 data-[hover]:data-[active]:bg-indigo-300",
                              " rounded  py-2 px-4 text-sm text-gray-100 dark:text-gray-100 w-full mt-5 duration-300 ",
                              showPendingShip ? "hidden" : "",
                              profile?.address !== props.seller
                                ? "cursor-not-allowed dark:bg-gray-500 bg-gray-900 data-[hover]:bg-gray-400 data-[hover]:data-[active]:bg-gray-300"
                                : "dark:bg-indigo-500 bg-indigo-900 data-[hover]:bg-indigo-400 data-[hover]:data-[active]:bg-indigo-300"
                            )}
                          >
                            <p className="text-center">Seller Approve</p>
                          </Button>
                          <form
                            onSubmit={sellerApproval}
                            className={showPendingShip ? "-mt-1" : "hidden"}
                          >
                            <Label className="relative text-xs">
                              Shipping Days
                            </Label>
                            <div className="grid grid-cols-5 gap-2 -mt-5">
                              <div className="col-span-3">
                                <Input
                                  type="number"
                                  value={pendingShip}
                                  onChange={(e) =>
                                    setPendingShip(Number(e?.target?.value))
                                  }
                                  disabled={profile?.address !== props.seller}
                                  className={clsx(
                                    "mt-5 block w-full rounded-lg border-none bg-slate-500/70 py-1.5 px-3 text-sm/6 text-white ",
                                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25 ",
                                    profile?.address !== props.seller
                                      ? "cursor-not-allowed"
                                      : "",
                                    showPendingShip ? "" : "hidden"
                                  )}
                                />
                              </div>
                              <Button
                                onClick={() => setShowPendingShip(false)}
                                className={clsx(
                                  "dark:bg-indigo-500 bg-indigo-900 data-[hover]:bg-indigo-400 data-[hover]:data-[active]:bg-indigo-300",
                                  " rounded  text-sm text-gray-100 dark:text-gray-100 w-full mt-5 duration-300 ",
                                  showPendingShip ? "" : "hidden"
                                )}
                              >
                                <p className="text-center">X</p>
                              </Button>
                              <Button
                                type="submit"
                                className={clsx(
                                  "dark:bg-indigo-500 bg-indigo-900 data-[hover]:bg-indigo-400 data-[hover]:data-[active]:bg-indigo-300",
                                  " rounded  text-sm text-gray-100 dark:text-gray-100 w-full mt-5 duration-300 ",
                                  showPendingShip ? "" : "hidden"
                                )}
                              >
                                <p className="text-center">V</p>
                              </Button>
                            </div>
                          </form>
                        </div>
                      )}
                    </div>
                    <div>
                      {winner[0].buyerApproval ? (
                        <p className="mt-7 text-center">Buyer has approve</p>
                      ) : (
                        <form onSubmit={buyerApproval}>
                          <Button
                            type="submit"
                            disabled={profile?.address !== props.highestBidder}
                            className={clsx(
                              " rounded  py-2 px-4 text-sm text-gray-100 dark:text-gray-100 w-full mt-5 duration-300",
                              profile?.address !== props.highestBidder
                                ? "cursor-not-allowed dark:bg-gray-500 bg-gray-900 data-[hover]:bg-gray-400 data-[hover]:data-[active]:bg-gray-300"
                                : "dark:bg-indigo-500 bg-indigo-900 data-[hover]:bg-indigo-400 data-[hover]:data-[active]:bg-indigo-300"
                            )}
                          >
                            Buyer Approve
                          </Button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          ) : (
            <div>
              <BidModal
                id={props.index}
                disabled={
                  props.isEnded || convertTimeStamp(Date.now()) > props.endDate
                }
                gapBid={props.gapBid / 10 ** 18}
                highestBid={props.highestBid / 10 ** 18}
                seller={props.seller}
              />
            </div>
          )}
        </Field>
      </Fieldset>
    </div>
  );
};

const winnerAuction = (id: number) => {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function winnerAuction(uint256) view returns (address buyer, address seller, bool buyerApproval, bool sellerApproval, bool isFinished, uint256 finalBid, uint256 pendingShip, uint256 approvalCreated)",
    params: [BigInt(id)],
  });
  return [
    {
      buyer: data?.[0],
      seller: data?.[1],
      buyerApproval: data?.[2],
      sellerApproval: data?.[3],
      isFinished: data?.[4],
      finalBid: data?.[5],
      pendingShip: data?.[6],
      approvalCreated: data?.[7],
    },
  ];
};
export default CardAuction;
