import { adminPages, appPages, nestedPages } from "@/constants/pages";
import { match } from "path-to-regexp";

interface PageTitle {
  title: string;
  breadcrumb?: Array<{ name: string; path: string }>;
}

export const getPageTitle = (pathname: string): PageTitle => {
  const pagesToCheck = pathname?.includes("/admin")
    ? adminPages
    : [...appPages, ...nestedPages];

  for (const page of pagesToCheck) {
    const matcher = match(page.path, { decode: decodeURIComponent });

    if (matcher(pathname)) {
      return {
        title: page.title,
        breadcrumb: page.breadcrumb,
      };
    }
  }

  return {
    title: "Not Found",
    breadcrumb: [{ name: "Not Found", path: "/" }],
  };
};
