import React from 'react'
import ProductCard from './ProductCard'

function ProductSection({title,products=[]}) {
  return (
    <div>
        <div>
            <h2 className='text-2xl font-bold'>{title}</h2>
        </div>
        
        {/* cards */}
        <div className='flex gap-2 overflow-x-auto scrollbar-hide'>
            {products.map(product =>(
                <ProductCard 
                 key={product.id}
                 product={product}
                 />
            ))}
        </div>

    </div>
  )
}

export default ProductSection