import { Star } from 'feather-icons-react'
import React from 'react'
import { Link } from 'react-router-dom'

function ProductCard({product}) {
  return (
    <Link to={`/product/${product.id}`} >
       <div>
        <img src={product.image} alt={product.title}
         className='object-contain max-h-full'
         />
       </div>

       {/* Title */}

       <div className='h-3 font-semibold text-sm'>
        {product.title}
       </div>
       
        {/* Rating */}
        {product.rating && (
            <div className='flex items-center gap-1 text-yellow-500 text-sm mt-1'>
                <Star size={14} fill='currentColor'/>
                {product.rating}
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
          className='mt-auto bg-black text-white rounded-lg py-2 text-sm hover:bg-gray-800 transiton'
        >
            Add to Cart
        </button>
            

    </Link>
  )
}

export default ProductCard