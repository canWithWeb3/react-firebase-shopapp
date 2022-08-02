import React, { useContext, useEffect } from 'react'
import CartTable from './CartTable'
import CartContext from '../../../context/CartContext'

const Cart = () => {
  const { getUserCartProducts, userCartProducts, totalPrice, totalCount } = useContext(CartContext)

  useEffect(() => {
    getUserCartProducts()
  }, [])

  return (
    <section id="cart" className='container pt-5 pb-5 mb-5'>
      
      <div className="row">
        {/* cart table */}
        <div className="col-md-12 mx-auto">
          { userCartProducts.length > 0 ? (
              <CartTable userCartProducts={userCartProducts} />
          ) : (
            <div className="alert alert-warning">
              Sepetinizde ürün yok.
            </div>
          ) }
          {/* cart summary */}
          <div className="col-md-3 ms-auto border-3">
          <div>
            <div className='d-flex justify-content-between mb-2'>
              <h6>Toplam Miktar:</h6>
              <span className='d-inline-block text-secondary'>{totalCount}</span>
            </div>
            <div className='d-flex justify-content-between mb-5'>
              <h6>Toplam Fiyat:</h6>
              <span className='d-inline-block text-secondary'>${totalPrice}.00</span>
            </div>

            <div className="d-flex justify-content-end">
              <button className="btn-orange">Alışverişi Tamamla</button>
            </div>
          </div>
        </div>
        </div>
      </div>

    </section>
  )
}

export default Cart