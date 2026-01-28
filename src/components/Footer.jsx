import { Link } from "react-router-dom"
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

function Footer() {
  return (
    <footer className="bg-black text-gray-300 mt-16">

      {/* top section */}
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-4">
            ShopNest
          </h1>
          <p className="text-sm text-gray-400">
            Your one-stop destination for electronics, fashion, home essentials
            and more. Shop smart. Shop easy.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-white font-semibold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/cart" className="hover:text-white">Cart</Link></li>
            <li><Link to="/category/electronics" className="hover:text-white">Electronics</Link></li>
            <li><Link to="/category/fashion" className="hover:text-white">Fashion</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h2 className="text-white font-semibold mb-4">Categories</h2>
          <ul className="space-y-2 text-sm">
            <li>Mobiles</li>
            <li>Appliances</li>
            <li>Beauty</li>
            <li>Furniture</li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-white font-semibold mb-4">Contact Us</h2>
          <p className="text-sm">📧 support@shopnest.com</p>
          <p className="text-sm">📞 +91 9876543210</p>

          {/* Socials */}
          <div className="flex gap-4 mt-4 text-lg">
            <FaFacebook className="cursor-pointer hover:text-white" />
            <FaInstagram className="cursor-pointer hover:text-white" />
            <FaTwitter className="cursor-pointer hover:text-white" />
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} ShopNest. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer
