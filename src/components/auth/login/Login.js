import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../../../context/UserContext'
import { toast } from 'react-toastify';
import db from "../../../firebase/firebaseConfig"

const Login = () => {
  const navigate = useNavigate()
  const { logged, googleLogin } = useContext(UserContext)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [error, setError] = useState("")

  const checkForm = () => {
    let checked = false

    if(email.trim()){
      if(password.trim()){
        checked = true
      }else{
        setError("Parola boş bırakılamaz.")
      }
    }else{
      setError("Email boş bırakılamaz.")
    }

    return checked
  }

  const googleLoginBtn = () => {
    setLoadingBtn(true)
    googleLogin()
    setTimeout(() => {
      setLoadingBtn(false)
    }, 3600);
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(checkForm() && !loadingBtn){
      setLoadingBtn(true)
      db.ref("users").once("value")
      .then(snapshot => {
        const users = []
        snapshot.forEach(item => {
          users.push({
            id: item.key,
            ...item.val()
          })
        })

        let exist = false
        users.forEach(user => {
          if(user.email === email && user.password === password){
            exist = true
            toast.success("Giriş yapıldı.")
            logged(user)
            setLoadingBtn(false)
          }
        })
        if(!exist){
          setError("Email veya parola hatalı")
          setLoadingBtn(false)
        }
      })
    }
  }

  return (
    <section id="login" className='py-5' style={{ minHeight: "93.5vh" }}>
      <div className="container">
        <div className="row d-flex align-items-center pt-5 justify-content-center">
          {/* login image */}
          <div className="col-lg-7 col-12 order-lg-1 order-2">
            <img src="/img/image1.png" alt="" className="img-fluid" />
          </div>
          {/* login card */}
          <div className="col-lg-5 col-12 order-lg-2 order-1">
            <div className="card bg-white py-3">
              <h3 className='mb-3 text-center text-decoration-underline'>Giriş Yap</h3>
              <div className="card-body px-5">
                {/* error alert */}
                { error && (
                  <div className="alert alert-warning">
                    { error }
                  </div>
                ) }
                {/* signIn with google */}
                <button disabled={loadingBtn} onClick={googleLoginBtn} className="btn btn-danger d-block w-100 text-center">
                  <i className="fab fa-google me-2"></i> Google ile Giriş 
                </button>
                <hr />
                {/* form */}
                <form onSubmit={onSubmit}>
                  {/* username */}
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Email:</label>
                    <input onChange={e=>setEmail(e.target.value)} type="text" className="form-control" />
                  </div>
                  {/* password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Parola:</label>
                    <input onChange={e=>setPassword(e.target.value)} type="password" className="form-control" />
                  </div>

                  {/* form submit button */}
                  <button className="btn-orange d-block w-100 mb-3">
                    { loadingBtn ? "Bekleyiniz..." : "Giriş Yap" }
                  </button>
                  
                  {/* forgot password and go register */}
                  <Link to="/forgot-password" className="d-block text-center text-decoration-none text-secondary mb-3">Parolanı mı Unuttun?</Link>
                  <div className='text-secondary d-flex flex-wrap gap-3 justify-content-center'>
                    <span className='d-inline-block'>Hesabın yok mu?</span>
                    <Link to="/kayit-ol" className="d-inline-block text-center text-decoration-none">Kayıt Ol</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Login