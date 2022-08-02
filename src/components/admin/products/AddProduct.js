import React, { useContext, useEffect, useState } from 'react'
import CategoryContext from "../../../context/CategoryContext"
import db, { storage } from "../../../firebase/firebaseConfig"
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

const AddProduct = () => {
  const navigate = useNavigate()
  const { getCategories, categories } = useContext(CategoryContext)

  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [error, setError] = useState("")
  const [url, setUrl] = useState("");

  useEffect(() => {
    getCategories()
  }, [])

  const checkForm = () => {
    let checked = false
    // const imageArray = image.name.split(".")

    if(name.trim()){
      if(image.indexOf("jpg") > -1 || image.indexOf("jpeg") > -1 || image.indexOf("png") > -1){
        if(description.trim()){
          if(price.trim() && Number(price) > 0){
            checked = true
            setError("")
          }else{
            setError("Geçerli fiyat girmediniz.")
          }
        }else{
          setError("Ürün açıklama boş bırakılamaz.")
        }
      }else{
        setError("Geçerli resim giriniz. (.jpg, .jpeg, .png)")
      }
    }else{
      setError("Ürün adı boş bırakılamaz.")
    }

    return checked
  }

  const selectCategory = () => {
    let selectedCategories = []
    const inputs = document.querySelectorAll("#categories-card input")
    inputs.forEach(i => {
      if(i.checked === true){
        selectedCategories.push({
          id: i.getAttribute("id").substring(9),
          name: i.value
        })
      }
    })

    return selectedCategories
  }

  const uploadImage = (image) => {
    const imageUuid = uuid()
    const imageArray = image.name.split(".")
    if(imageArray[1] === "jpeg" || imageArray[1] === "jpg" || imageArray[1] === "png"){
      setLoadingBtn(true)
      const uploadTask = storage.ref(`images/${imageUuid}${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
        },
        error => {
          console.log("hata: " + error);
          setLoadingBtn(false)
        },
        () => {
          storage
            .ref("images")
            .child(`${imageUuid}${image.name}`)
            .getDownloadURL()
            .then(imageUrl => {
              setImage(imageUrl)
              setLoadingBtn(false)
            }).catch(err => {
              setError("Resim yükleme hata: " + err)
              setLoadingBtn(false)
            })
        }
      );
    }else{
      setError("Geçerli resim girmediniz.")
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()

    
    if(checkForm()){
      const selectedCategories = selectCategory()
      if(selectedCategories.length > 0){
        if(!loadingBtn){
          setLoadingBtn(true)

          db.ref("products").push({
            name: name.trim(),
            image: image.trim(),
            description: description.trim(),
            price: Number(price),
            categories: selectedCategories
          }).then(res => {
            toast.success(`${name} ürünü eklendi.`)
            navigate("/admin/urunler")
            setLoadingBtn(false)
          }).catch(err => {
            toast.error(`Ürün eklenemedi`)
            setLoadingBtn(false)
          })
        }
      }else{
        setError("Kategori seçmediniz.")
      }
    }
  }


  return (
    <section id="add-product" className='container'>
      
      <div className="card my-5">
        <div className="card-header">Ürün Ekle</div>
        <div className="card-body">
          {/* error alert */}
          { error && (
            <div className="alert alert-warning">
              { error }
            </div>
          ) }
          {/* form */}
          <form onSubmit={onSubmit}>
            <div className="row">
              
              {/* text inputs */}
              <div className="col-md-7">
                {/* name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Ürün Adı:</label>
                  <input onChange={e=>setName(e.target.value)} type="text" className="form-control" />
                </div>
                {/* image */}
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Ürün Resmi:</label>
                  <input onChange={e=>uploadImage(e.target.files[0])} type="file" className="form-control" />
                </div>
                {/* description */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Ürün Açıklama:</label>
                  <textarea onChange={e=>setDescription(e.target.value)} type="text" className="form-control" rows="3"></textarea>
                </div>
                {/* price */}
                <div className="mb-3 w-50">
                  <label htmlFor="name" className="form-label">Ürün Fiyat:</label>
                  <input onChange={e=>setPrice(e.target.value)} type="text" className="form-control" />
                </div>
              </div>

              {/* checkbox inputs */}
              <div className="col-md-3 ms-auto mb-5">
                
                {/* select category card */}
                <div id="categories-card" className="card">
                  <div className="card-header">Kategoriler</div>
                  <div className="card-body">
                    { categories.map(c => (
                      <div key={c.id} className="form-check mb-2">
                        <label htmlFor={`category_${c.id}`} className="form-check-label">{c.name}</label>
                        <input value={c.name} type="checkbox" id={`category_${c.id}`} className="form-check-input" />
                      </div>
                    )) }
                  </div>
                </div>
                
                {/* product image show */}
                <div className='my-3 text-center'>
                  <img src={`${image}`} alt="" className="img-fluid" />
                </div>
              </div>

            </div>

            {/* form submit button */}
            <div className="d-flex justify-content-md-start justify-content-end">
              <button className="btn-orange">
                { loadingBtn ? "Bekleyiniz..." : "Ürün Ekle" }
              </button>
            </div>
          </form>
        </div>
      </div>

    </section>
  )
}

export default AddProduct