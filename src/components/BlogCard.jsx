import { Link } from "react-router-dom";



function BlogCard({blog}){
   return (
     <Link
       to={`/blogs/${blog.slug}`}
       className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
     >
       <img 
        src={blog.image}
        alt={blog.title}
        className="h-48 w-full object-cover"
       />
       <div className="p-5">
        <h3 className="text-lg font-semibold text-[#6B3E26]">{blog.title}</h3>
         <p className="text-gray-500 text-sm mt-2">
          {blog.excerpt}
        </p>
       </div>
     </Link>
   )
}
export default BlogCard;