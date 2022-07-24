import React from 'react'

const HomeCategories = () => {
  return (
    <div id="home-categories" className='container py-5'>
      <div className="row g-3 d-flex flex-wrap justify-content-center">
        
        <div className="col-lg-3 col-md-4 col-6">
          <img src="/img/category-1.jpg" alt="" className="img-fluid" />
        </div>

        <div className="col-lg-3 col-md-4 col-6">
          <img src="/img/category-2.jpg" alt="" className="img-fluid" />
        </div>

        <div className="col-lg-3 col-md-4 col-6">
          <img src="/img/category-3.jpg" alt="" className="img-fluid" />
        </div>

      </div>
    </div>
  )
}

export default HomeCategories