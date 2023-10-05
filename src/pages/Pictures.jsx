/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import axios from "axios";
import useSWRInfinite from "swr/infinite";
import Loading from "./../components/Loading";

const fetcher = async (url) => await axios.get(url).then((res) => res.data);

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null; // reached the end
  return `http://localhost:3000/photos/?_limit=24&_page=${pageIndex}`; // SWR key
};

export default function Pictures() {
  const { data, isLoading, isValidating, size, setSize } = useSWRInfinite(getKey, fetcher);

  //*calculate the number of all pictures
  let totalPictures = 0;
  for (let i = 0; i < data?.length; i++) {
    totalPictures += data[i]?.length;
  }

  const content = data?.map((peage) =>
    peage.map((pic) => (
      <div key={pic.id}>
        <img src={pic.thumbnailUrl} />
      </div>
    ))
  );

  return (
    <div className="relative">
      <h1 className="text-xl pl-4 mb-5">
        Pictures - Infinite Scroll By
        <Link
          to="https://swr.vercel.app/docs/pagination"
          className="italic ml-2 text-sky-600 underline"
          target="_blank"
        >
          useSWRInfinite
        </Link>
      </h1>
      <div className="flex gap-3 flex-wrap items-center p-4 ">{content}</div>
      <div className="flex justify-center items-center">
        <button
          type="button"
          onClick={() => setSize((prev) => prev + 1)}
          className={` border bg-cyan-200 px-5 py-2 cursor-pointer rounded-md`}
          disabled={isValidating}
        >
          <span className="flex items-center  font-semibold">
            {isValidating && <Loading size="text-xl" />}
            <span>{isValidating ? "Loading" : "Loade More"}</span>
          </span>
        </button>
      </div>
    </div>
  );
}
