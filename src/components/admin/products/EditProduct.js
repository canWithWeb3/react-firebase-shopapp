import React, { useContext, useEffect, useState } from 'react'
import CategoryContext from "../../../context/CategoryContext"
import ProductContext from "../../../context/ProductContext"
import db, { storage } from "../../../firebase/firebaseConfig"
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const EditProduct = () => {
  const navigate = useNavigate()
  const { productId } = useParams()
  const { getCategories, categories } = useContext(CategoryContext)
  const { getProductById, product } = useContext(ProductContext)

  const [name, setName] = useState("")
  const [image, setImage] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    getCategories()
    getProductById(productId)
  }, [])

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

  const checkForm = () => {
    let checked = false

    checked = true

    return checked
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
              product.image = imageUrl
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

          db.ref(`products/${product.id}`).update({
            name: name ? name : product.name,
            image: image ? image : product.image,
            description: description ? description : product.description,
            price: Number(price) > 0 ? Number(price) : product.price,
            categories: selectedCategories
          }).then(res => {
            toast.success(`${name} ürünü eklendi.`)
            navigate("/admin/urunler")
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
        <div className="card-header">Ürün Düzenle</div>
        <div className="card-body">
          { error && (
            <div className="alert alert-warning">
              { error }
            </div>
          ) }
          <form onSubmit={onSubmit}>
            <div className="row">
              
              <div className="col-md-7">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Ürün Adı:</label>
                  <input placeholder={product.name} onChange={e=>setName(e.target.value)} type="text" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Ürün Resmi:</label>
                  <input filename={product.image} onChange={e=>uploadImage(e.target.files[0])} type="file" className="form-control" />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Ürün Açıklama:</label>
                  <textarea placeholder={product.description} onChange={e=>setDescription(e.target.value)} type="text" className="form-control" rows="3"></textarea>
                </div>
                <div className="mb-3 w-50">
                  <label htmlFor="price" className="form-label">Ürün Fiyat:</label>
                  <input placeholder={product.price} onChange={e=>setPrice(e.target.value)} type="text" className="form-control" />
                </div>
              </div>

              <div className="col-md-3 ms-auto mb-5">
                
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

                <div>
                  <img src={product.image} alt="" className="img-fluid text-center" />
                </div>

              </div>

            </div>

            <div className="d-flex justify-content-md-start justify-content-end">
              <button className="btn-orange me-3">
                { loadingBtn ? "Bekleyiniz..." : "Düzenle" }
              </button>
              <Link to="/admin/urunler" className="btn btn-secondary">İptal</Link>
            </div>
          </form>
        </div>
      </div>

    </section>
  )
}

export default EditProduct