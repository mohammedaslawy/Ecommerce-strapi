'use client'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import ProductApis from '../../_utils/ProductApis'
import BreadCrumb from '../../_components/BreadCrumb'
import ProductBanner from '../_components/ProductBanner'
import ProductInfo from '../_components/ProductInfo'
import ProductList from '../../_components/ProductList'



const ProductDetails = ({params}) => {
    const path = usePathname();
    console.log('path',path)
    const [ProductDetails, setProductDetails] = useState({})
    const [productList, setProductList] = useState([])
    useEffect(() => {
        getProductById()
    }, [params?.productId])

    const getProductById =()=> {
        ProductApis.getProductById(params?.productId).then(res=>{
            console.log('product item', res.data.data)
            setProductDetails(res.data.data)
            getProductListByCategory(res.data.data)
        })
    }
    const getProductListByCategory= (product) => {
        ProductApis.getProductsByCategory(product?.
            attributes.category).then(res=>{
                console.log(res?.data?.data)
                setProductList(res?.data?.data)
            })
    }
  return (
    <div className='px-10 py-8 md:px-28'>
        <BreadCrumb path={path}/>
        <div className='grid justify-around grid-cols-1 gap-5 mt-10 sm:gap-0 sm:grid-cols-2'> 
            <ProductBanner product={ProductDetails}/>
            <ProductInfo product={ProductDetails}/>
        </div>
        <div>
            <h2 className='mt-24 text-xl'>Similar Products</h2>
            <ProductList productList={productList}/>
        </div>
    </div>
  )
}

export default ProductDetails