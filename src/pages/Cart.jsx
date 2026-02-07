import React, { useEffect, useState } from 'react'
import axios from "axios"
import { startPayment } from '../utils/razorpay'
function Cart() {
    const [items,setItems]=useState([])
    
    useEffect(()=>{
       axios.get("/api/v1/users/cart",{withCredentials:true})
       .then(res=>setItems(res.data))
       .catch(err=>console.log(err)
       )
    },[])

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
           0
     );

  return (
    <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
         {items.length===0 ? (
            <p>Your cart is empty</p>
         ):(
            <>
              {items.map(item=>(
               <div key={item._id}
                className='flex justify-between mb-3'
               >
                 <p>{item.name}X{item.quantity}</p>
                 <p>{item.price}*{item.quantity}</p>
               </div>

              ))}
              <hr className="my-4" />

              <h3 className="text-xl font-semibold">
                 Total: ₹{total}
              </h3>


              {/* 🔥 PAYMENT BUTTON */}
             <button
                 onClick={() => startPayment(total)}
                 className="bg-black text-white px-6 py-2 rounded"
              >
                  Pay Now
             </button>
            </>
         )}
    </div>
  );
}

export default Cart;

