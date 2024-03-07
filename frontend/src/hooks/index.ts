import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../Config";

interface BlogProps {
    id : string;
    title : string;
    content : string;
    createdAt: string;
    authorId : string;
    author : {
        name : string;
    }
    date : string
}


export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogProps[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlogs(res.data.blogs);
        setLoading(false);
      });
  }, []);

    return {
        loading,
        blogs
    }
};

export const useBlog = ({ id } : {id : string}) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogProps>();
  
    useEffect(() => {
      axios
        .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          setBlog(res.data.blog);
          setLoading(false);
        });
    }, [id]);
  
  
      return {
          loading,
          blog
      }


}
