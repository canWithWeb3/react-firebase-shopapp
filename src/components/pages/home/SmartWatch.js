import React from 'react'

const SmartWatch = () => {
  return (
    <div id="smart-watch" className='py-5 my-5' >
      <div className="container my-5">
        <div className="row g-md-0 g-5 d-flex align-items-center justify-content-center">

          <div className="col-md-3 mx-auto">
            <img src="/img/exclusive.png" alt="" className="img-fluid" />
          </div>
          <div className="col-md-5 mx-auto text-center">
            <h1 className='mb-3'>Smart Band 4</h1>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Id optio doloribus laboriosam voluptate?</p>
            <button className="btn-orange d-flex align-items-center mx-auto">Satın Al <i className="fas fa-long-arrow-alt-right ms-2"></i></button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default SmartWatch