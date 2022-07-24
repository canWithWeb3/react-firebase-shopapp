import React from 'react'

const ProductDetail = () => {
  return (
    <section id="product-detail" className='container pt-5 pb-5 mb-5'>
      
      <div className="row mb-5">

        <div className="col-md-3">
          <div id="product-big-image" className='mb-3'>
            <img src="/img/product-1.jpg" alt="" className="img-fluid" />
          </div>
          <div id="product-small-images row gap-5">
            <img src="/img/gallery-1.jpg" alt="" className="col-md-3 img-fluid d-inline-block" />
            <img src="/img/gallery-1.jpg" alt="" className="col-md-3 img-fluid d-inline-block" />
            <img src="/img/gallery-2.jpg" alt="" className="col-md-3 img-fluid d-inline-block" />
            <img src="/img/gallery-3.jpg" alt="" className="col-md-3 img-fluid d-inline-block" />
          </div>
        </div>
        <div className="col-md-7">
          <h1 className='fw-bold mb-3'>Printed Tshirt <br /> by HRX</h1>
          <p className='text-secondary fw-bold'>$50.00</p>
          <div className="col-md-3 mb-3">
            <select class="form-select" aria-label="Default select example">
              <option selected>Varsılan</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-md-2 mb-3 d-flex flex-wrap">
            <input type="text" className="form-control" value={1} />
          </div>
          <button className="btn btn-orange mb-5">Sepete Ekle</button>
          <div>
            <h3 className='fw-bold'>Ürün Detay</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum excepturi iste adipisci earum velit vero consectetur labore laboriosam corrupti aut. Quos eius natus, dolore provident modi error quae. Consequatur natus impedit doloribus voluptatum perferendis magni in porro libero.</p>
          </div>
        </div>

      </div>

      <div className='py-5'>
        <h3 className='mb-5'>Benzer Ürünler</h3>

        <div className="row g-5">

          <div className="col-md-3">
            <div className="card border-0">
              <img src="/img/product-9.jpg" alt="" className="img-fluid" />
              <div className="card-body">
                <h5>Gray Sports Shoes</h5>
                <div className="home-products-stars text-orange">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <span className='d-block text-secondary'>$95.00</span>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0">
              <img src="/img/product-10.jpg" alt="" className="img-fluid" />
              <div className="card-body">
                <h5>Gray Sports Shoes</h5>
                <div className="home-products-stars text-orange">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <span className='d-block text-secondary'>$95.00</span>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0">
              <img src="/img/product-11.jpg" alt="" className="img-fluid" />
              <div className="card-body">
                <h5>Gray Sports Shoes</h5>
                <div className="home-products-stars text-orange">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <span className='d-block text-secondary'>$95.00</span>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0">
              <img src="/img/product-12.jpg" alt="" className="img-fluid" />
              <div className="card-body">
                <h5>Gray Sports Shoes</h5>
                <div className="home-products-stars text-orange">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <span className='d-block text-secondary'>$95.00</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default ProductDetail