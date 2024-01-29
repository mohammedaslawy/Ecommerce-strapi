'use client'
import { UserButton, useUser } from '@clerk/nextjs'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../_context/CartContext'
import CartApis from '../_utils/CartApis'
import Cart from '../_components/Cart'

const Header = () => {
  const [openCart, setOpenCart] = useState(false)
  // console.log('href', window.location.href)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const {cart, setCart}= useContext(CartContext)
  useEffect(() => {
    setIsLoggedIn(window.location.href.toString().includes('sign-in'))
  },[])
  const { user } = useUser();
  useEffect(() => {
    user && getCartItems();
  }, [user])
  const getCartItems = () => {
    CartApis.getUserCartItems(user.primaryEmailAddress.
      emailAddress).then(res => {
        console.log('response from cart', res?.data?.
        data)
        res?.data?.data.forEach(citem => {
          setCart((oldCart) => [
            ...oldCart,
            {
              id: citem.id,
              product: citem?.attributes?.products?.data[0]
            }
          ])
        })
      })
  }
  return !isLoggedIn && (
    <header className="bg-white">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 shadow-md">
        <a className="block text-teal-600" href="/">
          <span className="sr-only">Home</span>
          <Image src="/logo.svg" alt='logo' width={70} height={70} />
        </a>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="/"> Home </a>
              </li>

              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="/"> Explore </a>
              </li>

              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="/"> Products </a>
              </li>

              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="/"> About US </a>
              </li>

              <li>
                <a className="text-gray-500 transition hover:text-gray-500/75" href="/"> Contact </a>
              </li>

              {/* <li>
            <a className="text-gray-500 transition hover:text-gray-500/75" href="/"> Blog </a>
          </li> */}
            </ul>
          </nav>

          <div className="flex items-center gap-4">

            {!user ? <div className="sm:flex sm:gap-4">
              <a
                className="block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-teal-500"
                href="/sign-in"
              >
                Login
              </a>

              <a
                className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-500/75 sm:block"
                href="/"
              >
                Register
              </a>
            </div>
              :
              <div className='flex items-center gap-5'>
                <h1 className='flex gap-1 cursor-pointer'>
                  <ShoppingCart onClick={()=> setOpenCart
                  (!openCart)}/>
                ({cart?.length})</h1>
                <UserButton afterSignOutUrl='/' />
                {openCart && <Cart /> }
              </div>
            }
            <button
              className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

  )
}

export default Header