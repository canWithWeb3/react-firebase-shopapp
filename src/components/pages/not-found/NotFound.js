import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section id="not-found" className='container my-5'>
      <h3 className='mb-5'>Sayfa Bulunamadı.</h3>
      <Link to="/" className='btn-orange text-decoration-none'>Anasayfaya Dön</Link>
    </section>
  )
}

export default NotFound