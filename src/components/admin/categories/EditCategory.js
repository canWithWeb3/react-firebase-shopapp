import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Link } from "react-router-dom"
import CategoryContext from '../../../context/CategoryContext'
import db from "../../../firebase/firebaseConfig"
import { toast } from 'react-toastify';

const EditCategory = () => {
  const navigate = useNavigate()
  const { categoryId } = useParams()
  const { getCategoryById, category } = useContext(CategoryContext)

  const [name, setName] = useState("")
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [error, setError] = useState("")


  useEffect(() => {
    getCategoryById(categoryId)
  }, [])

  const onSubmit = (e) => {
    e.preventDefault()
    setError("")
    if(name.trim() && !loadingBtn){
      setLoadingBtn(true)
      db.ref(`categories/${category.id}`).update({
        name: name
      }).then(res => {
        navigate("/admin/kategoriler")
        toast.success("Kategori düzenlendi.")
      }).catch(err => {
        setError("Hata: " + err)
      })

      setLoadingBtn(false)
    }else{
      setError("Kategori Adı girmediniz")
    }
  }

  return (
    <section id="add-category" className='container'>
      
      <div className="col-lg-5 col-md-8 col-12 mx-auto card my-5">
        <div className="card-header">Kategori Düzenle</div>
        <div className="card-body">
          {/* error alert */}
          { error && (
            <div className="alert alert-warning">
              { error }
            </div>
          ) }
          {/* form */}
          <form onSubmit={onSubmit}>
            {/* category name input */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Adı:</label>
              <input 
                placeholder={category.name}
                onChange={e=>setName(e.target.value)} 
                type="text" 
                className="form-control" />
            </div>

            {/* form submit button */}
            <button className="btn-orange me-3">
              { loadingBtn ? "Bekleyiniz..." : "Düzenle" }
            </button>
            <Link to="/admin/kategoriler" className="btn btn-secondary">İptal</Link>
          </form>
        </div>
      </div>

    </section>
  )
}

export default EditCategory