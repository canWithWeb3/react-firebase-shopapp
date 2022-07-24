import React from 'react'

const HomeComments = () => {
  return (
    <div id="home-comments" className='py-5'>
      <div className="container">
        <div className="row d-flex gap-5 justify-content-center">

          <div className="card col-md-3 shadow border-0">
            <div className="card-body text-center">
              <span className="d-block fs-1 text-orange mb-3"><i class="fas fa-comment"></i></span>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias possimus dignissimos laborum quaerat.</p>
              <div className="home-comments-stars text-orange">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
            <div className="home-comment-user text-center">
              <img style={{ width:"50px" }} src="/img/user-1.png" alt="" className="img-fluid rounded-circle mb-3" />
              <h5>Sean Parker</h5>
            </div>
          </div>

          <div className="card col-md-3 shadow border-0">
            <div className="card-body text-center">
              <span className="d-block fs-1 text-orange mb-3"><i class="fas fa-comment"></i></span>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias possimus dignissimos laborum quaerat.</p>
              <div className="home-comments-stars text-orange">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
            <div className="home-comment-user text-center">
              <img style={{ width:"50px" }} src="/img/user-2.png" alt="" className="img-fluid rounded-circle mb-3" />
              <h5>Mike Smith</h5>
            </div>
          </div>

          <div className="card col-md-3 shadow border-0">
            <div className="card-body text-center">
              <span className="d-block fs-1 text-orange mb-3"><i class="fas fa-comment"></i></span>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestias possimus dignissimos laborum quaerat.</p>
              <div className="home-comments-stars text-orange">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
            </div>
            <div className="home-comment-user text-center">
              <img style={{ width:"50px" }} src="/img/user-3.png" alt="" className="img-fluid rounded-circle mb-3" />
              <h5>Mabel Smith</h5>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default HomeComments