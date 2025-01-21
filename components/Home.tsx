import { Button } from "@heroui/react";
import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";
import LandingPageStats from "./layout/landing-page-stats/LandingPageStats";
import Testimonials from "./layout/testimonials/Testimonials";
import Pricing from "./layout/pricing/Pricing";
import InterviewProcessCards from "./layout/interview-process/InterviewProcessCards";

const Home = () => {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Button
        className="h-9 overflow-hidden border-1 border-default-100 bg-default-50 px-[18px] py-2 text-small font-normal leading-5 text-default-500"
        radius="full"
        variant="bordered"
      >
        New onboarding experience
        <Icon
          className="flex-none outline-none [&>path]:stroke-[2]"
          icon="solar:arrow-right-linear"
          width={20}
        />
      </Button>
      <div className="inline-block max-w-xl text-center justify-center">
        <span className="tracking-tight inline font-semibold bg-clip-text text-transparent bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] text-[2.3rem] lg:text-5xl leading-9">
          Your Shortcut
        </span>
        <br />
        <span className="tracking-tight inline font-semibold text-[2.3rem] lg:text-5xl leading-9">
          to Interview Success
        </span>
        <div className="w-full  my-2 text-lg lg:text-xl text-default-600 block mt-4">
          AI-powered interview preparation made simple and effective. Fast,
          intuitive, and built for your career goals.
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
        <Button
          className="h-10 bg-default-foreground px-[30px] py-[10px] text-small font-medium leading-5 text-background"
          radius="full"
          as={Link}
          href="/subscribe"
        >
          Try Prep AI Now
        </Button>
        <a href="#pricing">
          <Button
            className="h-10  border-1 border-default-100 px-[16px] py-[10px] text-small font-medium leading-5"
            radius="full"
            variant="bordered"
          >
            See our plans{" "}
            <Icon
              className="text-default-500 [&>path]:stroke-[1.5]"
              icon="solar:arrow-right-linear"
              width={16}
            />
          </Button>
        </a>
      </div>

      <LandingPageStats />

      <Testimonials />

      <Pricing />

      <InterviewProcessCards />
    </section>
  );
};

export default Home;
