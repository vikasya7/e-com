/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useMemo } from "react";
import CartContext from "./CartContext";
import api from "../utils/api";

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [bill, setBill] = useState(0);

  // 🔥 Fetch Cart
  const fetchCart = async () => {
    try {
      const res = await api.get("/api/v1/users/cart");

      setItems(res.data.data.items || []);
      setBill(res.data.data.bill || 0);
    } catch (err) {
      console.log("Fetch Cart Error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 🔥 Derived total count
  const totalCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  // 🔥 Add To Cart (SECURE — no price from frontend)
  const addToCart = async ({ itemId, weight, quantity = 1 }) => {
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

    try {
      await api.put("/api/v1/users/cart/add", { itemId, weight, quantity, });

      await fetchCart();
    } catch (err) {
      console.log("Update Quantity Error:", err.response?.data || err.message);
    }
  };

  // 🔥 Remove From Cart
  const removeFromCart = async (itemId, weight) => {
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

  // 🔥 Memoized context value
  const value = useMemo(
    () => ({
      items,
      bill,
      totalCount,
      fetchCart,
      addToCart,
      updateQuantity,
      removeFromCart,
    }),
    [items, bill, totalCount],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
