import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div id="footer" className='bg-dark text-secondary py-5'>
      <div className="container text-center">
        <div className="row d-flex justify-content-between g-5">

          {/* download app */}
          <div className="col-md-3">
            <h5 className='mb-3'>Download Our App</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="row">
              <div className="col"><img src="/img/play-store.png" alt="" className="img-fluid" /></div>
              <div className="col"><img src="/img/app-store.png" alt="" className="img-fluid" /></div>
            </div>
          </div>
          {/* logo and text */}
          <div className="col-md-3">
            <img className="footer-logo img-fluid mb-2" src="/img/logo-white.png" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eum minima incidunt ducimus labore iste, fugit debitis non. Non!</p>
          </div>
          {/* useful links */}
          <div className="col-md-3">
            <h5 className='mb-3'>Useful Links</h5>
            <Link to="#" className='d-block link-hover'>Coupons</Link>
            <Link to="#" className='d-block link-hover'>Blog Post</Link>
            <Link to="#" className='d-block link-hover'>Return Policy</Link>
            <Link to="#" className='d-block link-hover'>Join Affiliate</Link>
          </div>
          {/* follow us */}
          <div className="col-md-3">
            <h5 className='mb-3'>Follow Us</h5>
            <Link to="#" className='d-block link-hover'>Facebook</Link>
            <Link to="#" className='d-block link-hover'>Twitter</Link>
            <Link to="#" className='d-block link-hover'>Instagram</Link>
            <Link to="#" className='d-block link-hover'>YouTube</Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Footer