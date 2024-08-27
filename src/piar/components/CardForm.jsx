import { format } from 'date-fns'
import './CardForm.css'
import { useAuthStore, usePiarStore } from '../../hooks'
import { useNavigate } from 'react-router-dom';

export const CardForm = ({
    id,
    nomEst,
    docEst,
    fecDil,
    estPiar,
    ultGrado
}) => {

    const { user } = useAuthStore();

    const { startLoadingPiarPt1ById } = usePiarStore();

    const navigate = useNavigate();

    const onHandleEdit = async( idPiar ) => {
        await startLoadingPiarPt1ById( idPiar );
        navigate('/piar');
    }

    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{ nomEst }</h5>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item"><b>Identificacion:</b> { docEst }</li>
                        <li className="list-group-item"><b>Fecha Creacion:</b> { format(new Date(fecDil), 'dd/MM/yyyy') }</li>
                        <li className="list-group-item">
                            <b>Estado: </b>
                            {
                                estPiar === 1 ? (
                                    <span className="badge badge-success badge-outlined">Completado</span>
                                ) : ( 
                                    estPiar === 2 ? ( 
                                    <span className="badge badge-default badge-outlined">Pendiente</span>
                                ) : estPiar === 3 ? (
                                    <span className="badge badge-warning badge-outlined">En Revisión</span>
                                ) : null
                                )
                            }
                        </li>
                        <li className="list-group-item">
                            <b>Curso: </b>
                            { ultGrado }
                        </li>
                    </ul>
                    <div className="row text-center w-80 mx-auto mt-2">
                        {
                            user.roles !== 'Auxiliar'
                            ? (
                                <>
                                <div className="col">
                                    <button 
                                        type="button" 
                                        className="btn btn-primary" 
                                        title="Editar"
                                        onClick={ () => onHandleEdit( id ) }
                                    >
                                        <i className="fa-solid fa-file-pen"></i>
                                    </button>
                                </div>
                                <div className="col">
                                    <button type="button" className="btn btn-danger" title="Eliminar">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </div>
                                <div className="col">
                                    <button type="button" className="btn btn-secondary" title="Descargar">
                                        <i className="fa-solid fa-file-arrow-down"></i>
                                    </button>
                                </div>
                                </>
                            ): (
                                <>
                                <div className="col">
                                    <button type="button" className="btn btn-primary" title="Editar">
                                        <i className="fa-solid fa-eye"></i>
                                    </button>
                                </div>
                                <div className="col">
                                    <button type="button" className="btn btn-secondary" title="Descargar">
                                        <i className="fa-solid fa-file-arrow-down"></i>
                                    </button>
                                </div>
                                </>
                            )
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
