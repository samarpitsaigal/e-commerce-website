import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { shopContext } from '../context/ShopContext'

const ProductItem = ({id,image,name,price}) => {
  const {currency} = useContext(shopContext)
  return (
    // agar image array hai to uski pahli index ka path mil jayega or agar image string hai to uska path mil jayega
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className='overflow-hidden'>
        <img className='hover:scale-110 transition ease-in-out' src={Array.isArray(image)? image[0]:image} alt="" />
  
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  )
}

export default ProductItem