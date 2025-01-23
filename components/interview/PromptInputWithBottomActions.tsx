"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { Icon } from "@iconify/react";

import PromptInput from "./PromptInput";

export default function PromptInputWithBottomActions({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [prompt, setPrompt] = useState<string>(value);

  const handleValueChange = (value: string) => {
    setPrompt(value);
    onChange(value);
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <form className="flex w-full flex-col items-start rounded-medium bg-default-100 transition-colors hover:bg-default-200/70">
        <PromptInput
          classNames={{
            inputWrapper: "!bg-transparent shadow-none",
            innerWrapper: "relative",
            input: "pt-1 pl-2 pb-6 !pr-10 text-medium",
          }}
          minRows={3}
          radius="lg"
          value={prompt}
          variant="flat"
          onValueChange={handleValueChange}
        />
        <div className="flex w-full items-center justify-between gap-2 overflow-scroll px-4 pb-4">
          <div className="flex w-full gap-1 md:gap-3">
            <Button
              size="sm"
              startContent={
                <Icon
                  className="text-default-500"
                  icon="solar:soundwave-linear"
                  width={18}
                />
              }
              variant="flat"
            >
              Type with Voice
            </Button>
          </div>
          <p className="py-1 text-tiny text-default-400">
            Chars:{prompt?.length}
          </p>
        </div>
      </form>
    </div>
  );
}
