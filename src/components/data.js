import {
  FaceSmileIcon,
  ChartBarSquareIcon,
  CursorArrowRaysIcon,
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  SunIcon,
} from "@heroicons/react/24/solid";

import benefitOneImg from "../../public/img/benefit-one.png";
import benefitTwoImg from "../../public/img/benefit-two.png";

const benefitOne = {
  title: "Revolutionize Auctions with Blockchain",
  desc: "Auxion allows you to harness the power of blockchain to transform the auction process. Highlighting transparency, security, and efficiency, our platform is the future of decentralized auctions. Explore its benefits below.",
  image: benefitOneImg,
  bullets: [
    {
      title: "Ensure Transparency",
      desc: "Blockchain technology guarantees that every auction transaction is transparent and immutable, building trust among participants.",
      icon: <FaceSmileIcon />,
    },
    {
      title: "Maximize Efficiency",
      desc: "Built on the Lisk network, Auxion streamlines auction processes with reduced costs and faster settlements.",
      icon: <ChartBarSquareIcon />,
    },
    {
      title: "Empower Decentralization",
      desc: "Experience the power of decentralization, where users have control without the need for intermediaries, enhancing fairness in every auction.",
      icon: <CursorArrowRaysIcon />,
    },
  ],
};

const benefitTwo = {
  title: "Offer more benefits here",
  desc: "You can use this same layout with a flip image to highlight your rest of the benefits of your product. It can also contain an image or Illustration as above section along with some bullet points.",
  image: benefitTwoImg,
  bullets: [
    {
      title: "Mobile Responsive Template",
      desc: "Nextly is designed as a mobile first responsive template.",
      icon: <DevicePhoneMobileIcon />,
    },
    {
      title: "Powered by Next.js & TailwindCSS",
      desc: "This template is powered by latest technologies and tools.",
      icon: <AdjustmentsHorizontalIcon />,
    },
    {
      title: "Dark & Light Mode",
      desc: "Nextly comes with a zero-config light & dark mode. ",
      icon: <SunIcon />,
    },
  ],
};


export {benefitOne, benefitTwo};
