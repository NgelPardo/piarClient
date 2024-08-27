import PropTypes from 'prop-types';
import { useForm } from '../../hooks';

export const TablaAjustesBody = ({
    matsPiarState,
    onOpenModalMaterias,
    onOpenModalHerramientas,
    btnAddMateria,
    onOpenModalDelete
}) => {

    const { deleteHerramientasPiar } = useForm();

    const onHandleDelte = ( id, idMat, tipoHerramienta ) => {
        deleteHerramientasPiar({ materia: idMat, herramientaId: id, tipoHerramienta })
    }

    return (
    <>
    { matsPiarState.map((materia) => (
        <tr key={ materia.id_mat }>
            <td className='text-center'>
                {materia.nom_mat}
                <button 
                    type="button" 
                    className="btn btn-danger"
                    onClick={ () => onOpenModalDelete( materia, 'delete') }
                >
                    <i className="fa-solid fa-trash-can"></i>
                </button>
            </td>
            <td>profesor</td>
            <td className='text-center'>
                {
                    materia.objetivos.map((objetivo) => (
                        <div
                            key={objetivo.id}
                            className='contenedor-herramienta'
                        >
                            <div className='text-end' style={{ paddingRight: "10px" }}>
                                <button className='button-del-herr' onClick={ () => onHandleDelte( objetivo.id, materia.id, 'objetivos' ) }>
                                    <i className="fa-solid fa-x"></i>
                                </button>
                            </div>
                            <div>
                                <p> {objetivo.desc_obj} </p>
                            </div>
                        </div>
                    )) 
                }
                <button
                    className='btn btn-success'
                    onClick={() => onOpenModalHerramientas( materia, 'objetivos' ) }
                >
                    <i className="fa-solid fa-plus"></i>
                </button>
            </td>
            <td className='text-center'>
                {
                    materia.barreras.map((barrera) => (
                        <div key={barrera.id} className='contenedor-herramienta'>
                            <div className='text-end' style={{ paddingRight: "10px" }}>
                                <button className='button-del-herr' onClick={ () => onHandleDelte( barrera.id, materia.id, 'barreras' ) }>
                                    <i className="fa-solid fa-x"></i>
                                </button>
                            </div>
                            <div>
                                <p> {barrera.desc_barr} </p>
                            </div>
                        </div>
                    )) 
                }
                <button 
                    className='btn btn-success'
                    onClick={() => onOpenModalHerramientas( materia, 'barreras' ) }
                >
                    <i className="fa-solid fa-plus"></i>
                </button>
            </td>
            <td className='text-center'>
                {
                    materia.ajustes.map((ajuste) => (
                        <div key={ajuste.id} className='contenedor-herramienta'>
                            <div className='text-end' style={{ paddingRight: "10px" }}>
                                <button className='button-del-herr' onClick={ () => onHandleDelte( ajuste.id, materia.id, 'ajustes' ) }>
                                    <i className="fa-solid fa-x"></i>
                                </button>
                            </div>
                            <div>
                                <p> {ajuste.desc_ajt} </p>
                            </div>
                        </div>
                    )) 
                }
                <button 
                    className='btn btn-success'
                    onClick={() => onOpenModalHerramientas( materia, 'ajustes' ) }
                >
                    <i className="fa-solid fa-plus"></i>
                </button>
            </td>
            <td className='text-center'>
                {
                    materia.evaluaciones.map((evaluacion) => (
                        <div key={evaluacion.id} className='contenedor-herramienta'>
                            <div className='text-end' style={{ paddingRight: "10px" }}>
                                <button className='button-del-herr' onClick={ () => onHandleDelte( evaluacion.id, materia.id, 'evaluaciones' ) }>
                                    <i className="fa-solid fa-x"></i>
                                </button>
                            </div>
                            <div>
                                <p> {evaluacion.desc_eva} </p>
                            </div>
                        </div>
                    )) 
                }
                <button 
                    className='btn btn-success'
                    onClick={() => onOpenModalHerramientas( materia, 'evaluaciones' ) }
                >
                    <i className="fa-solid fa-plus"></i>
                </button>
            </td>
        </tr>    
    )) }
    <tr>
        <td>
        <button 
            type="button" 
            className="btn btn-primary" 
            onClick={ onOpenModalMaterias }
            ref={ btnAddMateria }
        >
            Añadir Materia
        </button>
        </td>
        <td>Docente</td>
        <td>Objetivos</td>
        <td>Barreras</td>
        <td>Ajustes</td>
        <td>Evaluaciones</td>
        </tr>
    </>
  )
}

TablaAjustesBody.propTypes = {
    matsPiarState: PropTypes.array.isRequired,
    onOpenModalMaterias: PropTypes.func.isRequired,
    onOpenModalHerramientas: PropTypes.func.isRequired,
};
