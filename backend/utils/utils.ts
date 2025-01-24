export const getQueryStr = (
  searchParms: URLSearchParams
): { [key: string]: string } => {
  const queryStr: { [key: string]: string } = {};

  searchParms?.forEach((value, key) => {
    queryStr[key] = value;
  });

  return queryStr;
};
