import React, { useContext, useEffect, useState } from 'react'
import UserContext from "../../../context/UserContext"
import { toast } from 'react-toastify';

const Contact = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [comment, setComment] = useState("")
  const [error, setError] = useState("")

  const { getLogged, loggedUser } = useContext(UserContext)

  useEffect(() => {
    getLogged()
  }, [])

  const checkForm = () => {
    let checked = false
    if((name.trim().length > 3 && name.trim().length < 15) || loggedUser){
      if(email.indexOf("@") > 1 && email.indexOf(".com") > 1 || loggedUser){
        if(comment.trim()){
          checked = true
        }else{
          setError("Yorumunuzu girmediniz.")
        }
      }else{
        setError("Geçerli email girmediniz.")
      }
    }else{
      setError("Adınız 3 ile 15 karakter içerebilir.")
    }

    return checked
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(checkForm()){
      setName()
      setEmail()
      setComment()

      toast.success("Yorumunuz alındı.")
    }
  }

  return (
    <section id="contact" className="container my-5">
      
      <div className="col-12 mb-3">
         <iframe className='border-0' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d99683.76025247523!2d29.33616001036007!3d38.66916741580691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c87fd9700e8031%3A0xe9e1c5b72df9bba3!2zVcWfYWssIFXFn2FrIE1lcmtlei9VxZ9haw!5e0!3m2!1str!2str!4v1640245027343!5m2!1str!2str" width="100%" height="450" loading="lazy"></iframe>
      </div>

      <div className="row">
        <div className="col-lg-6 mb-3 order-lg-3">
          <div className="card">
            <div className="card-body text-center">
              <h4 className='mb-4'>Bize Ulaşın:</h4>
              <div className="w-100 mb-2">
                <i className="fas fa-map-pin mr-1"></i> Hacı Hüsrev Mahallsesi Nergis Sokak No: 13/6 Kızılca/UŞAK
              </div>
              <div className="w-100 mb-2">
                <i className="fas fa-phone mr-1"></i> 0 202 333 55 33
              </div>
              <div className="w-100 mb-2">
                <i className="far fa-envelope-open mr-1"></i> info@birsirket.com
              </div>
              <div className="w-100 mb-2">
                <i className="fas fa-globe-americas mr-1"></i> www.birsirket.com
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-3 order-lg-2">
          <div className="card">
            <div className="card-header text-center"><h4 className='mb-0'>Bize Yazın</h4></div>
            <div className="card-body">
              { error && (
                <div className="alert alert-warning">
                  { error }
                </div>
              ) }
              <form onSubmit={onSubmit}>
                { !loggedUser && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">Adınız</label>
                      <input onChange={e=>setName(e.target.value)} type="text" className="form-control" />
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Emailiniz</label>
                      <input onChange={e=>setEmail(e.target.value)} type="text" className="form-control" />
                    </div>
                  </>
                ) }

                <div className="mb-3">
                  <label className="form-label">Yorumunuz</label>
                  <textarea onChange={e=>setComment(e.target.value)} type="text" className="form-control" />
                </div>

                <div className="text-end">
                  <button className="btn-orange">Gönder</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Contact