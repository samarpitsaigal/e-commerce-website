import React, { useContext, useEffect, useState } from 'react'
import { shopContext } from '../context/ShopContext'
import Titel from './Titel'
import ProductItem from './ProductItem'

const BestSeller = () => {

  const {products} = useContext(shopContext)
  const [bestSeller , setBestSeller] = useState([])

  useEffect(()=>{
    const bestProduct = products.filter((item)=>(item.bestseller))
    setBestSeller(bestProduct.slice(0,5))
    // console.log("bestSeller is: ",bestProduct) 
  },[products]) // products update krne pe hr bar chlega (pahle empty tha bina backend likhe)

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Titel text1={"BEST"} text2={"SELLERS"}/>
        <p className='w-3/4 m-auto text-xs sm:text-base text-gray-600'>Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem has been the.</p>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {
        bestSeller.map((item,index)=>(
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
        ))
      }
      </div>
    </div>
  )
}

export default BestSeller