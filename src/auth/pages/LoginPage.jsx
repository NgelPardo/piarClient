import { useEffect } from 'react';
import { useAuthStore, useFormAuth } from '../../hooks';
import './LoginPage.css';
import Swal from 'sweetalert2';

const loginFormFields = {
  loginEmail: '',
  loginPassword: '',
}

export const LoginPage = () => {

  const { startLogin, errorMessage } = useAuthStore();

  const { loginEmail, loginPassword, onInputChange } = useFormAuth( loginFormFields );
  
  const loginSubmit = ( event ) => {
    event.preventDefault();
    startLogin({ email: loginEmail, password: loginPassword });
  }

  useEffect(() => {
    if ( errorMessage !== undefined ) {
      Swal.fire('Error en la autenticación', errorMessage, 'error');
    }
  }, [ errorMessage ])

  return (
    <section className="vh-100" style={{backgroundColor: "#508bfc"}}>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
              <form onSubmit={ loginSubmit }>
              <div className="card-body p-5 text-center">

                <h2 className="mb-5">Ingreso de Usuario</h2>

                <div className="form-floating mb-3">
                  <input 
                    type="email" 
                    className="form-control" 
                    id="floatingInput" 
                    placeholder="name@example.com" 
                    name="loginEmail"
                    value={ loginEmail }
                    onChange={ onInputChange }
                  />
                  <label htmlFor="floatingInput">Correo electrónico</label>
                </div>

                <div className="form-floating mb-3">
                  <input 
                    type="password" 
                    className="form-control" 
                    id="floatingPassword" 
                    placeholder="Password"
                    name="loginPassword"
                    value={ loginPassword }
                    onChange={ onInputChange }
                  />
                  <label htmlFor="floatingPassword">Contraseña</label>
                </div>

                <div className="d-grid gap-2">
                  <button 
                    className="btn btn-lg btn-block btn-log" 
                    type="submit"
                    // style={{
                    //   backgroundColor: "#508bfc",
                    //   color: "#fff"
                    // }}
                  >
                    Iniciar sesión
                  </button>
                </div>

                <hr className="my-4" />

                </div>
              </form>  
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
