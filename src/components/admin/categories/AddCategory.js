import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import db from "../../../firebase/firebaseConfig"

const AddCategory = () => {
  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [error, setError] = useState("")

  const onSubmit = (e) => {
    e.preventDefault()

    if(name.trim() && !loadingBtn){
      setLoadingBtn(true)

      db.ref("categories").push({
        name: name,
        addedDate: new Date()
      })
      .then(res => {
        navigate("/admin/kategoriler")
      })
      .catch(err => {
        setError("Bilinmeyen hata")
        setLoadingBtn(false)
      })
    }else{
      setError("Kullanıcı adı boş bırakılamaz.")
    }
  }

  return (
    <section id="add-category" className='container'>
      
      <div className="col-lg-5 col-md-8 col-12 mx-auto card my-5">
        <div className="card-header">Kategori Ekle</div>
        <div className="card-body">
          {/* error alert */}
          { error && (
            <div className="alert alert-warning">
              { error }
            </div>
          ) }
          {/* form */}
          <form onSubmit={onSubmit}>
            {/* category name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Adı:</label>
              <input onChange={e=>setName(e.target.value)} type="text" className="form-control" />
            </div>

            {/* form submit button */}
            <button className="btn-orange">
              { loadingBtn ? "Bekleyiniz..." : "Kategori Ekle" }
            </button>
          </form>
        </div>
      </div>

    </section>
  )
}

export default AddCategory