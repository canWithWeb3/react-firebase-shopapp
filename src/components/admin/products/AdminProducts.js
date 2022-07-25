import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductContext from '../../../context/ProductContext'
import AdminProductsTable from './AdminProductsTable'

const AdminProducts = () => {
  const { getProducts, products } = useContext(ProductContext)

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <section id="admin-products" className='container mb-5'>
      
      <div className="card my-5">
        <div className="card-body ms-auto">
          <Link to="/admin/urunler/urun-ekle" className="btn btn-primary"><i className="fas fa-plus me-2"></i> Ürün Ekle</Link>
        </div>
      </div>

      <AdminProductsTable products={products} />

    </section>
  )
}

export default AdminProducts