import { useEffect, useMemo, useState } from "react"
import { useModalStore } from "../../hooks";

export const FormEvaluacionesModal = () => {

    const [ formSubmitted, setFormSubmitted ] = useState(false);

    const { activeMateria, startSavingEvaluacionModal, setFormVisible, activeEvaluacionModal } = useModalStore();

    const [ formValues, setFormValues ] = useState({
        desc_eva: '',
        id_mat: '',
        fec_dil: new Date()
    });

    const classNomInvalid = useMemo(() => {
        if( !formSubmitted ) return '';
        return ( formValues.desc_eva.length > 0)
            ? ''
            : 'is-invalid';
    }, [formValues.desc_eva, formSubmitted]);

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onSubmit = async( event ) => {
        event.preventDefault();
        setFormSubmitted(true);
        if( formValues.desc_eva.length <= 0 ) return;
        
        await startSavingEvaluacionModal( formValues )
        
        setFormVisible(false);

        setFormSubmitted(false);
    }

    useEffect(() => {
      if( activeEvaluacionModal !== null ){
        setFormValues({...activeEvaluacionModal});
      }
    }, [ activeEvaluacionModal ]);

  return (
    <form className="container" onSubmit={ onSubmit }>
        <div className="form-group mb-2">
            <label>Descripción</label>
            <input 
                className={`form-control ${ classNomInvalid }`}
                type="text" 
                placeholder="Descripción Evaluación" 
                name="desc_eva" 
                onChange={ onInputChanged }
                value={ formValues.desc_eva }
            ></input>
        </div>
        <div className="form-group mb-3">
            <label>Materia</label>
            <select 
                className="form-control"
                name="id_mat"
                value={ formValues.id_mat }
                disabled={ true }
            >
                <option value={ activeMateria.id }>{ activeMateria.nom_mat }</option>
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
