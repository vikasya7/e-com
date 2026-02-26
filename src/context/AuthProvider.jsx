
import {  useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import api from "../utils/api";





export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    
    const fetchUser=async()=>{
        try {
            const { data } = await api.get("/api/v1/users/me");
            setUser(data.data)
        } catch  {
            setUser(null)
        } finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchUser()
    },[])

    return (
        <AuthContext.Provider
        value={{user,setUser,fetchUser,loading}}
        >
            {children}
        </AuthContext.Provider>
    )
}
