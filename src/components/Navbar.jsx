import React, { useState, useRef, useEffect } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import useCart from "../context/useCart";
import useAuth from "../context/useAuth";
import api from "../utils/api";

function Navbar() {
  const { totalCount } = useCart();
  const { user, setUser } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef();

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/api/v1/users/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFF8EE] shadow-md">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex items-center justify-between h-20">

          {/* LOGO */}
          <Link to="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Squirll Bites"
              className="h-16 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden md:flex items-center gap-10 font-medium text-[#6B3E26]">
            <NavLink
              to="/"
              className="relative hover:text-[#C48A3A] transition"
            >
              Home
            </NavLink>

            <NavLink
              to="/shop"
              className="relative hover:text-[#C48A3A] transition"
            >
              Shop
            </NavLink>

            <NavLink
              to="/about"
              className="relative hover:text-[#C48A3A] transition"
            >
              About Us
            </NavLink>

            <NavLink
              to="/contact"
              className="relative hover:text-[#C48A3A] transition"
            >
              Contact
            </NavLink>

            {user?.role === "admin" && (
              <NavLink
                to="/admin"
                className="hover:text-[#C48A3A] transition"
              >
                Admin
              </NavLink>
            )}
          </div>

          {/* RIGHT SECTION */}
          <div className="flex items-center gap-6">

            {/* CART */}
            <Link to="/cart" className="relative">
              <FaShoppingCart
                size={20}
                className="text-[#6B3E26] hover:scale-110 transition"
              />
              {totalCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#C48A3A] text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
                  {totalCount}
                </span>
              )}
            </Link>

            {/* AUTH SECTION */}
            {!user ? (
              <div className="hidden md:flex gap-4">
                <Link
                  to="/login"
                  className="px-5 py-2 border border-[#6B3E26] text-[#6B3E26] rounded-full hover:bg-[#6B3E26] hover:text-white transition"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="px-5 py-2 bg-[#6B3E26] text-white rounded-full hover:bg-[#5A321D] transition"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-3"
                >
                  <img
                    src={user.avatar || "/default-avatar.png"}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover border-2 border-[#C48A3A]"
                  />
                  <span className="hidden md:block font-semibold text-[#6B3E26]">
                    {user.fullname}
                  </span>
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-4 w-56 bg-white rounded-xl shadow-2xl overflow-hidden border animate-fadeIn">

                    <div className="px-4 py-3 border-b bg-[#FFF8EE]">
                      <p className="font-semibold text-[#6B3E26]">
                        {user.fullname}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      to="/orders"
                      className="block px-4 py-3 text-sm hover:bg-[#FFF1DD] transition"
                    >
                      My Orders
                    </Link>

                    {user?.role === "admin" && (
                      <Link
                        to="/admin"
                        className="block px-4 py-3 text-sm hover:bg-[#FFF1DD] transition"
                      >
                        Admin Dashboard
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              className="md:hidden text-[#6B3E26]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden py-5 space-y-4 text-[#6B3E26] border-t">
            <NavLink to="/" className="block">
              Home
            </NavLink>
            <NavLink to="/shop" className="block">
              Shop
            </NavLink>
            <NavLink to="/about" className="block">
              About Us
            </NavLink>
            <NavLink to="/contact" className="block">
              Contact
            </NavLink>

            {!user ? (
              <>
                <NavLink to="/login" className="block">
                  Login
                </NavLink>
                <NavLink to="/signup" className="block">
                  Signup
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/orders" className="block">
                  My Orders
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="block text-red-500"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Navbar;

