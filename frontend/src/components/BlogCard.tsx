import { Link } from 'react-router-dom'

interface BlogProps {
  title: string;
  content: string;
  authorName: string;
  publishedDate: string;
  id : string;
}

const BlogCard = (blog: BlogProps) => {
  return (
    <Link to={`/blogs/${blog.id}`}>
      <div className="flex flex-col justify-center p-4 w-[720px] max-w-screen-lg border-b-4 shadow-lg m-1">
          <div className="flex items-center">
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full mr-2">
              <span className="font-medium text-gray-600 dark:text-gray-300">
                {blog.authorName[0]}
              </span>
            </div>
            <h3 className="text-stone-700 mr-2 font-thin text-lg">
              {blog.authorName}
            </h3>
            <p className="text-sm items-center">{blog.publishedDate}</p>
          </div>
          <div className="font-extrabold text-3xl mb-2">{blog.title}</div>
          <div className="text-stone-700 font-thin text-lg mb-2">
            <p>{blog.content.slice(0, 200) + "..."}</p>
          </div>

          <div className="my-4 font-extralight text-md">{`${Math.floor(
            blog.content.length / 200
          )} minute(s) read`}</div>
      </div>
    </Link>
  );
};

export default BlogCard;
