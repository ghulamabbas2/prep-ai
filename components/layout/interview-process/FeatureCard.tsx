"use client";

import React from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";

export type FeatureCardProps = {
  title: string;
  descriptions: string[];
  icon: React.ReactNode;
};

const FeatureCard = ({ title, descriptions = [], icon }: FeatureCardProps) => {
  return (
    <Card className="bg-content2" shadow="none">
      <CardHeader className="flex flex-col gap-2 px-4 pb-4 pt-6">
        {icon}
        <p className="text-medium text-content2-foreground">{title}</p>
      </CardHeader>
      <CardBody className="flex flex-col gap-2">
        {descriptions.map((description, index) => (
          <div
            key={index}
            className="flex min-h-[50px] rounded-medium bg-content3 px-3 py-2 text-content3-foreground"
          >
            <p className="text-small">{description}</p>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export default FeatureCard;
