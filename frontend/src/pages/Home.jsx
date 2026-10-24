import React from 'react'
import { Hero } from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OuePolicy from '../components/OuePolicy'
import NewsLetterBox from '../components/NewsLetterBox'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <OuePolicy/>
      <NewsLetterBox/>
    </div>
  )
}

export default Home