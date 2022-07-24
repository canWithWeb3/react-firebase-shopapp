import React, { useContext, useEffect } from 'react'
import CartTableItem from './CartTableItem'
import UserContext from "../../../context/UserContext"

const CartTable = ({userCartProducts}) => {
  const { loggedUser } = useContext(UserContext)

  return (
    <table className="table">
      <thead className='bg-orange text-white'>
        <tr>
          <th className='cart-th-image'>Resim</th>
          <th>Ürün</th>
          <th className='cart-th-quantity'>Miktar</th>
          <th className='cart-th-total'>Toplam</th>
        </tr>
      </thead>
      <tbody>
        { userCartProducts.map(ucp => (
          <CartTableItem key={ucp.basket_id} ucp={ucp} loggedUser={loggedUser} />
        )) }
      </tbody>
    </table>
  )
}

export default CartTable