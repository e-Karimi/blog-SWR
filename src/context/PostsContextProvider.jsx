/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { postsContext } from "./postsContext";
import { useEffect, useState } from "react";
import usePosts from "./../hooks/usePosts";

const PostsContextProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);

  const { data: allPosts } = usePosts();

  useEffect(() => {
    getPostsPagesCount();
  }, [allPosts]);

  const getPostsPagesCount = () => {
    allPosts && setMaxPages(Math.ceil(allPosts?.length / 9));
  };

  const contextValue = {
    currentPage,
    setCurrentPage,
    maxPages,
  };

  return <postsContext.Provider value={contextValue}>{children}</postsContext.Provider>;
};

export default PostsContextProvider;
