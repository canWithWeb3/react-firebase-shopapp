import React from 'react'
import AdminProductsTableItem from './AdminProductsTableItem'

const AdminProductsTable = ({products}) => {

  return (
    <table className="table table-striped table-bordered table-sm table-hover mb-0">
      <thead>
        <tr>
          <th style={{ width:"70px" }}>Resim</th>
          <th style={{ width:"180px" }}>Adı</th>
          <th className='products-table-description'>Açıklama</th>
          <th style={{ width:"70px" }}>Fiyat</th>
          <th className='products-table-categories' style={{ width:"110px" }}>Kategoriler</th>
          <th style={{ width:"85px" }}></th>
        </tr>
      </thead>
      <tbody>
        { products.map(p => (
          <AdminProductsTableItem key={p.id} p={p} />
        )) }
      </tbody>
    </table>
  )
}

export default AdminProductsTable