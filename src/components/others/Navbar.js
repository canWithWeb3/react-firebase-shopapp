import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom"
import UserContext from '../../context/UserContext'

const Navbar = () => {
  const navigate = useNavigate()

  const { getLogged, loggedUser, logoutUser } = useContext(UserContext)

  useEffect(() => {
    getLogged()
  }, [])

  const logoutBtn = () => {
    logoutUser()
    navigate("/giris-yap")
  }

  return (
    <nav id="navbar" className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/"><img style={{ width:"140px" }} src="/img/logo.png" alt="" className="img-fluid" /></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="d-flex align-items-center navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <Link className="text-secondary text-decoration-none dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Admin 
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to="/admin/urunler">Ürünler</Link></li>
                <li><Link className="dropdown-item" to="/admin/kategoriler">Kategoriler</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">Anasayfa</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Ürünler</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog">Blog</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/iletisim">İletişim</Link>
            </li>
            { loggedUser ? (
              <li className="nav-item">
                <button onClick={logoutBtn} className="btn btn-warning btn-sm">Çıkış yap</button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/giris-yap">
                  <i className="fas fa-user fs-5"></i>
                </Link>
              </li>
            ) }

            <li className="nav-item">
              <Link className="nav-link" to="/sepet">
                <i className="fas fa-shopping-bag fs-5"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar