import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Login() {
    const navigate=useNavigate()
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

     const handleLogin=async()=>{
       try {
         await axios.post("/api/v1/users/login",{email,password},{withCredentials:true})
         navigate("/")
       } catch (err) {
         console.log(err);
         alert("Login failed");
       }
    }
  return (
   <div className="p-8">
      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 block mb-3"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 block mb-3"
      />

      <button
        onClick={handleLogin}
        className="bg-black text-white px-4 py-2"
      >
        Login
      </button>
    </div>
  )
}

export default Login