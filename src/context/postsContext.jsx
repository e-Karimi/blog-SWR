import { createContext } from "react";

export const postsContext = createContext({
  currentPage: 1,
  setCurrentPage: () => {},
  maxPages:1,
});
