/* eslint-disable react/prop-types */
import { useRef } from "react";
import { Link } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSWRConfig, preload } from "swr";
import { useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";

//* preload The MainPost
const fetcheMainPost = async (url) => await axios.get(url).then((res) => res.data);

export default function Post({ post, page }) {
  const linkRef = useRef();
  const { cache, mutate } = useSWRConfig();

  //* change the color of link when clicked
  useEffect(() => {
    if (cache.has(`@"post","${post.id}",`)) {
      linkRef.current.classList.add("text-purple-600");
      linkRef.current.classList.add("font-semibold");
    }
  }, [post, cache]);

  const handleDeletePost = (postId) => {
    swal({
      title: `Do you want to delete this post?`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if (value) {
        axios.delete(`http://localhost:3000/posts/${postId}`).then((res) => res.data);
        mutate(["posts", page]);
        swal({ title: " the post was deleted", icon: "success" });
      }
    });
  };

  return (
    <div className="mb-3 flex items-center relative">
      <div className="w-full">
        <div className="bg-blue-500 w-2 h-2 absolute top-[13px] left-0 rounded-sm"></div>
        <Link
          onMouseOver={() => preload(`http://localhost:3000/posts/${post.id}`, fetcheMainPost)}
          ref={linkRef}
          to={`/posts/page-${page}/${post.id}`}
          className={`line-clamp-1 p-1 ml-3 hover:underline hover:underline-offset-4 text-md hover:decoration-blue-500 `}
        >
          {post.id} {post.title}
        </Link>
      </div>
      <div className="ml-8">
        <button
          onClick={() => handleDeletePost(post.id)}
          className=" hover:ring-2 hover:ring-offset-2  ring-sky-400 px-2.5 py-2 bg-slate-200 hover:bg-blue-200 text-gray-800 rounded-md font-normal text-lg "
        >
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
}
