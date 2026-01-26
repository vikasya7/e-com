import React, { useEffect, useState } from 'react'
import Carousel from './Carousel'
import { Link } from 'react-router-dom';

const categories = [
  { name: "electronics", img: "/categories/electronic.png" },
  { name: "Mobiles", img: "/categories/mobile.png" },
  { name: "TV & Appliances", img: "/categories/washing.png" },
  { name: "Fashion", img: "/categories/fashion.png" },
  { name: "Home & Kitchen", img: "/categories/home.png" },
  { name: "Beauty & Toys", img: "/categories/beauty.png" },
  { name: "Furniture", img: "/categories/furniture.png" },
  { name: "Grocery", img: "/categories/grocery.png" }
];

function Hero() {
  const [products,setProducts]=useState([])

  useEffect(()=>{
    fetch("https://fakestoreapi.com/products")
    .then((res)=>res.json())
    .then((data)=>setProducts(data.slice(0,5)))
    .catch((err)=>console.log(err)
    )
  },[])
  return (
      <div className="w-full">
      <Carousel autoSlide autoSlideInterval={3000}>
        {products.map(product => (
          <div
            key={product.id}
            className="h-[400px] flex items-center justify-center bg-red-600"
          >
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[320px] object-contain drop-shadow-2xl"
            />
          </div>
        ))}
      </Carousel>
       <h2 className="text-xl font-bold px-8 pt-8">
         Shop by Category
        </h2>

      <div className='flex flex-wrap justify-center gap-8 py-8 bg-gray-400'>
         {categories.map((prod)=>(
             <Link
              key={prod.name}
              to={`/category/${prod.name}`}
              className='flex flex-col items-center gap-2 px-6 py-4 bg-white rounded-2xl shadow hover:shadow-lg hover:translate-y-1 transition-all duration-300'
             >
                 <img src={prod.img} alt={prod.name} />
                   <span className="text-sm font-medium capitalize">
                      {prod.name}
                  </span>
             </Link>
         ))}
      </div>

    </div>
  )
}

export default Hero