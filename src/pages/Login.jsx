import React, { useState } from 'react'

function Login() {
    const[email,setEmail]=useState("")
    const[password,setPassword]=useState("")

    const handleLogin=async ()=>{
        await axios.post(
            "/api/v1/users/login",
            {email,password},
            {withCredentials: true}
        )
        alert("Logged in ✅");
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