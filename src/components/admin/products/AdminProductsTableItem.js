import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import ProductContext from '../../../context/ProductContext'
import db, { storage } from "../../../firebase/firebaseConfig"

const AdminProductsTableItem = ({p}) => {
  const { getProducts } = useContext(ProductContext)

  const deleteProduct = () => {
    db.ref(`products/${p.id}`).remove()
    .then(res => {
      getProducts()
    }).catch(err => {
      alert(`${p.name} ürünü silinemedi. Hata: ${err}`)
    })
  }

  return (
    <tr>
      <td className='p-0'><img src={`${p.image}`} alt="" className="img-fluid" /></td>
      <td>{p.name}</td>
      <td>{p.description}</td>
      <td>${p.price}.00</td>
      <td>
        <ul className='list-unstyled'>
          { p.categories.map(pc => (
            <li key={pc.id}>{pc.name}</li>
          )) }
        </ul>
      </td>
      <td>
        <Link to={`/admin/urunler/urun-duzenle/${p.id}`} className="btn btn-warning btn-sm me-3"><i className="fas fa-edit"></i></Link>
        <button onClick={deleteProduct} className="btn btn-danger btn-sm"><i className="fas fa-times"></i></button>
      </td>
    </tr>
  )
}

export default AdminProductsTableItem