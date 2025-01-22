"use client";

import { evaluateUserAnswer } from "@/actions/interview.action";
import { Button } from "@heroui/react";
import React from "react";

const Results = () => {
  const handleClick = () => {
    evaluateUserAnswer();
  };
  return (
    <div>
      <Button onPress={handleClick}>Evaluate</Button>
    </div>
  );
};

export default Results;
