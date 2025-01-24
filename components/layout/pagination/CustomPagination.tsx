import { getTotalPages, updateSearchParams } from "@/helpers/helpers";
import { Pagination } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  resPerPage: number;
  filteredCount: number;
}

const CustomPagination = ({ resPerPage, filteredCount }: Props) => {
  const router = useRouter();

  const totalPages = getTotalPages(filteredCount, resPerPage);

  const searchParams = useSearchParams();

  let page = searchParams.get("page") || 1;
  page = Number(page);

  const handlePageChange = (page: number) => {
    let queryParams = new URLSearchParams(window.location.search);
    queryParams = updateSearchParams(queryParams, "page", page.toString());

    const path = `${window.location.pathname}?${queryParams.toString()}`;
    router.push(path);
  };

  return (
    <div className="flex justify-center items-center mt-10">
      <Pagination
        isCompact
        showControls
        showShadow
        initialPage={1}
        total={totalPages}
        page={page}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default CustomPagination;
