import React from 'react'
import AdminProductsTableItem from './AdminProductsTableItem'

const AdminProductsTable = ({products}) => {

  return (
    <table className="table table-striped table-bordered table-sm table-hover mb-0">
      <thead>
        <tr>
          <th style={{ width:"70px" }}>Resim</th>
          <th style={{ width:"180px" }}>Adı</th>
          <th>Açıklama</th>
          <th style={{ width:"100px" }}>Fiyat</th>
          <th style={{ width:"110px" }}>Kategoriler</th>
          <th style={{ width:"90px" }}></th>
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