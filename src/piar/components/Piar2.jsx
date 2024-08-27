import ReactDatePicker, { registerLocale } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import Swal from "sweetalert2";

import { useForm, useInputValidationClass, usePiarStore, useUiStore } from "../../hooks"
import { useEffect, useState } from "react";
import { fieldNamesToValidateForm2 } from "../../helpers";

registerLocale( 'es', es );

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

export const Piar2 = ({ setPeriodoAcademico, periodoAcademico }) => {

  const [ formSubmitted, setFormSubmitted ] = useState( false );
  const { formState2, onInputChange, onDateChange, onNewInputChange, onArrayInputChange } = useForm();
  const { parteActual, setParteActual } = useUiStore();
  const { startSavingPiar } = usePiarStore();

  const { classes, hasEmptyFields } = useInputValidationClass( formState2, formSubmitted, fieldNamesToValidateForm2 );

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted( true );
    
    if ( hasEmptyFields ) return;
    
    if ( periodoAcademico === null || periodoAcademico === 'null' ){
      Toast.fire({
        icon: "error",
        title: "Debes elegir el periodo academico"
      });
      return;
    }

    const id = await startSavingPiar( formState2 );
    
    if ( id ) setParteActual( parteActual + 1 );
    setParteActual( parteActual + 1 );
  }

  const onInputRadioChange = ({ target }) => {
    const { value } = target;
    setPeriodoAcademico( value );
  }

  const handlePushInput = ( prop, key_1, key_2, val, formName ) => {
    onNewInputChange( true, prop, key_1, key_2, val, formName );
  }

  const handleSubInput = ( prop, formName ) => {
    onNewInputChange( false, prop, null, null, null, formName );
  }

  const onBtnBack = () => {
    setParteActual( parteActual - 1 );
  }

  useEffect(() => {
    setPeriodoAcademico(null);
  }, [])

  return (
    <div className="container-fluid">
      <div className="row text-center">
          <div style={{width:'80%', margin: 'auto'}}>
              <img src="./Min.PNG" alt="" style={{maxWidth: '100%', height: 'auto'}}/>
          </div>
      </div>
      <div className="row text-center">
            <h4>
                Plan Individual de Ajustes Razonables - PIAR -
            </h4>
            <h4>
                ANEXO 2
            </h4>
      </div>
      <div className="row text-center">
          <div className="mt-3" style={{width: '80%', margin: 'auto'}}>
              <div style={{height: '25px'}} className="progress" role="progressbar" aria-label="Success example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                  <div className="progress-bar bg-success" style={{width: '50%'}}>50%  Plan Individual</div>
              </div>
          </div>
      </div>
      <form className="row g-2 justify-content-center mt-3" onSubmit={ onSubmit }>
        <div className="col-10 p-4 contenedor-form mb-3" style={{ backgroundColor: '#F3F3F3', borderRadius: '10px' }}>
          <div className="row">
              <div className="col-md-6">
                  <label htmlFor="fec_dig_a2" className="form-label">Fecha y lugar de diligenciamiento</label>
                  <div className="input-group">
                      <ReactDatePicker 
                          selected={ new Date(formState2.fec_dig_a2) } 
                          className="form-control input-date"
                          onChange={ (event) => onDateChange( event, 'fec_dig_a2', 'formState2')}
                          locale="es"
                          id="fec_dig_a2"
                      />
                      <div className="ico-input" style={{ color: '#00000' }}>
                          <i className="fa-solid fa-calendar-days"></i>
                      </div>
                  </div>
              </div>
              <div className="col-md-6">
                  <label htmlFor="inst_edu_a2" className="form-label">Institución educativa</label>
                  <input 
                    type="text" 
                    className={`form-control ${ classes.inst_edu_a2 }`}
                    id="inst_edu_a2"
                    name="inst_edu_a2"
                    value={ formState2.inst_edu_a2 }
                    onChange={ (event) => onInputChange(event, "formState2") }
                  />
              </div>
              <div className="col-md-6">
                  <label htmlFor="sed_a2" className="form-label">Sede</label>
                  <input 
                    type="text" 
                    className={`form-control ${ classes.sed_a2 }`}
                    id="sed_a2"
                    name="sed_a2"
                    value={ formState2.sed_a2 }
                    onChange={ (event) => onInputChange(event, "formState2") }
                  />
              </div>
              <div className="col-md-6">
                  <label htmlFor="jor_a2" className="form-label">Jornada</label>
                  <input 
                    type="text" 
                    className={`form-control ${ classes.jor_a2 }`}
                    id="jor_a2"
                    name="jor_a2"
                    value={formState2.jor_a2}
                    onChange={ (event) => onInputChange(event, "formState2") }
                  />
              </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              <label className="form-label">Docentes que elaboran y cargo</label>
              {formState2.docs_ela.map((doc, index) => (
                <div className="row" key={`doc${index}`}>
                  <div className="col-6">
                    <label className="form-label" htmlFor={`doc_nombres${index}`}>Nombres y apellidos</label>
                    <input 
                      type="text" 
                      className={`form-control ${ classes.docs_ela }`}
                      id={ `doc_nombres${index}` }
                      name={ `docs_ela[${index}].nombres` }
                      value={ doc.nombres }
                      onChange={ (event) => onArrayInputChange(event, "formState2") }
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label" htmlFor={ `doc_cargo${index}` }>Cargo</label>
                    <input 
                      type="text" 
                      className="form-control"
                      id={ `doc_cargo${index}` }
                      name={ `docs_ela[${index}].cargo` }
                      value={ doc.cargo }
                      onChange={ (event) => onArrayInputChange(event, "formState2") }
                    />
                  </div>
                  {
                    formState2.docs_ela.length > 1 && ( <hr className="mt-1"/> )
                  }
                </div>
              ))}
              <div className={`row text-center justify-content-center pe-md-5 pe-0  ${ formState2.docs_ela.length === 1 ? 'mt-2' : '' }`}>
                <div className="col-3">
                  <button
                    type="button"
                    className={`btn bg-success`}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ffff'
                    }}
                    onClick={ () => handlePushInput('docs_ela', 'nombres', 'cargo', '', 'formState2') }
                  ><i className="fa-solid fa-plus"></i></button>
                </div>
                {
                  formState2.docs_ela.length > 1 && (
                    <div className="col-3">
                      <button
                        type="button"
                        className="btn bg-danger"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ffff'
                        }}
                        onClick={ () => handleSubInput('docs_ela', 'formState2') }
                      ><i className="fa-solid fa-minus"></i></button>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
        </div>
        <div className="col-10 p-4 contenedor-form mb-3" style={{ backgroundColor: '#F3F3F3', borderRadius: '10px' }}>
          <span>DATOS DEL ESTUDIANTE</span><hr />
          <div className="row">
            <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">Nombre del estudiante</label>
                <input 
                  type="text" 
                  className="form-control" 
                  value={ formState2.nom_est }
                  disabled
                />
            </div>
            <div className="col-md-6">
                <label htmlFor="doc_est" className="form-label">Documento de Identificación</label>
                <input 
                  type="text" 
                  className="form-control"
                  id="doc_est"
                  name="doc_est"
                  value={ formState2.doc_est }
                  disabled
                />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">Edad</label>
                <input 
                  type="text" 
                  className="form-control"
                  id="edad_est"
                  name="edad_est"
                  value={ formState2.edad_est }
                  disabled
                />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputPassword4" className="form-label">Grado</label>
                <input 
                  type="text" 
                  className={`form-control ${ classes.grd_est }`}
                  id="grd_est"
                  name="grd_est"
                  value={ formState2.grd_est }
                  onChange={ (event) => onInputChange(event, "formState2") }
                />
            </div>
          </div>
        </div>
        <div className="col-10 p-4 contenedor-form mb-3" style={{ backgroundColor: '#F3F3F3', borderRadius: '10px' }}>
          <span>1) Características del Estudiante</span><hr />
          <div className="row">
            <div className="col">
              <textarea 
                className={`form-control ${ classes.desc_1_est }`}
                id="desc_1_est"
                rows="5"
                placeholder="Descripción general del estudiante con énfasis en gustos e intereses o aspectos que le desagradan, expectativas del estudiante y la familia."
                name="desc_1_est"
                value={ formState2.desc_1_est }
                onChange={ (event) => onInputChange(event, "formState2") }
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <textarea 
                className={`form-control ${ classes.desc_2_est }`}
                id="desc_2_est"
                rows="5"
                placeholder="Descripción en términos de lo que hace, puede hacer o requiere apoyo el estudiante para favorecer su proceso educativo. Indique las habilidades, competencias, cualidades, aprendizajes con las que cuenta el estudiante para el grado en el que fue matriculado. "
                name="desc_2_est"
                value={ formState2.desc_2_est }
                onChange={ (event) => onInputChange(event, "formState2") }
              ></textarea>
            </div>
          </div>
        </div>
        <div className="col-10 p-4 contenedor-form mb-3 d-flex justify-content-center flex-column" style={{ backgroundColor: '#F3F3F3', borderRadius: '10px' }}>         
          <div className="row">
            <span><b>Periodo académico</b></span>
          </div>
          <div className="row text-center">
            <div className="col-md-6 d-flex justify-content-center">
              <div className="form-check" style={{ fontSize: '25px'}}>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="flexRadioDefault" 
                  id="flexRadioDefault1"
                  value={'Trimestral'}
                  onChange={ onInputRadioChange }
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1" style={{ fontSize: '20px'}}>
                  Trimestral
                </label>
              </div>
            </div>
            <div className="col-md-6 d-flex justify-content-center">
              <div className="form-check" style={{ fontSize: '25px'}}>
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="flexRadioDefault" 
                  id="flexRadioDefault2"
                  value={'Bimestral'}
                  onChange={ onInputRadioChange }
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2" style={{ fontSize: '20px'}}>
                  Bimestral
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col ps-4">
              <div className="mx-auto d-flex" style={{ width: '25%' }}>
                <div style={{width: '100%'}}>
                  <button 
                    style={{width: '80%'}} 
                    className="btn btn-secondary"
                    onClick={ onBtnBack }
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
