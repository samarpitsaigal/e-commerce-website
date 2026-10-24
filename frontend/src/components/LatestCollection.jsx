import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext'
import Titel from './Titel'
import ProductItem from './ProductItem'

const LatestCollection = () => {
  const {products} = useContext(shopContext)
  console.log("products is ",products)
  const [latestProduct , setLatestProduct] = useState([])

  useEffect(()=>{
    setLatestProduct(products.slice(0,10))
  },[products]) // backend se pahle array khali tha or assets me se product aa rha tha pr ab backend se product aa rha hai

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Titel text1={"LATEST"} text2={"COLLECTION"} />
        <p className='w-3/4 m-auto text-xs sm:text-base text-gray-600'>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem has been the.</p>
      </div>
      {/* rendering product */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-4'>
        {
          latestProduct.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
          ))
        }
      </div>
    </div>
  )
}

export default LatestCollection