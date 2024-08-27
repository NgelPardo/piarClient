import { Link } from "react-router-dom";
import { useAuthStore } from "../../hooks"
import { PiarLayout } from "../layout/PiarLayout"

export const HomePage = () => {

  const { user } = useAuthStore();

  return (
    <PiarLayout>
      <div className="row" style={{ margin: '0px 0px'}}>
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card mb-3">
            <div className="row g-0">
              <div className="col-md-4 text-center">
                <img src="/formfiles.svg" alt="FormPiar" style={{ width: "80%" }}/>
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">Formularios PIAR</h5>
                  <p className="card-text">Espacio centralizado donde puedes crear nuevos formularios, realizar ediciones o eliminar los existentes.</p>
                  <Link to="/form" className="btn btn-primary">
                    Administrar documentos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {
          (user.roles.includes("SuperAdmin") || user.roles.includes("Admin")) && (
            <div className="col-sm-6">
              <div className="card mb-3">
                <div className="row g-0">
                  <div className="col-md-4 text-center">
                    <img src="/usersform.svg" alt="FormPiar" style={{ width: "80%" }}/>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Usuarios</h5>
                      <p className="card-text">Espacio centralizado donde puedes crear nuevos usuarios, editarlos o inhabilitar los existentes.</p>
                      <Link to="/users" className="btn btn-primary">
                        Gestionar Usuarios
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </PiarLayout>
  )
}
