import { pageIcons } from "@/constants/pages";

export function getPageIconAndPath(pathname: string): {
  icon: string;
  color: string;
} {
  return pageIcons[pathname];
}

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes?.toString().padStart(2, "0")}:${remainingSeconds
    ?.toString()
    .padStart(2, "0")}`;
};

export const paginate = <T>(
  data: T[],
  currentPage: number,
  itemsPerPage: number
): T[] => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return data?.slice(startIndex, endIndex);
};

export const getTotalPages = (totalItems: number, itemsPerPage: number) => {
  return Math.ceil(totalItems / itemsPerPage);
};

export const updateSearchParams = (
  queryParams: URLSearchParams,
  key: string,
  value: string
) => {
  if (queryParams.has(key)) {
    queryParams.set(key, value);
  } else {
    queryParams.append(key, value);
  }

  return queryParams;
};

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getFirstDayOfMonth = () => {
  const date = new Date();
  return formatDate(new Date(date?.getFullYear(), date?.getMonth(), 1));
};

export const getToday = () => {
  return formatDate(new Date());
};
