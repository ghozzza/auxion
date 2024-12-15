"use client";
import Container from "@/components/Container";
import React, { useEffect, useState } from "react";
import {
  useActiveAccount,
  useReadContract,
  useSendTransaction,
} from "thirdweb/react";
import { contract } from "../client";
import Loading from "@/components/Loading";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Input,
} from "@headlessui/react";
import { prepareContractCall } from "thirdweb";
import clsx from "clsx";
import toast, { Toaster } from "react-hot-toast";

const Balance = () => {
  const [balance, setBalance] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [isOpen, setIsOpen] = useState(false);
  const profile = useActiveAccount();
  const { data, isPending } = useGetBalance(profile?.address);

  useEffect(() => {
    setBalance(Number(data));
  }, [data]);

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };
  const maxWithdraw = () => {
    setAmount(Number(data) / 10 ** 18);
  };
  const convertToEth = (value: number) => {
    return value / 10 ** 18;
  };
  const submitWithdraw = (e: any) => {
    e.preventDefault();
    console.log(amount);
    withdrawBalance(amount);
    close();
  };
  const { mutate: sendTransaction } = useSendTransaction();
  const withdrawBalance = (amount: number) => {
    const transaction = prepareContractCall({
      contract,
      method: "function withdraw(uint256 _amount)",
      params: [BigInt(amount * 10 ** 18)],
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
  return (
    <>
      <Toaster />
      <div data-aos="zoom-in" className="mb-[9rem]">
        <Container>
          <div className="border-2 border-indigo-300 px-10 py-10 rounded-lg xl:mx-[26rem] mx-auto border-opacity-25">
            <h1 className="xl:text-4xl font-bold text-gray-500 dark:text-gray-100 text-center">
              Balance
            </h1>
            <h1 className="xl:text-lg text-gray-500 dark:text-gray-100 opacity-35 mb-5 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad,
              laborum.
            </h1>
            <h1 className="xl:text-3xl text-md font-bold text-gray-500 dark:text-gray-100 text-center">
              Your Address:
            </h1>
            <h1 className="xl:text-lg text-[10px] text-gray-500 dark:text-gray-100 mb-5 text-center">
              {profile?.address ? profile.address : ""}
            </h1>
            <h1 className="xl:text-3xl text-md font-bold text-gray-500 dark:text-gray-100 text-center">
              Current Balance:
            </h1>
            <h1 className="xl:text-lg text-md text-gray-500 dark:text-gray-100 text-center mb-5">
              {isPending ? (
                <div className="mt-5">
                  <Loading />
                </div>
              ) : (
                <p>{balance ? convertToEth(balance) : "0 "} ETH</p>
              )}
            </h1>
            <div className="flex justify-center content-center">
              {isPending ? (
                ""
              ) : (
                <>
                  <Button
                    onClick={open}
                    className="inline-flex items-center gap-2 rounded-md bg-indigo-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-indigo-600 data-[open]:bg-indigo-700 data-[focus]:outline-1 data-[focus]:outline-white duration-300"
                  >
                    Withdraw
                  </Button>
                  <Dialog
                    open={isOpen}
                    as="div"
                    className="relative z-10 focus:outline-none"
                    onClose={close}
                  >
                    <form onSubmit={submitWithdraw}>
                      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-slate-600 bg-opacity-20">
                        <div className="flex min-h-full items-center justify-center p-4">
                          <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-white/20 bg-white/ p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                          >
                            <DialogTitle
                              as="h3"
                              className="text-xl font-bold text-white text-center mb-5"
                            >
                              Withdraw Balance
                            </DialogTitle>
                            <div className="flex justify-between content-between">
                              <div>
                                <p className="text-sm/6 font-medium text-white">
                                  Amount
                                </p>
                              </div>
                              <div>Balance: {convertToEth(balance)} ETH</div>
                            </div>
                            <div className="grid grid-cols-7 gap-3 justi">
                              <div className="col-span-6">
                                <Input
                                  type="number"
                                  value={amount}
                                  onChange={(e) =>
                                    setAmount(Number(e.target.value))
                                  }
                                  className={clsx(
                                    "mt-2 block w-full rounded-lg border-none bg-white/5 py-1.5 px-3 text-sm/6 text-white mb-2",
                                    "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
                                  )}
                                />
                              </div>
                              <div className="flex justify-center content-center py-2">
                                <Button
                                  onClick={maxWithdraw}
                                  className="inline-flex items-center gap-2 rounded-md bg-indigo-500 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-indigo-600 data-[open]:bg-indigo-700 data-[focus]:outline-1 data-[focus]:outline-white duration-300"
                                >
                                  Max
                                </Button>
                              </div>
                            </div>
                            <Button
                              type="submit"
                              disabled={
                                amount > convertToEth(balance)
                              }
                              className={
                                (amount > convertToEth(balance)
                                  ? "bg-red-500 cursor-not-allowed"
                                  : "bg-indigo-500") +
                                " inline-flex items-center gap-2 rounded-md  py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-indigo-600 data-[open]:bg-indigo-700 data-[focus]:outline-1 data-[focus]:outline-white duration-300"
                              }
                            >
                              Withdraw
                            </Button>
                          </DialogPanel>
                        </div>
                      </div>
                    </form>
                  </Dialog>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};
const useGetBalance = (profile: any) => {
  const { data, isPending } = useReadContract({
    contract,
    method: "function balances(address) view returns (uint256)",
    params: [profile],
  });

  return { data, isPending };
};

export default Balance;
// look at this site https://github.com/ghozzza/auxion
// src/app/balance/page.tsx. please analyze that files, and analyze the files which contains with that, I have an issue about that, when I input some amount which is the amount is enough to withdraw, sometimes I have error message "MetaMask - RPC Error: Internal JSON-RPC error."