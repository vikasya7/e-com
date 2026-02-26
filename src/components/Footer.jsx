import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#6B3E26] text-[#FFF8EE] mt-20">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* BRAND */}
        <div>
          <img
            src="/logo.png"
            alt="Squirll Bites"
            className="h-12 mb-4 brightness-110"
          />
          <p className="text-sm leading-relaxed text-[#F5E6D8]">
            Premium roasted makhana snacks made with love and
            the finest ingredients. Healthy. Crunchy. Delicious.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-[#FFF8EE]">
            Quick Links
          </h2>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-[#C48A3A] transition">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-[#C48A3A] transition">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#C48A3A] transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#C48A3A] transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* CATEGORIES */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Categories
          </h2>
          <ul className="space-y-3 text-sm">
            <li className="hover:text-[#C48A3A] transition cursor-pointer">
              Classic Makhana
            </li>
            <li className="hover:text-[#C48A3A] transition cursor-pointer">
              Peri Peri
            </li>
            <li className="hover:text-[#C48A3A] transition cursor-pointer">
              Himalayan Salt
            </li>
            <li className="hover:text-[#C48A3A] transition cursor-pointer">
              Combo Packs
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h2 className="text-lg font-semibold mb-4">
            Contact Us
          </h2>

          <p className="text-sm mb-2">
            📧 support@squirllbites.com
          </p>

          <p className="text-sm mb-4">
            📞 +91 98765 43210
          </p>

          {/* SOCIALS */}
          <div className="flex gap-4 text-lg">
            <FaFacebookF className="cursor-pointer hover:text-[#C48A3A] transition" />
            <FaInstagram className="cursor-pointer hover:text-[#C48A3A] transition" />
            <FaTwitter className="cursor-pointer hover:text-[#C48A3A] transition" />
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-[#8B5A2B] text-center py-5 text-sm text-[#F5E6D8]">
        © {new Date().getFullYear()} Squirll Bites. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

