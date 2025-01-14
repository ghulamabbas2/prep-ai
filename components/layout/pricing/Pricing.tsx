import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Button,
} from "@nextui-org/react";
import { Icon } from "@iconify/react";

const Pricing = () => {
  const features = [
    "Comprehensive questions",
    "Feedback reports or results",
    "You choose time and field",
    "Industry-specific interviews",
    "Expert video tutorials",
    "Technical question practice",
    "Behavioral question practice",
    "Situational question preparation",
    "24/7 AI mentor support",
    "Soft skills training",
  ];

  return (
    <div id="pricing">
      <div className="text-center my-10">
        <span className="tracking-tight inline font-semibold bg-clip-text text-transparent bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] text-[2.3rem] lg:text-5xl leading-9">
          Pricing
        </span>
      </div>

      <Card className="max-w-[400px] p-2 border-solid border-4 border-blue-400">
        <CardHeader className="flex gap-3 mb-3">
          <div className="flex flex-col">
            <p className="text-xl font-extrabold">Pro Version</p>
            <p className="text-md text-default-500">
              Best for all types of users
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex items-baseline space-x-1">
            <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white md:text-3xl lg:text-4xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                $9.99
              </span>
            </h1>
            <p>/ month</p>
          </div>

          <ul className="mt-8 max-w-md space-y-1 text-gray-500 list-inside dark:text-gray-400">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center">
                <Icon icon="hugeicons-tick-02" fontSize={26} color="green" />{" "}
                {feature}
              </li>
            ))}
          </ul>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button
            color="primary"
            className="w-full my-3"
            endContent={<Icon icon="akar-icons:arrow-right" />}
            as={Link}
            href="/subscribe"
          >
            Get Started
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Pricing;
