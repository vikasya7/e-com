import blogs from "../data/blogs";
import BlogCard from "./BlogCard";

function BlogSection() {
  return (
    <section className="py-20 bg-[#FFF8EE]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-[#6B3E26] text-center mb-12">
          Learn About Makhanas 🐿️
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.slice(0, 4).map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

      </div>
    </section>
  );
}
export default BlogSection;
