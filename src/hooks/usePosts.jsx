import useSWR from "swr";
import axios from "axios";

export default function usePosts() {
  return useSWR(
    "allPosts",
    async () => await axios.get("http://localhost:3000/posts").then((res) => res.data),
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (retryCount > 2) {
          return console.log(
            `onErrorRetry : retryCount is more than 2 times => revalidating was Stoped ,key="${key}"`
          );
        }
        setTimeout(() => revalidate({ retryCount }), 5000);
      },
    }
  );
}
