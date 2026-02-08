import React, { useContext, useEffect, useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeContext } from '../context/ThemeProvider';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const isDark = theme === "dark"
    let isLogin = false


    const [user, setUser] = useState(null)

    // check login automatically on load


    useEffect(() => {
        axios
            .get("/api/v1/users/me", { withCredentials: true })
            .then((res) => setUser(res.data.data))
            .catch(() => setUser(null))
    }, [])

    //logout 

    const handleLogout = async () => {
        await axios.post("/api/v1/users/logout", {}, { withCredentials: true })
        setUser(null)
    }




    return (
        <div className="">
            <div className={`w-full h-16 flex items-center px-8  ${isDark ? 'bg-black' : 'bg-white'}`}>

                {/* LEFT: Logo + Search */}
                <div className="flex items-center gap-6 flex-1">
                    <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>
                        ShopNest
                    </h1>

                    <div className="relative w-[420px] border border-amber-500 rounded-xl">
                        <CiSearch
                            size={22}
                            className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-white" : "text-black"
                                }`}
                        />
                        <input
                            type="text"
                            placeholder="Search for Products, Brands and more"
                            className="
                                    w-full
                                    py-3
                                    pl-12 pr-4
                                    bg-transparent
                                    text-white
                                    placeholder:text-white/70
                                    focus:outline-none
                                    "
                        />
                    </div>
                </div>

                {/* RIGHT: Auth + Cart + Theme */}
                <div className="ml-auto flex items-center gap-8">

                    {/* Signup */}
                    {!user ? (
                        <>
                            {/* login */}
                            <Link
                                to="/login"
                                className={`px-8 py-3 border rounded-2xl text-lg font-semibold ${isDark ? "text-white border-white" : "text-black border-black"}`}
                            >
                                Login
                            </Link>


                            {/* signup */}
                            <Link
                                to="/signup"
                                className='px-8 py-3 bg-black text-white rounded-2xl text-lg font-semibold'
                            >
                                Signup
                            </Link>

                        </>

                    ) : (

                        // when the user is logged in
                        <>
                            <div className="flex items-center gap-3">

                                {/* Avatar */}
                                <img
                                    src={user.avatar}
                                    alt="avatar"
                                    className="w-10 h-10 rounded-full object-cover border"
                                />

                                {/* Name */}
                                <span
                                    className={`font-semibold text-lg ${isDark ? "text-white" : "text-black"
                                        }`}
                                >
                                    Hi {user.fullname}
                                </span>

                                {/* Logout */}
                                <button
                                    onClick={handleLogout}
                                    className="px-6 py-2 bg-red-500 text-white rounded-2xl"
                                >
                                    Logout
                                </button>
                            </div>
                        </>

                  )}
                    {/* Cart */}
                    <Link to="/cart" className="flex items-center gap-2 cursor-pointer">
                        <FaShoppingCart
                            size={26}
                            className={isDark ? "text-white" : "text-black"}
                        />
                        <span className={`${isDark ? "text-white" : "text-black"} text-xl`}>
                            Cart
                        </span>
                    </Link>

                    {/* Theme Toggle */}
                    {isDark ? (
                        <FaSun
                            size={24}
                            onClick={toggleTheme}
                            className="text-white cursor-pointer"
                        />
                    ) : (
                        <FaMoon
                            size={24}
                            onClick={toggleTheme}
                            className="text-black cursor-pointer"
                        />
                    )}
                </div>
            </div>
        </div>

    )
}

export default Navbar