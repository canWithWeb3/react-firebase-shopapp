import React from 'react'

const HomeBrands = () => {
  return (
    <div id="home-brand" className='py-5'>
      <div className="container">
        <div className="d-flex flex-wrap gap-3 justify-content-center">

          <div>
            <img src="/img/logo-godrej.png" alt="" className="img-fluid" />
          </div>
          <div>
            <img src="/img/logo-oppo.png" alt="" className="img-fluid" />
          </div>
          <div>
            <img src="/img/logo-coca-cola.png" alt="" className="img-fluid" />
          </div>
          <div>
            <img src="/img/logo-paypal.png" alt="" className="img-fluid" />
          </div>
          <div>
            <img src="/img/logo-philips.png" alt="" className="img-fluid" />
          </div>

        </div>
      </div>
    </div>
  )
}

export default HomeBrands