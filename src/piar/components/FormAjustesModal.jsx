import { useEffect, useMemo, useState } from "react"
import { useModalStore } from "../../hooks";

export const FormAjustesModal = () => {

    const [ formSubmitted, setFormSubmitted ] = useState(false);

    const { activeMateria, startSavingAjusteModal, setFormVisible, activeAjusteModal } = useModalStore();

    const [ formValues, setFormValues ] = useState({
        desc_ajt: '',
        id_mat: '',
        fec_dil: new Date()
    });

    const classNomInvalid = useMemo(() => {
        if( !formSubmitted ) return '';
        return ( formValues.desc_ajt.length > 0)
            ? ''
            : 'is-invalid';
    }, [formValues.desc_ajt, formSubmitted]);

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const onSubmit = async( event ) => {
        event.preventDefault();
        setFormSubmitted(true);
        if( formValues.desc_ajt.length <= 0 ) return;
        
        await startSavingAjusteModal( formValues )
        
        setFormVisible(false);
        
        setFormSubmitted(false);
    }

    useEffect(() => {
      if( activeAjusteModal !== null ){
        setFormValues({...activeAjusteModal});
      }
    }, [ activeAjusteModal ]);

  return (
    <form className="container" onSubmit={ onSubmit }>
        <div className="form-group mb-2">
            <label>Descripción</label>
            <input 
                className={`form-control ${ classNomInvalid }`}
                type="text" 
                placeholder="Descripción Ajuste" 
                name="desc_ajt" 
                onChange={ onInputChanged }
                value={ formValues.desc_ajt }
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
