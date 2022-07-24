import React, { useContext, useState } from 'react'
import db from "../../../firebase/firebaseConfig"
import { toast } from 'react-toastify';
import CartContext from '../../../context/CartContext';

const CartTableItem = ({ucp, loggedUser}) => {
  const { getUserCartProducts } = useContext(CartContext)

  const [loadingBtn, setLoadingBtn] = useState(false)

  const decreaseCount = () => {
    if(!loadingBtn){
      setLoadingBtn(true)

      if(ucp.count !== 1){
        db.ref(`baskets/${loggedUser.id}/${ucp.basket_id}`).update({
          count: ucp.count - 1
        })
        getUserCartProducts()
      }

      setLoadingBtn(false)
    }
  }

  const increaseCount = () => {
    if(!loadingBtn){
      setLoadingBtn(true)

      if(ucp.count < 8){
        db.ref(`baskets/${loggedUser.id}/${ucp.basket_id}`).update({
          count: ucp.count + 1
        })
        getUserCartProducts()
      }else{
        toast.error("En fazla 8 tane eklenebilir.")
      }

      setLoadingBtn(false)
    }
  }

  const deleteUserCartProduct = () => {
    db.ref(`baskets/${loggedUser.id}/${ucp.basket_id}`).remove()
    .then(res => getUserCartProducts())
  }

  return (
    <tr>
      <td className='p-0'>
        <img src={`${ucp.image}`} alt="" className="img-fluid w-100" />
      </td>
      <td className='px-0'>
        <div className="d-flex">
          <div className='ps-3'>
            <h5>{ucp.name}</h5>
            <p className='text-secondary'>Fiyat: ${ucp.price}.00</p>
            <a onClick={deleteUserCartProduct} href="#" className="text-orange">Sil</a>
          </div>
        </div>
      </td>
      <td>
        <div class="input-group mb-3">
          <button onClick={decreaseCount} class="btn-primary">-</button>
          <input type="text" class="form-control text-center" placeholder={ucp.count} disabled />
          <button onClick={increaseCount} class="btn-primary">+</button>
        </div>
      </td>
      <td>
        <p className='text-secondary'>${ ucp.price * ucp.count }.00</p>
      </td>
    </tr>
  )
}

export default CartTableItem