import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import db from "../../../firebase/firebaseConfig"
import { toast } from 'react-toastify';
import UserContext from '../../../context/UserContext';

const Register = () => {
  const navigate = useNavigate()
  const { logged, googleLogin } = useContext(UserContext)

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repassword, setRepassword] = useState("")
  const [loadingBtn, setLoadingBtn] = useState(false)
  const [error, setError] = useState("")

  const checkForm = () => {
    let checked = false

    if((username.trim().length > 3 && username.trim().length < 15)){
      if(email.indexOf("@") > 1 && email.indexOf(".com") > 1){
        if(password.trim()){
          if(password === repassword){
            checked = true
          }else{
            setError("Parolalar uyuşmuyor.")
          }
        }else{
          setError("Parola boş bırakılamaz.")
        }
      }else{
        setError("Geçerli email girmediniz.")
      }
    }else{
      setError("Kullanıcı adı 3 ile 15 karakter içerebilir.")
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
          if(user.username === username){
            setError("Bu kullanıcı adı kullanılmaktadır.")
            exist = true
          }
          if(user.email === email){
            setError("Bu email kullanılmaktadır.")
            exist = true
          }
        })

        if(!exist){
          let newUser = {
            username: username,
            email: email,
            password: password,
            type: "user"
          }
          db.ref("users").push(newUser)
          .then(res => {
            newUser.id = res.key
    
            toast.success("Kayıt yapıldı.")
            logged(newUser)
            setError("")
            setLoadingBtn(false)
            navigate("/")
          }).catch(err => {
            setError("Bilinmeyen hata: " + err)
            setLoadingBtn(false)
          })
        }else{
          setLoadingBtn(false)
        }
      }).catch(err => {
        setError("users hata: " + err)
        setLoadingBtn(false)
      })
    }
  }

  return (
    <section id="register" className='py-5' style={{ minHeight: "93.5vh" }}>
      <div className="container">
        <div className="row d-flex align-items-center pt-5 justify-content-center">

          {/* register image */}
          <div className="col-lg-7 col-12 order-lg-1 order-2">
            <img src="/img/image1.png" alt="" className="img-fluid" />
          </div>

          {/* register card */}
          <div className="col-lg-5 col-12 order-lg-2 order-1">
            <div className="card bg-white py-3">
              <h3 className='mb-3 text-center text-decoration-underline'>Kayıt Ol</h3>
              <div className="card-body px-5">
                {/* error alert */}
                { error && (
                  <div className="alert alert-warning">
                    { error }
                  </div>
                ) }
                {/* singIn with google */}
                <button disabled={loadingBtn} onClick={googleLoginBtn} className="btn btn-danger d-block w-100 text-center">
                  <i className="fab fa-google me-2"></i> Google ile Kaydol 
                </button>
                <hr />
                {/* form */}
                <form onSubmit={onSubmit}>
                  {/* username */}
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label">Kullanıcı Adı:</label>
                    <input onChange={e=>setUsername(e.target.value)} type="text" className="form-control" />
                  </div>
                  {/* email */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input onChange={e=>setEmail(e.target.value)} type="text" className="form-control" />
                  </div>
                  {/* password */}
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Parola (Tekrar):</label>
                    <input onChange={e=>setPassword(e.target.value)} type="password" className="form-control" />
                  </div>
                  {/* repassword */}
                  <div className="mb-3">
                    <label htmlFor="repassword" className="form-label">Parola:</label>
                    <input onChange={e=>setRepassword(e.target.value)} type="password" className="form-control" />
                  </div>

                  {/* form submit button */}
                  <button className="btn-orange d-block w-100 mb-3">
                    { loadingBtn ? "Bekleyiniz..." : "Kayıt Ol" }
                  </button>
                  {/* go login */}
                  <div className='text-secondary d-flex flex-wrap gap-3 justify-content-center'>
                    <span className='d-inline-block'>Hesabın var mı?</span>
                    <Link to="/giris-yap" className="d-inline-block text-center text-decoration-none">Giriş Yap</Link>
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

export default Register