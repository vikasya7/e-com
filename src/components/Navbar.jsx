import React, { useContext } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeContext } from '../context/ThemeProvider';

function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext)
    const isDark = theme === "dark"
    let isLogin = false
    return (
        <div className="">
            <div className={`w-full h-16 flex items-center px-8  ${isDark ? 'bg-black' : 'bg-white'}`}>

                {/* LEFT: Logo + Search */}
                <div className="flex items-center gap-6 flex-1">
                    <h1 className={`text-3xl font-bold ${isDark ? 'text-white' :'text-black'}`}>
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
                    <button
                        className={`
                             px-8 py-3
                             border rounded-2xl
                             text-lg font-semibold
                             ${isDark ? "text-white border-white" : "text-black border-black"}
                             `}
                    >
                        {isLogin ? "Login" : "Signup"}
                    </button>

                    {/* Cart */}
                    <div className="flex items-center gap-2 cursor-pointer">
                        <FaShoppingCart
                            size={26}
                            className={isDark ? "text-white" : "text-black"}
                        />
                        <span className={`${isDark ? "text-white" : "text-black"} text-xl`}>
                            Cart
                        </span>
                    </div>

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