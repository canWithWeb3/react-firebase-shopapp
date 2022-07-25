import React, { useState } from 'react'
import { Link } from "react-router-dom"
import db from "../../../firebase/firebaseConfig"
import { toast } from 'react-toastify';

const ProductCard = ({p, loggedUser}) => {
  const [loadingBtn, setLoadingBtn] = useState(false)

  const addProductToCart = () => {
    if(loggedUser && !loadingBtn){
      setLoadingBtn(true)
      const newUserProduct = {
        product_id: p.id,
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
              if(item.product_id === p.id){
                exist = true
                db.ref(`baskets/${loggedUser.id}/${item.basket_id}`).update({
                  count: item.count + 1
                })
                setLoadingBtn(false)
                toast.success(`${p.name} eklendi.`)

              }
            })

            if(!exist){
              db.ref(`baskets/${loggedUser.id}`).push(newUserProduct)
              toast.success(`${p.name} eklendi.`)
              setLoadingBtn(false)
            }
          } ).catch(err => {
            console.log("hata 1:" + err)
            setLoadingBtn(false)
          })
        }else{
          db.ref(`baskets/${loggedUser.id}`).push(newUserProduct)
          toast.success(`${p.name} eklendi.`)
          setLoadingBtn(false)
        }
      }).catch(err => console.log("hata: " + err))
    }else{
      toast.error("Giriş yapmadınız.")
    }
    
  }

  return (
    <div className="col-lg-3 col-md-4 col-6">
      <div className="card border-0">
        <Link to={`/urun-detay/${p.id}`} className="card-img">
          <img src={`${p.image}`} alt={`${p.name}`} className="img-fluid" loading='lazy' />
        </Link>
        <div className="card-body">
          <h5>{p.name}</h5>
          <div className="home-products-stars text-orange">
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
            <i className="fas fa-star"></i>
          </div>
          <span className='d-block text-secondary mb-3'>${p.price}.00</span>
          
          <button onClick={addProductToCart} className="btn-orange d-block w-100 px-0 py-1">
            { loadingBtn ? "Bekleyiniz..." : "Sepete Ekle" }
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard