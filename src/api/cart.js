import axios from "axios";


const API=axios.create({
    baseURL:"/api",
    withCredentials:true
})

export const getCart=()=>axios.get("/api/cart",{withCredentials:true})