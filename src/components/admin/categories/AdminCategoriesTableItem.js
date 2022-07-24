import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import CategoryContext from '../../../context/CategoryContext'
import db from "../../../firebase/firebaseConfig"

const AdminCategoriesTableItem = ({c}) => {
  const { getCategories } = useContext(CategoryContext)

  const deleteCategory = () => {
    db.ref(`categories/${c.id}`).remove()
      .then(res =>{
        getCategories()
      })
      .catch(err => {
        alert(`Kategori silenemedi hatası: ${err}`)
      })
  }

  return (
    <tr key={c.id}>
      <td>{c.name}</td>
      <td className=''>
        <Link to={`/admin/kategoriler/kategori-duzenle/${c.id}`} className="btn btn-warning btn-sm me-3"><i className="fas fa-edit"></i></Link>
        <button onClick={deleteCategory} className="btn btn-danger btn-sm"><i className="fas fa-times"></i></button>
      </td>
    </tr>
  )
}

export default AdminCategoriesTableItem