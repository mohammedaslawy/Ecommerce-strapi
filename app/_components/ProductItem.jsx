import Image from 'next/image'
import React from 'react'
import { List } from 'lucide-react'
import Link from 'next/link'

const ProductItem = ({ product }) => {
  return (
    <Link href={`/product-details/${product?.id}`} className='p-1 border-teal-400 
    hover:cursor-pointer rounded-lg hover:border hover:shadow-md'>
      <Image src={product?.attributes?.banner?.
        data?.attributes?.url}
        alt='banner-section'
        width={400}
        height={350}
        className='rounded-t-lg h-[180px]
            object-cover'
      />
      <div className='flex items-center justify-between p-3
      rounded-b-lg bg-primary text-white'>
        <div className='p-3'>
          <h2 className='line-clamp-1 text-[12px] font-medium'>{product?.attributes?.title}</h2>
          <h2 className='text-[10px] text-gray-400 flex gap-1 items-center'>
            <List />
            {product?.attributes?.category}</h2>
        </div>
        <h2>{product?.attributes?.price}</h2>
      </div>
     </Link>
  )
}

export default ProductItem