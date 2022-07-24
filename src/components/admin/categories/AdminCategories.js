import React, { useContext, useEffect } from 'react'
import CategoryContext from "../../../context/CategoryContext"
import { Link } from 'react-router-dom'
import AdminCategoriesTable from './AdminCategoriesTable'

const AdminCategories = () => {
  const { getCategories, categories } = useContext(CategoryContext)

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <section id="admin-categories" className='container'>

      <div className="card my-5">
        <div className="card-body ms-auto">
          <Link to="/admin/kategoriler/kategori-ekle" className='btn btn-primary'><i className="fas fa-plus me-2"></i> Kategori Ekle</Link>
        </div>
      </div>

      <AdminCategoriesTable categories={categories} />

    </section>
  )
}

export default AdminCategories