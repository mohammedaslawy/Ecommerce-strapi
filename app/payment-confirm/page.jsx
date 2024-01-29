import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const PaymentConfirm = () => {
  return (
    <div className='flex flex-col items-center justify-center px-5 mt-4'>
        <Image src='/verified.gif'
            alt='check'
            width={130}
            height={130}
        />
        <h2 className='text-[24px]'>Payment Successfull !</h2>
        <h2 className='text-[17px] text-center mt-6 text-primary'>We Send an Email With Your Order Confirmation along with the Digital Content </h2>
        <Link
        href='/'
        className='p-2 mt-6 text-white rounded-md bg-primary'>Back To Homebage</Link>
    </div>
    
  )
}

export default PaymentConfirm