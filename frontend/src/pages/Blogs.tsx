import BlogCard from "../components/BlogCard";
import BlogsSkeleton from "../components/BlogsSkeleton";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <BlogsSkeleton />
        <BlogsSkeleton />
        <BlogsSkeleton />
        <BlogsSkeleton />
        <BlogsSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center mt-5">
      {blogs.length != 0 ? (
        blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            title={blog.title}
            content={blog.content}
            authorName={blog.author.name || "Anonymous"}
            publishedDate={blog.createdAt.substring(0, 10)}
            id={blog.id}
          />
        ))
      ) : (
        <div className="font-extrabold text-5xl">
          No Blogs. Share Yours & show other!
        </div>
      )}
    </div>
  );
};

export default Blogs;
