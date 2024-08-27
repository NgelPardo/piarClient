import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

import { Piar1_1, Piar1_2, Piar1_3, Piar1_4, PiarFirmas } from "./";
import { useForm, useUiStore, useInputValidationClass, usePiarStore } from "../../hooks";
import { fieldNamesToValidateForm } from "../../helpers"; 


export const Piar1 = () => {

    const [ formSubmitted, setFormSubmitted ] = useState( false );
    const { parteActual, setParteActual } = useUiStore();
    const { startSavingPiar, startLoadingPiarPt2ById } = usePiarStore();
    const { formState1, setInitialForm2 } = useForm();

    const { classes, hasEmptyFields } = useInputValidationClass( formState1, formSubmitted, fieldNamesToValidateForm );

    const onSubmit = async (event) => {
        event.preventDefault();
        setFormSubmitted( true );
        
        if ( hasEmptyFields ) return;

        const data = await startSavingPiar(formState1);

        const idPiar = data.data ? data.data : data;
        
        if ( idPiar ) {
            
            const form2 = await startLoadingPiarPt2ById( idPiar );

            setInitialForm2(
                {
                    ...form2,
                    nom_est: formState1.nom_est,
                    doc_est: formState1.doc_est,
                    edad_est: formState1.edad_est,
                    docs_ela: JSON.parse(form2.docs_ela),
                    id: idPiar 
                });
            setParteActual( parteActual + 1 );  
        }
    }

  return (
    <div className="container-fluid">
        <div className="row text-center">
            <div style={{width:'80%', margin: 'auto'}}>
                <img src="./Min.PNG" alt="" style={{maxWidth: '100%', height: 'auto'}}/>
            </div>
        </div>
        <div className="row text-center">
            <h4>
                INFORMACIÓN GENERAL DEL ESTUDIANTE
            </h4>
            <h4>
                (Información para la matrícula – Anexo 1 PIAR)
            </h4>
        </div>
        <div className="row text-center">
            <div className="mt-3" style={{width: '80%', margin: 'auto'}}>
                <div style={{height: '25px'}} className="progress" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                    <div className="progress-bar bg-success" style={{width: '25%'}}>25%  Información general del estudiante</div>
                </div>
            </div>
        </div>
        <form className="row g-2 justify-content-center mt-3" onSubmit={ onSubmit }>
            {/* DILIGENCIAMIENTO */}
            <Piar1_1 inputClasses={ classes }/>
            <Piar1_2 inputClasses={ classes }/>
            <Piar1_3 inputClasses={ classes }/>
            <Piar1_4 inputClasses={ classes }/>
            <PiarFirmas />
            <div className="container">
                <div className="row">
                    <div className="col ps-4">
                          <div className="mx-auto d-flex" style={{ width: '25%' }}>
                              <div style={{width: '100%'}}>
                                <button 
                                    style={{width: '80%'}} 
                                    className="btn btn-secondary"
                                >Anterior</button>
                                </div>
                                <div style={{width: '100%'}}>
                                <button 
                                    style={{width: '80%'}} 
                                    className="btn btn-success"
                                    type="submit"  
                                >Siguiente</button>
                              </div>
                          </div>
                    </div>
                </div>
            </div>  
        </form>
    </div>
  )
}
