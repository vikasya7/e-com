import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function ProductDetail() {
  const {id}=useParams()
  console.log(id);
  
  const [product,setProduct]=useState(null)

  useEffect(()=>{
     fetch(`https://fakestoreapi.com/products/${id}`)
     .then((res)=>res.json())
     .then(data=>setProduct(data))
     .catch(err=>console.log(err))
  },[id])

  if(!product) return <p className='p-10'>Loading....</p>
  return (
    <div className="p-10 grid md:grid-cols-2 gap-10">

      {/* image */}
      <div className="bg-white p-10 rounded-xl">
        <img
          src={product.image}
          className="h-96 mx-auto object-contain"
        />
      </div>

      {/* info */}
      <div>
        <h1 className="text-2xl font-bold mb-3">
          {product.title}
        </h1>

        <p className="text-gray-600 mb-4">
          {product.description}
        </p>

        <p className="text-xl font-bold mb-3">
          ₹ {product.price}
        </p>

        <p className="mb-4">
          ⭐ {product.rating.rate} ({product.rating.count})
        </p>

       <div className='flex gap-4'>
            <button className="bg-orange-500 hover:bg-orange-700 text-white px-6 py-3 rounded-lg">
          Add to Cart
        </button>

        <button className="bg-orange-500 hover:bg-orange-700 text-white px-6 py-3 rounded-lg">
          Buy Now
        </button>
       </div>
      </div>
    </div>
  )
}

export default ProductDetail