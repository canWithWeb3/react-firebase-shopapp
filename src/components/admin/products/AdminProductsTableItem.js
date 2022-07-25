import React, { useContext } from 'react'
import { Link } from "react-router-dom"
import ProductContext from '../../../context/ProductContext'
import db, { storage } from "../../../firebase/firebaseConfig"

const AdminProductsTableItem = ({p}) => {
  const { getProducts } = useContext(ProductContext)

  const deleteProduct = () => {
    if(window.confirm(`${p.name} ürünü silmek istiyor munusuz?`)){
      db.ref(`products/${p.id}`).remove()
      .then(res => {
        getProducts()
      }).catch(err => {
        alert(`${p.name} ürünü silinemedi. Hata: ${err}`)
      })
    }
  }

  return (
    <tr>
      <td className='p-0'><img src={`${p.image}`} alt="" className="img-fluid" /></td>
      <td>{p.name}</td>
      <td className='products-table-description'>{p.description.substring(0,22) + "..."}</td>
      <td>${p.price}.00</td>
      <td className='products-table-categories'>
        <ul className='list-unstyled'>
          { p.categories.map(pc => (
            <li key={pc.id}>{pc.name}</li>
          )) }
        </ul>
      </td>
      <td className='d-grid gap-4'>
        <Link to={`/admin/urunler/urun-duzenle/${p.id}`} className="btn btn-warning btn-sm"><i className="fas fa-edit"></i></Link>
        <button onClick={deleteProduct} className="btn btn-danger btn-sm"><i className="fas fa-times"></i></button>
      </td>
    </tr>
  )
}

export default AdminProductsTableItem