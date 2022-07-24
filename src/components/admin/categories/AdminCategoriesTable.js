import React from 'react'
import AdminCategoriesTableItem from './AdminCategoriesTableItem'

const AdminCategoriesTable = ({categories}) => {
  return (
    <table className="table table-striped table-bordered table hover mb-0">
      <thead>
        <tr>
          <th>Adı</th>
          <th style={{ width:"110px" }}></th>
        </tr>
      </thead>
      <tbody>
        { categories.map(c => (
          <AdminCategoriesTableItem key={c.id} c={c} />
        )) }
      </tbody>
    </table>
  )
}

export default AdminCategoriesTable