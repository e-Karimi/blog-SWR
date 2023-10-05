import { useParams, Link } from "react-router-dom";
import useSWR, { useSWRConfig } from "swr";
import { useForm } from "react-hook-form";
import Loading from "../components/Loading";
import axios from "axios";
import postImage from "./../assets/post.svg";
import postImage2 from "./../assets/post2.svg";

const fetcheMainPost = (key) =>
  axios.get(`http://localhost:3000/posts/${key[1]}`).then((res) => res.data);

export default function MainPost() {
  const { page, id: postId } = useParams();
  const { data: post } = useSWR(["post", postId], fetcheMainPost);
  const { cache, mutate } = useSWRConfig();

  const currentPage = Number(page.slice(5));

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: async () => {
      //* Get data from the cache
      const allPosts = cache.get("allPosts");
      const mainPost = await allPosts?.data?.find((post) => post.id === +postId);
      return {
        title: mainPost?.title,
        desc: mainPost?.body,
      };
    },
  });

  const handleEditPost = async ({ title, desc }) => {
    let updatedPost = {
      title,
      body: desc,
    };

    await axios
      .put(
        `http://localhost:3000/posts/${postId}`,
        { ...updatedPost },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => res.data);

    mutate(["post", postId]);

    //*make the value of isSubmitting be false
    return new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
  };

  return (
    <div className="flex gap-x-12  ">
      {/* Post */}
      <div className="w-1/2 p-3">
        <h1 className="text-2xl mb-3 ">{post?.title}</h1>
        <div
          style={
            post?.cover ? { backgroundColor: `${post.cover}` } : { backgroundColor: `#d3c4d6` }
          }
          className="w-full h-44 rounded p-1 flex gap-x-10"
        >
          <img src={postImage} alt="post Image" className="w-44 h-44" />
          <img src={postImage2} alt="second post Image" className="w-44 h-44" />
        </div>
        <p className="text-base my-3 text-justify">{post?.body}</p>
        <Link
          to={`/posts/page-${currentPage}`}
          className="inline-block border px-4 py-1 mt-5 bg-sky-200 rounded font-semibold"
        >
          Back
        </Link>
      </div>
      {/*Post Edit Form */}
      <div className="w-1/2 p-3 pt-5">
        <form onSubmit={handleSubmit(handleEditPost)} name="edit-form">
          <div className="mb-2">
            <label htmlFor="title" className="block mb-2 text-lg font-medium text-gray-900">
              Title
            </label>
            <input
              {...register("title", {
                required: "Title is required",
                minLength: { value: 5, message: "Title should have at least 5 characters" },
              })}
              type="text"
              id="title"
              placeholder="title..."
              className="bg-white border border-gray-300 text-gray-900 text-base rounded-md  focus:border-gray-400 block  p-2.5 outline-none w-full"
            />
            {errors.title && (
              <small className="text-sm text-cyan-500 ml-2">{errors.title.message}</small>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="desc" className="block mb-2 text-lg font-medium text-gray-900">
              Description
            </label>
            <textarea
              {...register("desc", { required: "Description is required" })}
              id="desc"
              placeholder="write something..."
              className="bg-white border border-gray-300 text-gray-900 text-base rounded-md  focus:border-gray-400 block  p-2.5 outline-none w-full h-52"
            />
            {errors.desc && (
              <small className="text-sm text-cyan-600 ml-2">{errors.desc.message}</small>
            )}
          </div>

          <button
            type="submit"
            className={`border bg-cyan-200 px-4 py-1.5 mt-4 cursor-pointer rounded-md 
            ${isSubmitting && "cursor-wait"} `}
            disabled={isSubmitting}
          >
            <span className="flex items-center  font-semibold">
              {isSubmitting && <Loading size="text-xl" isSubmitting />} Save Edit
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
