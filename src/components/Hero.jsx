import React, { useEffect, useState } from 'react'
import Carousel from './Carousel'
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import ProductSection from './ProductSection'
import axios from 'axios';
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
 const API=axios.create({
   baseURL:"/api/v1",
   withCredentials:true
 })
function Hero() {
  const [products,setProducts]=useState([])


  useEffect(()=>{
    API.get("/products")
    .then(res=>setProducts(res.data))
    .catch(err=>console.log(err)
    )
  },[])
  const carouselProducts = products.slice(0,5)
  const electronicsProducts = products.filter(
        p => p.category?.toLowerCase() === "electronics"
   );
  return (
    <div className="w-full">
      <Carousel autoSlide autoSlideInterval={3000}>
        {carouselProducts.map(product => (
          <div
            key={product._id}
            className="h-[400px] flex items-center justify-center bg-red-600"
          >
            <img
              src={product.image}
              alt={product.name}
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
      <h2 className='text-3xl font-bold m-1 p-2'>Top Deals</h2>
       <div className='flex gap-2 overflow-x-auto scrollbar-hide'>
                {products.map(product=>(
                 <ProductCard
                  key={product._id}
                  product={product}
                 />
                ))}
        </div>
       
        {/* best value on electronics */}
       {console.log(products.map(p => p.category))}
       {console.log(electronicsProducts.map(p=> p.id))}
       <div className='flex gap-2 overflow-x-auto scrollbar-hide'>
          <ProductSection 
          title="Best Value Electronics"
           products={electronicsProducts}
          />
        </div> 

    </div>
  )
}

export default Hero