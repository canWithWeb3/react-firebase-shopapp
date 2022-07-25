import React from 'react'

const Header = () => {
  return (
    <div id="header" className='pb-md-5 pb-5'>
      <div className="container">
        <div className="row d-flex align-items-center pt-5 justify-content-center">

          <div className="col-md-5 col-12 text-center order-md-1 order-2">
            <h1 className='mb-5'>Give Your Workout <br /> A New Style!</h1>
            <p className='mb-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque atque tempora, doloremque a adipisci explicabo officiis neque. Aliquid!</p>
            <button className="btn-orange d-flex align-items-center mx-auto">Daha Fazlası <i className="fas fa-long-arrow-alt-right ms-2"></i></button>
          </div>
          <div className="col-md-7 col-12 order-md-2 order-1">
            <img src="/img/image1.png" alt="" className="img-fluid" />
          </div>

        </div>
      </div>
    </div>
  )
}

export default Header