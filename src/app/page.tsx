"use client";

import Image from "next/image";
import { ConnectButton, useReadContract } from "thirdweb/react";
import thirdwebIcon from "@public/thirdweb.svg";
import { client, contract } from "./client";
import { createThirdwebClient } from "thirdweb";
import Hero from "@/components/Home/Hero";
import SectionTitle from "@/components/Home/SectionTitle";
import { Benefits } from "@/components/Home/Benefits";
import { Video } from "@/components/Home/Video";
import { Testimonials } from "@/components/Home/Testimonials";
import { Faq } from "@/components/Home/Faq";
import { Cta } from "@/components/Home/Cta";

import { benefitOne, benefitTwo } from "@/components/data";

// connect to your contract

export default function Home() {
  const { data, isPending } = useReadContract({
    contract,
    method: "function id() view returns (uint256)",
    params: [],
  });
  return (
    // <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
    //   <h1>Hello World {typeof data ? "ada" : "loading"} !</h1>
    //   <h1>{isPending}</h1>
    // </main>
    <div>
      <Hero />
      <SectionTitle
        preTitle="Auxion Benefits"
        title="The Revolutionary Auction"
      >
        Its designed for both startups and individuals aiming to explore the limitless possibilities of blockchain technology. Completely open-source, Auxion fosters collaboration and innovation in the decentralized auction ecosystem.
      </SectionTitle>
      <Benefits data={benefitOne} />

      <SectionTitle
        preTitle="Watch a video"
        title="Learn how to fullfil your needs"
      >
        This section is to highlight a promo or demo video of your product.
        Analysts says a landing page with video has 3% more conversion rate. So,
        don&apos;t forget to add one. Just like this.
      </SectionTitle>

      <SectionTitle
        preTitle="Testimonials"
        title="Here's what our customers said"
      >
        Testimonials is a great way to increase the brand trust and awareness.
        Use this section to highlight your popular customers.
      </SectionTitle>

      <Testimonials />

      <SectionTitle preTitle="FAQ" title="Frequently Asked Questions">
        Answer your customers possible questions here, it will increase the
        conversion rate as well as support or chat requests.
      </SectionTitle>

      <Faq />

    </div>
  );
}
