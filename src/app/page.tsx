"use client";
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
          preTitle="Testimonials"
          title="Here's what our customers said"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic magni ullam quis accusantium aspernatur incidunt? Soluta a id accusamus architecto!
        </SectionTitle>
      </div>
      <div data-aos="fade-up">
        <Testimonials />
      </div>
      <div data-aos="fade-up">
        <SectionTitle preTitle="FAQ" title="Frequently Asked Questions">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga dolor distinctio alias, aut vitae est!
        </SectionTitle>
      </div>
      <div data-aos="fade-up">
        <Faq />
      </div>
    </div>
  );
}
