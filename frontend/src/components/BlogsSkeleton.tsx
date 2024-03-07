const BlogsSkeleton = () => {
  return (
    <div
      role="status"
      className="animate-pulse flex flex-col justify-center p-4 w-[720px] max-w-screen-lg border-b-4 shadow-lg m-1"
    >
      <div className="flex items-center">
        <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full mr-2">
          <div className="h-2.5 bg-gray-200 rounded-full" />
        </div>
        <div className="h-3.5 bg-gray-200 rounded-full w-48 mb-4"></div>

        <div className="h-4.5 bg-gray-200 rounded-full  w-48 mb-4 "></div>
      </div>
      <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
      <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
      <div className="text-stone-700 font-thin text-lg mb-2">
        <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
      </div>
    </div>
  );
};

export default BlogsSkeleton;
