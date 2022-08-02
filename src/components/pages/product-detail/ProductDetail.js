import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ProductContext from "../../../context/ProductContext"
import UserContext from "../../../context/UserContext"
import db from "../../../firebase/firebaseConfig"
import { toast } from "react-toastify"

const ProductDetail = () => {
  const { productId } = useParams()

  const { getProductById, product } = useContext(ProductContext)
  const { getLogged, loggedUser } = useContext(UserContext)

  const [loadingBtn, setLoadingBtn] = useState(false)


  useEffect(() => {
    getProductById(productId)
    getLogged()
  }, [])

  const selectImage = (e) => {
    const bigImage = document.getElementById("product-big-image")
    const images = document.querySelectorAll("#product-small-images img")
    
    images.forEach(image => {
      if(image.classList.contains("border-warning")){
        image.classList.remove("border-warning")
      }
    })

    e.target.classList.add("border-warning")

    const selectedImage = e.target.getAttribute("src")
    bigImage.setAttribute("src", selectedImage)
  }

  const addProductToCart = () => {
    if(loggedUser && !loadingBtn){
      setLoadingBtn(true)
      const newUserProduct = {
        product_id: product.id,
        count: 1
      }
      db.ref(`baskets/${loggedUser.id}`).once("value")
      .then((snapshot) => {
        if(snapshot.val() !== null){ 
          db.ref(`baskets/${loggedUser.id}`).once("value")
          .then((snapshot) => {
            const products = []
            snapshot.forEach(item => {
              products.push({
                basket_id: item.key,
                ...item.val()
              })
            })

            let exist = false
            products.forEach(item => {
              // bu ürün daha önce eklenmiş durumunda
              if(item.product_id === product.id){
                exist = true
                db.ref(`baskets/${loggedUser.id}/${item.basket_id}`).update({
                  count: item.count + 1
                })
                setLoadingBtn(false)
                toast.success(`${product.name} eklendi.`)

              }
            })

            if(!exist){
              db.ref(`baskets/${loggedUser.id}`).push(newUserProduct)
              toast.success(`${product.name} eklendi.`)
              setLoadingBtn(false)
            }
          } ).catch(err => {
            console.log("hata 1:" + err)
            setLoadingBtn(false)
          })
        }else{
          db.ref(`baskets/${loggedUser.id}`).push(newUserProduct)
          toast.success(`${product.name} eklendi.`)
          setLoadingBtn(false)
        }
      }).catch(err => console.log("hata: " + err))
    }else{
      toast.error("Giriş yapmadınız.")
    }
    
  }

  return (
    <section id="product-detail" className='container pt-5 pb-5 mb-5'>
      
      <div className="row mb-5">
        {/* product images */}
        <div className="col-md-3">
          <div id="product-big-image" className='mb-3'>
            <img src={`${product.image}`} alt="" className="img-fluid" />
          </div>
          <div id="product-small-images" className='d-flex justify-content-beetween'>
            <img onClick={selectImage} src={`${product.image}`} alt="" className="col-md-3 img-fluid d-inline-block border border-warning" />
            <img onClick={selectImage} src="/img/gallery-1.jpg" alt="" className="col-md-3 img-fluid d-inline-block border" />
            <img onClick={selectImage} src="/img/gallery-2.jpg" alt="" className="col-md-3 img-fluid d-inline-block border" />
            <img onClick={selectImage} src="/img/gallery-3.jpg" alt="" className="col-md-3 img-fluid d-inline-block border" />
          </div>
        </div>
        {/* product infos and add cart */}
        <div className="col-md-7">
          <h1 className='fw-bold mb-3'>{product.name}</h1>
          <p className='text-secondary fw-bold'>${product.price}.00</p>
          <button onClick={addProductToCart} className="btn btn-orange mb-5">Sepete Ekle</button>
          <div>
            <h3 className='fw-bold'>Ürün Detay</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum excepturi iste adipisci earum velit vero consectetur labore laboriosam corrupti aut. Quos eius natus, dolore provident modi error quae. Consequatur natus impedit doloribus voluptatum perferendis magni in porro libero.</p>
          </div>
        </div>

      </div>

      {/* benzer ürünler */}
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