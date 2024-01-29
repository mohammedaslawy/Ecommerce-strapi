import React from 'react'
import ProductItem from './ProductItem'

const ProductList = ({ productList }) => {
    return (
        <div className='grid grid-cols-2 gap-3 sm:grid-col-3
        md:grid-cols-4'>
            {productList.map(item => (
                <ProductItem key={item.id} product={item} />
            ))}
            </div>
    )
}

export default ProductList