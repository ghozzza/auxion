"use client";
// import { useReadContract } from "thirdweb/react";
// import { contract } from "./client";
import Hero from "@/components/Home/Hero";
import SectionTitle from "@/components/Home/SectionTitle";
import { Benefits } from "@/components/Home/Benefits";
import { Testimonials } from "@/components/Home/Testimonials";
import { Faq } from "@/components/Home/Faq";

import { benefitOne } from "@/components/data";

// connect to your contract

export default function Home() {
  return (
    <div>
      <Hero />
      <div data-aos="zoom-in">
        <SectionTitle
          preTitle="Auxion Benefits"
          title="The Revolutionary Auction"
        >
          Its designed for both startups and individuals aiming to explore the
          limitless possibilities of blockchain technology. Completely
          open-source, Auxion fosters collaboration and innovation in the
          decentralized auction ecosystem.
        </SectionTitle>
      </div>
      <div data-aos="fade-up">
        <Benefits data={benefitOne} />
      </div>
      <div data-aos="fade-up">
        <SectionTitle
          preTitle="Watch a video"
          title="Learn how to fullfil your needs"
        >
          This section is to highlight a promo or demo video of your product.
          Analysts says a landing page with video has 3% more conversion rate.
          So, don&apos;t forget to add one. Just like this.
        </SectionTitle>
      </div>
      <div data-aos="fade-up">
        <SectionTitle
          preTitle="Testimonials"
          title="Here's what our customers said"
        >
          Testimonials is a great way to increase the brand trust and awareness.
          Use this section to highlight your popular customers.
        </SectionTitle>
      </div>
      <div data-aos="fade-up">
        <Testimonials />
      </div>
      <div data-aos="fade-up">
        <SectionTitle preTitle="FAQ" title="Frequently Asked Questions">
          Answer your customers possible questions here, it will increase the
          conversion rate as well as support or chat requests.
        </SectionTitle>
      </div>
      <div data-aos="fade-up">
        <Faq />
      </div>
    </div>
  );
}
