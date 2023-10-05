/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import useSWR from "swr";
import axios from "axios";
import Post from "./Post";

const fetcher = (key) =>
  axios.get(`http://localhost:3000/posts/?_limit=9&_page=${key[1]}`).then((res) => res.data);

export default function Page({ page }) {
  const { data } = useSWR(["posts", page], fetcher, {
    onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
      if (retryCount > 2) {
        return console.log(
          `onErrorRetry : retryCount is more than 2 times => revalidating was Stoped ,key="${key}"`
        );
      }
      setTimeout(() => revalidate({ retryCount }), 5000);
    },
  });

  return (
    <div>
      {data?.map((post) => (
        <Post key={post.id} post={post} page={page} />
      ))}
    </div>
  );
}
