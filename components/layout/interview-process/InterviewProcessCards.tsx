"use client";

import React from "react";
import { Icon } from "@iconify/react";

import FeatureCard from "./FeatureCard";

const featuresCategories = [
  {
    key: "generate",
    title: "Generate Questions",
    icon: <Icon icon="solar:mask-happly-linear" width={40} />,
    descriptions: [
      "Create tailored interview questions based on your field of expertise.",
      "Cover a wide range of topics to ensure comprehensive preparation.",
      "Generate role-specific scenarios to test critical thinking.",
    ],
  },
  {
    key: "provide",
    title: "Answer Assistance",
    icon: <Icon icon="solar:magic-stick-3-linear" width={40} />,
    descriptions: [
      "Get AI-powered suggestions to craft impactful answers.",
      "Practice with model answers to refine your responses.",
      "Simulate real-time interviews with Prep AI.",
    ],
  },
  {
    key: "analyze",
    title: "Analyze and Improve",
    icon: <Icon icon="solar:shield-warning-outline" width={40} />,
    descriptions: [
      "Receive detailed feedback on your performance.",
      "Identify strengths and areas for improvement.",
      "Track your progress over time to ensure readiness.",
    ],
  },
];

export default function InterviewProcessCards() {
  return (
    <div className="my-10">
      <div className="text-center">
        <span className="tracking-tight inline font-semibold bg-clip-text text-transparent bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] text-[2.3rem] lg:text-5xl leading-9">
          Trusted Process
        </span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 my-10">
        {featuresCategories.map((category) => (
          <FeatureCard
            key={category.key}
            descriptions={category.descriptions}
            icon={category.icon}
            title={category.title}
          />
        ))}
      </div>
    </div>
  );
}
