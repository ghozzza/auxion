"use client";
import Container from "@/components/Container";
import {
  Button,
  Description,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
} from "@headlessui/react";
import clsx from "clsx";
import React, { useState } from "react";
import heroImg from "../../../public/img/hero.png";
import Image from "next/image";
import AuctionsHeader from "@/components/Auctions/AuctionsHeader";
import CardAuction from "@/components/Auctions/CardAuction";

const Page = () => {
  let i = 0;

  return (
    <Container>
      <AuctionsHeader />
      <div className="grid 2xl:grid-cols-3 sm:grid-cols-2 grid-cols gap-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <CardAuction key={i} index={i} heroImg={heroImg} />
        ))}
      </div>
    </Container>
  );
};

export default Page;
