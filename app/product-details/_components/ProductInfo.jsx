'use client'
import { AlertOctagon, BadgeCheck, ShoppingCart } from 'lucide-react'
import React, { useContext } from 'react'
import skeletonProductInfo from './skeletonProductInfo';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import CartApis from '../../_utils/CartApis';
import {CartContext} from '../../_context/CartContext'

const ProductInfo = ({ product }) => {
  const { user } = useUser();
  const router = useRouter();
  const {cart, setCart}= useContext(CartContext)
  const handleAddToCart = () => {
    if (!user) {
      router.push('/sign-in')
    } else {
      const data = {
        data : {
          username : user.fullName,
          email : user.primaryEmailAddress.emailAddress,
          products : [product?.id]
        }
      }
      CartApis.addToCart(data).then(res => {
        console.log('cart creatd successfully ')
        setCart(oldCart => [
          ...oldCart,
          {
            id: res?.data?.data?.id,
            product
          }
        ])
      }).catch(error => {
        console.log('error', error)
      })
    }
  }
  return (
    <div>
      {product?.id ?
        <div>
          <h2 className='text-[20px]'>{product?.attributes?.title}</h2>
          <h2 className='text-[15px] text-primary'>{product?.atrributes?.category}</h2>
          <p className='text-[13px] mt-5'>{product?.attributes?.description[0]?.children[0].text}</p>
          <h className="text-[11px] text-primary flex items-center gap-2 mt-2">{product?.attributes?.instantDelivery ? <BadgeCheck className='text-green-500 w-5 h-5' /> : <AlertOctagon />}Eligible For Instant Delivery</h>
          <div className='flex justify-between mt-3'>
            <button onClick={() => handleAddToCart()} className='flex gap-2 p-3 text-white rounded-lg bg-primary hover:bg-teal-600'><ShoppingCart />Add To Cart</button>
            <h2 className='twxt-[32px] text-primary mt-3'>$ {product?.attributes?.price}</h2>
          </div>
        </div> :
        <skeletonProductInfo />}
    </div>
  )
}

export default ProductInfo