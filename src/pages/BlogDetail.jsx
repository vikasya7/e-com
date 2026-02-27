import { useParams, Link } from "react-router-dom";

import blogs from "../data/blogs";
import { Helmet } from "react-helmet-async";

function BlogDetail() {
  const { slug } = useParams();
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Blog not found
      </div>
    );
  }

  return (
    <>
      {/* 🔥 SEO Meta Tags */}
      <Helmet>
        <title>{blog.title} | Squirll Bites</title>
        <meta name="description" content={blog.metaDescription} />
      </Helmet>

      <div className="bg-[#FFF8EE] py-20">
        <div className="max-w-3xl mx-auto px-6">

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-[#6B3E26] mb-4 leading-tight">
            {blog.title}
          </h1>

          {/* Reading Time */}
          <p className="text-sm text-gray-500 mb-8">
            {blog.readingTime}
          </p>

          {/* Hero Image */}
          <div className="overflow-hidden rounded-3xl shadow-lg mb-12">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-[350px] object-cover"
            />
          </div>

          {/* 🔥 Dynamic Content */}
          <div className="text-gray-700 leading-8 whitespace-pre-line text-lg">
            {blog.content}
          </div>

          {/* CTA Section */}
          <div className="mt-16 bg-white rounded-3xl shadow-md p-8 text-center">
            <h3 className="text-2xl font-bold text-[#6B3E26] mb-4">
              Ready to try premium roasted makhanas?
            </h3>
            <p className="text-gray-500 mb-6">
              Experience healthy snacking with Squirll Bites.
            </p>
            <Link
              to="/shop"
              className="inline-block px-8 py-3 bg-[#6B3E26] text-white rounded-full hover:bg-[#5A321D] transition"
            >
              Shop Now
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}

export default BlogDetail;