/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useMemo } from "react";
import CartContext from "./CartContext";
import api from "../utils/api";
import useAuth from "./useAuth";

export const CartProvider = ({ children }) => {
  const {user}=useAuth()
  const [items, setItems] = useState([]);
  const [bill, setBill] = useState(0);
  
  // helper calculate bill
  const calculateBill = (cartItems = []) => {
  const safeItems = Array.isArray(cartItems)
    ? cartItems.filter(
        (item) =>
          item &&
          typeof item.price === "number" &&
          typeof item.quantity === "number"
      )
    : [];

  const total = safeItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  setBill(total);
};
  // 🔥 Fetch Cart
  const fetchCart = async () => {
    if(!user){
      const localCart=JSON.parse(localStorage.getItem("cart")) || []
      setItems(localCart)
      calculateBill(localCart)
      return;
    }
    try {
      const res = await api.get("/api/v1/users/cart");

      setItems(res.data.data.items || []);
      setBill(res.data.data.bill || 0);
    } catch (err) {
      console.log("Fetch Cart Error:", err.response?.data || err.message);
    }
  };

  

  
  

  // 🔥 Derived total count
  const totalCount = useMemo(() => {
  return items
    ?.filter((item) => item && item.quantity)
    .reduce((acc, item) => acc + item.quantity, 0);
}, [items]);

  // 🔥 Add To Cart (SECURE — no price from frontend)
  const addToCart = async ({ itemId, weight, quantity = 1,name,image,price }) => {
    console.log("USER:", user);
    if(!user){
      // guest cart
      console.log("Image being stored:", image);
      const localCart=JSON.parse(localStorage.getItem("cart")) || []
      const index=localCart.findIndex(
        (item)=>item.itemId===itemId && item.weight===weight
      )
      if(index>-1){
        localCart[index].quantity+=quantity;
      }else{
        localCart.push({
          itemId,
          weight,
          quantity,
          price:price,
          name:name,
          image:image
        })
        //console.log(image);
        
      }
      localStorage.setItem("cart",JSON.stringify(localCart))
      setItems(localCart);
      calculateBill(localCart);
      return;
    }
    try {
      await api.post("/api/v1/users/cart/add", { itemId, weight, quantity, });

      await fetchCart();
    } catch (err) {
      console.log("Add To Cart Error:", err.response?.data || err.message);
    }
  };

  // 🔥 Update Quantity
  const updateQuantity = async (itemId, weight, quantity) => {
    if (quantity < 1) return;

    if(!user){
      const localCart=JSON.parse(localStorage.getItem("cart")) || []
      const updatedCart=localCart.map((item)=>{
        if(!item) return null
       if (item.itemId === itemId && item.weight === weight) {
        return { ...item, quantity };
      }
       return item; 
      }).filter(Boolean)
      localStorage.setItem("cart",JSON.stringify(updatedCart))
      setItems(updatedCart)
      calculateBill(updatedCart)
      return ;
    }

    try {
      await api.put("/api/v1/users/cart/update", { itemId, weight, quantity, });

      await fetchCart();
    } catch (err) {
      console.log("Update Quantity Error:", err.response?.data || err.message);
    }
  };

  // 🔥 Remove From Cart
  const removeFromCart = async (itemId, weight) => {

    if(!user){
      const localCart=JSON.parse(localStorage.getItem("cart")) || []

      const updatedCart=localCart.filter((item)=>!(item.itemId===itemId && item.weight===weight))

      localStorage.setItem("cart",JSON.stringify(updatedCart))
      setItems(updatedCart)
      calculateBill(updatedCart)
      return;
    }
    try {
      await api.post("/api/v1/users/cart/remove", {
      itemId,
      weight,
    });

      await fetchCart();
    } catch (err) {
      console.log("Remove Error:", err.response?.data || err.message);
    }
  };

  const mergeGuestCartToBackend=async()=>{
    const localCart=JSON.parse(localStorage.getItem("cart")) 
    if(!localCart || localCart.length===0) return;
    try{
      for(const item of localCart){
        await api.post("/api/v1/users/cart/add",{
          itemId:item.itemId,
          weight:item.weight,
          quantity:item.quantity
        })
      }

      // clear guest cart
      localStorage.removeItem("cart")
    } catch(err){
      console.log("Cart merge error",err.response?.data || err.message)
    }
  }
  useEffect(() => {
    const syncCart=async()=>{
      if(user){
        await mergeGuestCartToBackend();
      }
      await fetchCart();
    };
    syncCart();
  }, [user]);

  // 🔥 Memoized context value
  const value = {
  items,
  bill,
  totalCount,
  fetchCart,
  addToCart,
  updateQuantity,
  removeFromCart,
};

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
