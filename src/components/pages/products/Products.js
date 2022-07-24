import React, { useContext, useEffect } from 'react'
import ProductContext from "../../../context/ProductContext"
import UserContext from '../../../context/UserContext'
import ProductCard from './ProductCard'

const Products = () => {
  const { getProducts, products } = useContext(ProductContext)
  const { getLogged, loggedUser } = useContext(UserContext)

  useEffect(() => {
    getProducts()
    getLogged()
  }, [])

  return (
    <section id="products" className='container pt-5 pb-5 mb-5'>

      <div className='my-5'>
        <h3>Bütün Ürünler</h3>
      </div>

      <div className="row g-5">

        { products.map(p => (
          <ProductCard key={p.id} p={p} loggedUser={loggedUser} />
        )) }

      </div>

    </section>
  )
}

export default Products