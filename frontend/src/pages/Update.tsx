import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../Config";
import { FerrisWheelSpinnerOverlay } from "react-spinner-overlay";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Update = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    try {
      axios
        .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          const data = res.data.blog;
          setTitle(data.title);
          setContent(data.content);
          setLoading(false);
        });
    } catch (e) {
      toast.error("Error while fetching blog info");
    }
  }, []);

  const updateBlog = async () => {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/blog`,
        {
          id: Number(id),
          title,
          content,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }

      );
      console.log(response);
      toast.success("Blog Updated Succesfully", {
        onClose: () => navigate(`../blogs/${response.data.id}`),
      });
    } catch (e) {
      toast.error("Error While Updating the blog");
    }
  };

  if (loading) {
    return <FerrisWheelSpinnerOverlay color="#50FF45" />;
  }

  return (
    <div className="flex justify-center items-center my-9">
      <ToastContainer hideProgressBar={true} autoClose={500} />
      <div className="flex flex-col max-w-xl w-[640px]">
        <div className="flex flex-col p-4">
          <label className="font-bold font-sans text-xl">
            Update the Blog Title
          </label>
          <input
            type="text"
            className="border border-gray-400 p-4 rounded-full outline-none mt-2 focus:border-black"
            placeholder="Title here"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
        </div>
        <div className="p-4">
          <label className="font-bold font-sans text-xl">
            Update Your Article here
          </label>
          <textarea
            rows={10}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            className="block p-7 w-full text-sm rounded-xl mt-2 outline-none text-gray-900 bg-gray-50 border border-gray-300 focus:ring-black focus:border-black"
            placeholder="Update Content here"
            value={content}
          ></textarea>
        </div>

        <button
          type="submit"
          onClick={updateBlog}
          className="w-full py-3 bg-green-400 rounded-full font-semibold text-white"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Update;
