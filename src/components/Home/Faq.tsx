"use client";
import React from "react";
import Container from "@/components/Container";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item, index) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180 transition-all duration-[300ms]" : "transition-all duration-[300ms]"
                      } w-5 h-5 text-indigo-500`}
                    />
                  </Disclosure.Button>
                  <div
                    className={` ${
                      open
                        ? "max-h-[1000px] opacity-100 transition-all duration-[300ms]"
                        : "max-h-0 opacity-0 overflow-hidden transition-all duration-[300ms]"
                    }`}
                  >
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                      {item.answer}
                    </Disclosure.Panel>
                  </div>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
};

const faqdata = [
  {
    question: "What is Auxion?",
    answer:
      "Auxion is a decentralized auction platform built on the Lisk network, providing secure, transparent, and efficient auction solutions powered by blockchain technology.",
  },
  {
    question: "How does Auxion ensure transparency in auctions?",
    answer:
      "All transactions and bids on Auxion are recorded on the blockchain, creating an immutable and transparent ledger that prevents fraud and ensures trust.",
  },
  {
    question: "Why is Auxion built on the Lisk network?",
    answer:
      "The Lisk network offers scalability, security, and flexibility, making it an ideal foundation for building decentralized applications like Auxion.",
  },
  {
    question: "Who can use Auxion?",
    answer:
      "Auxion is designed for individuals, businesses, and organizations looking to conduct secure and decentralized auctions, from digital assets to physical goods.",
  },
];
