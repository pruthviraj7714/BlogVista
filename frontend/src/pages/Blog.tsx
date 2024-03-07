import { useNavigate, useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import BlogSkeleton from "../components/BlogSkeleton";
import axios from "axios";
import { BACKEND_URL } from "../Config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });
  const navigate = useNavigate();

  const deleteBlog = async () => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        toast.success("Blog deleted successfully", {
          onClose: () => navigate("/blogs"),
        });
      } else {
        toast.error("Failed to delete blog. Please try again.");
      }
    } catch (error) {
      toast.error("Error while deleting blog. Please try again.");
      console.error("Error deleting blog:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <BlogSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center mt-4">
      <ToastContainer hideProgressBar={true} autoClose={500} />
      <div className="p-4 flex flex-col max-w-screen-md">
        <div className="font-extrabold text-5xl p-4 my-4">{blog?.title}</div>
        <div className="flex">
          <div className="mr-4 relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {blog?.author.name ? `${blog.author.name[0]}` : "A"}
            </span>
          </div>
          <div>
            <h1>{blog?.author.name || "Anonymous"}</h1>
            <div className="flex">
              <p className="mr-3">
                {blog?.content
                  ? `${Math.floor(blog?.content.length / 200)} minutes read(s)`
                  : null}
              </p>
              <p>{blog?.createdAt.substring(0, 10)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 w-[840px] mt-8 font-medium text-md min-h-[350px] p-4 whitespace-pre-line">
        <p>{blog?.content}</p>
      </div>
      {blog?.authorId &&
      Number(blog.authorId) !== Number(localStorage.getItem("authorId")) ? (
        <p className="font-serif text-red-400 font-light my-7">
          * NOTE:Only the blog creator can update or delete this blog.
        </p>
      ) : (
        <div className="flex items-center space-x-4 my-7">
          <button
            onClick={() => {
              navigate(`./update`);
            }}
            className="px-5 py-2 bg-green-400 text-white rounded-md hover:bg-green-500 transition duration-300 ease-in-out"
          >
            Update
          </button>
          <button
            onClick={deleteBlog}
            className="px-5 py-2 bg-red-400 text-white rounded-md hover:bg-red-500 transition duration-300 ease-in-out"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Blog;
