  import { useEffect, useState } from 'react';
  import { NavLink, useLocation } from 'react-router-dom'

  import './SideBar.css'
import { useAuthStore, useUiStore } from '../../hooks';

  export const SideBar = () => {

    const { windowWidth, isSideBarOpen } = useUiStore();
    const { startLogout, user } = useAuthStore();

    const [mostrarSpan, setMostrarSpan] = useState(false);
    const location = useLocation();

    useEffect(() => {
      if (isSideBarOpen) {
        setTimeout(() => {
          setMostrarSpan(true);
        }, 150);
      } else {
        setMostrarSpan(false);
      }
    }, [isSideBarOpen]);

    const isLocation = () => {
      return location.pathname.startsWith("/piar");
    };
      
    return (
      <div className="container g-0">
        <div className="row g-0">
          <div className="col-md-12">
            <div className="d-flex flex-column text-white py-3 class-sidebar vh-100">
              <span 
                className={`d-flex justify-content-center align-items-center mb-3 mb-md-0 text-white text-decoration-none ${isSideBarOpen ? '' : 'p-3'}`}
                style={{ height: "30px" }}
              >
                  <i className="fa-solid fa-laptop-file me-1 fs-5"></i>
                  {
                    mostrarSpan && ( <span className="fs-4">{ user.roles }</span> )
                  }
              </span>
              <hr />
              <ul className={`nav nav-pills flex-column mb-auto ${isSideBarOpen ? '' : 'ul-close'}`} style={{paddingLeft: '10px' }}>
                <li className={`nav-item ${ isSideBarOpen & windowWidth < 780 ? 'd-none' : ''}`} style={{ height: "45px", maxWidth: '100%'}}>
                  <NavLink 
                    to="/" 
                    className={ ({isActive}) => `nav-link d-flex align-items-center ${ isActive ? 'active-per' : ''}`}
                  >
                    <i className="fa-solid fa-house-chimney me-3 fixed-width-icon"></i>
                    { mostrarSpan && ( <span> Inicio </span> ) }
                  </NavLink>  
                </li>
                <li className={`nav-item ${ isSideBarOpen & windowWidth < 780 ? 'd-none' : ''}`} style={{ height: "45px", maxWidth: '100%'}}>
                  <NavLink 
                    to="/form"
                    className={ ({isActive}) => `nav-link d-flex align-items-center ${ isActive || isLocation() ? 'active-per' : ''}`}
                  >
                      <i className="fa-solid fa-file-lines me-3 fixed-width-icon"></i>
                      {
                        mostrarSpan && ( <span> Piar Form </span> )
                      }
                  </NavLink>
                </li>
                {
                  (user.roles.includes("SuperAdmin") || user.roles.includes("Admin")) && (
                    <li className={`nav-item ${ isSideBarOpen & windowWidth < 780 ? 'd-none' : ''}`} style={{ height: "45px", maxWidth: '100%'}}>
                      <NavLink 
                        to="/users" 
                        className={ ({isActive}) => `nav-link d-flex align-items-center ${ isActive ? 'active-per' : ''}`}
                      >
                          <i className="fa-solid fa-users me-3 fixed-width-icon"></i>
                          {
                            mostrarSpan && ( <span> Usuarios </span> )
                          }
                      </NavLink>
                    </li>
                  )
                }
                
              </ul>
              <hr />
              <div className="dropdown">
                <a
                  type='button'
                  className="d-flex align-items-center justify-content-center text-white text-decoration-none dropdown-toggle"
                  id="dropdownMenuButton"
                  data-toggle="dropdown" 
                  aria-haspopup="true" 
                  aria-expanded="false"
                >
                  <i className="fa-regular fa-user me-1"></i>
                  {
                    isSideBarOpen && ( <strong> { user.name } </strong> )
                  }
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-dark text-small shadow dropdown-menu-end"
                  aria-labelledby="dropdownUser1"
                  style={{zIndex: '2000'}}
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Cambiar contraseña
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a 
                      className="dropdown-item" 
                      onClick={ startLogout }
                    >
                      Cerrar sesión
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
