import Image from 'next/image'
import React from 'react'

const ProductBanner = ({ product }) => {
  return (
    <div>
      {product?.attributes?.banner?.data?.attributes?.
        url ?
        <Image src={product?.attributes?.banner?.data?.
          attributes?.url}
          alt='banner details img'
          width={400}
          height={400}
          className='rounded-lg'
        /> :
        <div className='w-[400px] h-[266px]
        bg-slate-200 rounded-lg animate-pulse'></div>
      }
    </div>
  )
}

export default ProductBanner