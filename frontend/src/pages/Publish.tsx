import axios from "axios";
import { useState } from "react";
import { BACKEND_URL } from "../Config";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Publish = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const postBlog = async () => {
    try {
      
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/blog`,
          {
            title,
            content,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        toast.success("Blog Posted Succesfully!", {
          onClose : () => navigate(`../blogs/${response.data.id}`) 
        })
    } catch (e) {
      toast.error("Error while Posting the blog")
    }
  };

  return (
    <div className="flex justify-center items-center my-9">
      <ToastContainer hideProgressBar={true} autoClose={500} />
      <div className="flex flex-col max-w-xl w-[640px]">
        <div className="flex flex-col p-4">
          <label className="font-bold font-sans text-xl">
            Add a Blog Title
          </label>
          <input
            type="text"
            className="border border-gray-400 p-4 rounded-full outline-none mt-2 focus:border-black"
            placeholder="Title Here"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="p-4">
          <label className="font-bold font-sans text-xl">
            Write Your Article here
          </label>
          <textarea
            rows={10}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="block p-7 w-full text-sm rounded-xl mt-2 outline-none text-gray-900 bg-gray-50 border border-gray-300 focus:ring-black focus:border-black"
            placeholder="Write your Blog here..."
          ></textarea>
        </div>

        <button
          type="submit"
          onClick={postBlog}
          className="w-full py-3 bg-green-400 rounded-full font-semibold text-white"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default Publish;
