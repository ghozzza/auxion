"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
const Animationing = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useEffect(() => {
    AOS.init({
      duration: 2000,
      once: true,
      mirror: true,
    });
  });
  return <div>{children}</div>;
};

export default Animationing;
