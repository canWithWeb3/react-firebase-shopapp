import React, { useEffect } from 'react'
import Header from './Header'
import HomeBrands from './HomeBrands'
import HomeCategories from './HomeCategories'
import HomeComments from './HomeComments'
import LatestProducts from './LatestProducts'
import SmartWatch from './SmartWatch'

const Home = () => {
  return (
    <section id="home">
      <Header />
      <HomeCategories />
      <LatestProducts />
      <SmartWatch />
      <HomeComments />
      <HomeBrands />
    </section>
  )
}

export default Home