import { useEffect, useMemo, useState } from "react"
import { useAuthStore, useModalStore } from "../../hooks";

export const FormNewMateria = () => {

    const [ formSubmitted, setFormSubmitted ] = useState(false);

    const { activeMateriaModal, setFormVisible, startSavingMateriaModal } = useModalStore();

    const { startLoadingProfesores, profesores, user } = useAuthStore();

    const allowedRoles = ['SuperAdmin', 'Admin'];

    const isDisabled = !allowedRoles.includes(user.roles);

    const [ formValues, setFormValues ] = useState({
        nom_mat: '',
        grd_mat: 'N/A',
        id_prof: 'N/A',
        fec_dil: new Date()
    });

    const classNomInvalid = useMemo(() => {
        if( !formSubmitted ) return '';
        return ( formValues.nom_mat.length > 0)
            ? ''
            : 'is-invalid';
    }, [formValues.nom_mat, formSubmitted]);
    
    const classGrdInvalid = useMemo(() => {
        if( !formSubmitted ) return '';
        return ( formValues.grd_mat !== "N/A" )
            ? ''
            : 'is-invalid';
    }, [ formValues.grd_mat, formSubmitted ]);
    
    const classProfInvalid = useMemo(() => {
        if( !formSubmitted ) return '';
        return ( formValues.id_prof !== "N/A" )
            ? ''
            : 'is-invalid';
    }, [ formValues.id_prof, formSubmitted ]);

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onSubmit = async( event ) => {
        event.preventDefault();
        setFormSubmitted(true);
        if( formValues.nom_mat.length <= 0 ) return;
        if( formValues.grd_mat === 'N/A' ) return;
        if (formValues.id_prof === 'N/A') return;
        
        await startSavingMateriaModal( formValues )
        setFormVisible(false);
        setFormSubmitted(false);
    }

    useEffect(() => {
        startLoadingProfesores();
    }, []);

    useEffect(() => {
      if( activeMateriaModal !== null ){
        setFormValues({...activeMateriaModal});
      }
    }, [ activeMateriaModal ]);
    
    

  return (
    <form className="container" onSubmit={ onSubmit }>
        <div className="form-group mb-2">
            <label>Nombre</label>
            <input 
                className={`form-control ${ classNomInvalid }`}
                type="text" 
                placeholder="Nombre Materia" 
                name="nom_mat"
                onChange={ onInputChanged }
                value={ formValues.nom_mat }
            ></input>
        </div>

        <div className="form-group mb-2">
            <label>Grado</label>
            <select 
                className={`form-control ${ classGrdInvalid }`}
                aria-label="Default select example"
                name="grd_mat"
                onChange={ onInputChanged }
                value={ formValues.grd_mat }
            >
                <option value="N/A">Grado</option>
                <option value="Pre-jardin">Pre-jardín</option>
                <option value="Jardin">Jardín</option>
                <option value="Transicion">Transición</option>
                <option value="1">1º</option>
                <option value="2">2º</option>
                <option value="3">3º</option>
                <option value="4">4º</option>
                <option value="5">5º</option>
                <option value="6">6º</option>
                <option value="7">7º</option>
                <option value="8">8º</option>
                <option value="9">9º</option>
                <option value="10">10º</option>
                <option value="11">11º</option>
            </select>
        </div>
        <div className="form-group mb-3">
            <label>Profesor</label>
            <select 
                className={`form-control ${ classProfInvalid }`}
                name="id_prof"
                onChange={ onInputChanged }
                value={ formValues.id_prof }
                disabled={ isDisabled }
            >
                {
                    profesores.map( profesor => (
                        <option key={ profesor.id } value={ profesor.id }> 
                            { profesor.nombres } { profesor.apellidos } - { profesor.rol }
                        </option>
                    ))
                }
                <option value="N/A">Profesor</option>
            </select>
        </div>

        <button
            type="submit"
            className="btn btn-outline-primary btn-block"
        >
            <i className="far fa-save"></i>
            <span> Guardar</span>
        </button>
    </form>
  )
}
