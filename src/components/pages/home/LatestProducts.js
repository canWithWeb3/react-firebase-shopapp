import React, { useContext, useEffect } from 'react'
import ProductContext from "../../../context/ProductContext"
import UserContext from '../../../context/UserContext'
import LatestProductsItem from './LatestProductsItem'

const LatestProducts = () => {
  const { getProducts, products } = useContext(ProductContext)
  const { getLogged, loggedUser } = useContext(UserContext)

  useEffect(() => {
    getProducts()
    getLogged()
  }, [])

  return (
    <div id="home-products" className='container'>
      
      <h3 className='text-center mb-5 title-after'>Latest Product</h3>

      <div className="row g-lg-5 g-md-3 g-2">

        { products.map(p => (
          <LatestProductsItem key={p.id} p={p} loggedUser={loggedUser} />
        )) }

      </div>

    </div>
  )
}

export default LatestProducts