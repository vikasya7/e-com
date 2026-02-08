import axios from "axios";


const API=axios.create({
    baseURL:"/api/v1/users",
    withCredentials:true
})

export const getCart=()=>axios.get("/api/cart",{withCredentials:true})
export const addToCart = (itemId) => {
  console.log("sending:", itemId);
  return API.post("/cart/add", { itemId });
};
export const updateQty=(id,qty)=>API.put("/cart-update",{id,qty})
export const removeItem=(id,qty)=>API.post("/cart-remove",{id,qty})