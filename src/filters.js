const filters = {
  sortBy: "byEdited",
};

const getFilters = () => filters;

const setFilters = (updates) => {
  if (typeof updates.sortBy === "string") {
    filters.sortBy = updates.sortBy;
  }
};

export { getFilters, setFilters };
