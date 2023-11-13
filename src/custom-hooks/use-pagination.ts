import React from "react";

export default function usePagination() {
  const [page, setPage] = React.useState(1);
  const nextPage = React.useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const prevPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  return {
    page,
    nextPage,
    prevPage,
    setPage,
  };
}
