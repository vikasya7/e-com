import { Star } from 'feather-icons-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { addToCart } from '../api/cart.js';

function ProductCard({product}) {
   if (!product) return null; 
  return (
    <Link to={`/product/${product._id}`} >
       <div>
        <img src={product.image} alt={product.name}
         className='object-contain h-[400px]'
         />
       </div>

       {/* Title */}

       <div className='font-semibold text-sm line-clamp-2 w-[400px]'>
        {product.name}
       </div>
       
        {/* Rating */}
        {product.rating && (
            <div className='flex items-center gap-1 text-yellow-500 text-sm mt-1'>
                <Star size={14} fill='currentColor'/>
                {product.rating?.rate}
            </div>
          )
        }

        {/* Price + Discount */}

       <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-black">
            ₹{product.price}
          </span>

          {product.discountPercentage && (
            <span className="text-green-600 text-xs font-medium">
              {Math.round(product.discountPercentage)}% OFF
            </span>
          )}
        </div>

        {/* button */}
          <button
           onClick={async()=>{
            try {
              console.log(product);
              await  addToCart(product._id)
              alert("Added to cart ✅")
            } catch (error) {
                  console.log(error);
                  alert("Failed ❌");
            }
           }}
          className='items-center mt-auto mx-auto bg-black text-white rounded-lg py-2 px-2 text-sm hover:bg-gray-800 transition'
        >
            Add to Cart
        </button>
        
            
    </Link>
  )
}

export default ProductCard