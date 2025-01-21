"use client";

import { getPageTitle } from "@/helpers/pageTitles";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const usePageTitle = () => {
  const [title, setTitle] = useState<string>("");
  const [breadcrumbs, setBreadcrumbs] = useState<
    Array<{ name: string; path: string }>
  >([]);

  const pathname = usePathname();

  useEffect(() => {
    const { title, breadcrumb } = getPageTitle(pathname);
    setTitle(title);
    setBreadcrumbs(breadcrumb || [{ name: "Home", path: "/" }]);
  }, [pathname]);

  return { title, breadcrumbs };
};

export default usePageTitle;
