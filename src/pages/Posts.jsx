/* eslint-disable react-hooks/exhaustive-deps */
import { useParams, Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { postsContext } from "./../context/postsContext";
import Page from "./../components/Page";

export default function Posts() {
  const { maxPages, setCurrentPage } = useContext(postsContext);
  const { page } = useParams();
  const currentPage = Number(page.slice(5));
  const nextPage = currentPage + 1;

  useEffect(() => {
    //* save the currentPage in context
    setCurrentPage(currentPage);
  }, [currentPage]);

  return (
    <div className="px-3">
      <h1 className="text-2xl mb-3 ">Posts</h1>
      <div className="w-[55%] relative ">

        <Page page={currentPage} />
        
        <div style={{ display: "none" }}>
          <Page page={nextPage} />
        </div>

        <div className="fixed bottom-4 left-[5%] ">
          <div className=" flex items-center justify-center gap-x-5 mt-1">
            <button
              className="border  bg-cyan-300 text-slate-800 rounded  font-semibold disabled:opacity-75 disabled:font-normal disabled:cursor-not-allowed"
              disabled={currentPage <= 1}
            >
              <Link
                to={`/posts/page-${currentPage > 1 ? currentPage - 1 : currentPage}`}
                className=" px-4 py-1 block"
              >
                prev
              </Link>
            </button>
            <span className="w-10 h-10 rounded-full bg-gray-200 text-slate-800  border flex justify-center items-center">
              {currentPage}
            </span>
            <button
              className="border bg-cyan-300 tetx-slate-800  rounded  font-semibold disabled:font-normal disabled:opacity-75"
              disabled={currentPage >= maxPages}
            >
              <Link
                to={`/posts/page-${currentPage < maxPages ? currentPage + 1 : currentPage}`}
                className="px-4 py-1 block"
              >
                next
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
