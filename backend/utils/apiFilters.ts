class APIFilters {
  query: any;
  queryStr: any;

  constructor(query: any, queryStr: any) {
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    const queryCopy = { ...this.queryStr };

    const removeFields = ["page"];
    removeFields.forEach((el) => delete queryCopy[el]);

    this.query = this.query.find(queryCopy);

    return this;
  }

  pagination(resPerPage: number) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }

  sort() {
    this.query = this.query.sort("-createdAt");
    return this;
  }
}

export default APIFilters;
