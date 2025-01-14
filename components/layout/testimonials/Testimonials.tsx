import React from "react";
import { User } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { testimonials } from "@/constants/constants";

export default function Testimonials() {
  return (
    <div className="flex flex-col gap-4 my-10">
      <div className="text-center">
        <span className="tracking-tight inline font-semibold bg-clip-text text-transparent bg-gradient-to-b from-[#FF1CF7] to-[#b249f8] text-[2.3rem] lg:text-5xl leading-9">
          Testimonials
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 mt-10">
        {testimonials?.map((testimonial, index) => (
          <div
            key={index}
            className="rounded-medium bg-content1 p-5 shadow-small"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User
                  avatarProps={{
                    src: testimonial?.user?.avatar,
                  }}
                  classNames={{
                    name: "font-medium",
                    description: "text-small",
                  }}
                  name={testimonial?.user?.name}
                />
              </div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Icon
                    key={i}
                    className={
                      i + 1 <= testimonial?.rating
                        ? "text-warning"
                        : "text-default-500"
                    }
                    icon="solar:star-bold"
                  />
                ))}
              </div>
            </div>
            <div className="mt-4 w-full">
              <p className="font-medium text-default-900">
                {testimonial?.title}
              </p>
              <p className="mt-2 text-default-500">{testimonial?.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
