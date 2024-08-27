import { useEffect, useState } from "react";
import { usePiarStore, useUiStore } from "../../hooks";
import { PiarFirmas } from "./PiarFirmas";

export const Piar4 = () => {

  const { parteActual, setParteActual } = useUiStore();
  const { startSavingPiar, piarPt3Active, startLoadingPiarPt4ById } = usePiarStore();

  const [formValues, setFormValues ] = useState({
    id: '',
    acc_fam: '',
    estr_fam: '',
    acc_doc: '',
    estr_doc: '',
    acc_dir: '',
    estr_dir: '',
    acc_adm: '',
    estr_adm: '',
    acc_par: '',
    estr_par: '',
  });

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  };

  const onBtnBack = () => {
    setParteActual( parteActual - 1 );
  }

  const onSubmit = async( event ) => {
    event.preventDefault();
    await startSavingPiar( formValues )
    await startLoadingPiarPt4ById( formValues.id );
    setParteActual( parteActual + 1 );
  }

  useEffect(() => {
    if( piarPt3Active !== null ){
      setFormValues({ ...piarPt3Active });
    }
  }, [ piarPt3Active ])
  

  return (
    <div className="container-fluid">
      <div className="row text-center">
          <div style={{width:'80%', margin: 'auto'}}>
              <img src="./Min.PNG" alt="" style={{maxWidth: '100%', height: 'auto'}}/>
          </div>
      </div>
      <div className="row text-center">
          <div className="mt-3" style={{width: '80%', margin: 'auto'}}>
              <div style={{height: '25px'}} className="progress" role="progressbar" aria-label="Success example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                  <div className="progress-bar bg-success" style={{width: '75%'}}>75%  Recomendaciones</div>
              </div>
          </div>
      </div>
      <form onSubmit={ onSubmit }>
        <div className="mt-4 mb-2 px-3">
          <b>7). RECOMENDACIONES PARA EL PLAN DE MEJORAMIENTO INSTITUCIONAL PARA LA ELIMINACIÓN DE BARRERAS Y LA CREACIÓN DE PROCESOS PARA LA PARTICIPACIÓN, EL APRENDIZAJE Y EL PROGRESO DE LOS ESTUDIANTES:</b>
        </div>
        <div className="container text-center" style={{ border: "1px solid #6e6e6e" }}>
          <div className="row">
            <div className="col col-border"> ACTORES </div>
            <div className="col col-border"> ACCIONES </div>
            <div className="col col-border"> ESTRATEGIAS A IMPLEMENTAR </div>
          </div>
          <div className="row">
            <div className="col col-border"> FAMILIA, CUIDADORES O CON QUIENES VIVE </div>
            <div className="col col-border py-2">
              <textarea 
                className="form-control" 
                name="acc_fam"
                value={ formValues.acc_fam }
                onChange={ onInputChanged }
                rows="3"
              ></textarea>
            </div>
            <div className="col col-border py-2">
              <textarea 
                className="form-control" 
                name="estr_fam"
                value={ formValues.estr_fam }
                onChange={ onInputChanged }
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col col-border"> DOCENTES </div>
            <div className="col col-border py-2">
              <textarea 
                className="form-control" 
                name="acc_doc" 
                rows="3"
                value={ formValues.acc_doc }
                onChange={ onInputChanged }
              ></textarea>
            </div>
            <div className="col col-border py-2">
            <textarea 
              className="form-control" 
              name="estr_doc" 
              rows="3"
              value={ formValues.estr_doc }
              onChange={ onInputChanged }
            ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col col-border"> DIRECTIVOS </div>
            <div className="col col-border py-2">
              <textarea 
                className="form-control" 
                name="acc_dir" 
                rows="3"
                value={ formValues.acc_dir }
                onChange={ onInputChanged }
              ></textarea>
            </div>
            <div className="col col-border py-2">
              <textarea 
                className="form-control" 
                name="estr_dir" 
                rows="3"
                value={ formValues.estr_dir }
                onChange={ onInputChanged }
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col col-border"> ADMINISTRATIVOS </div>
            <div className="col col-border py-2">
              <textarea 
                className="form-control" 
                name="acc_adm" 
                rows="3"
                value={ formValues.acc_adm }
                onChange={ onInputChanged }
              ></textarea>
            </div>
            <div className="col col-border py-2">
              <textarea 
                className="form-control" 
                name="estr_adm" 
                rows="3"
                value={ formValues.estr_adm }
                onChange={ onInputChanged }
              ></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col col-border"> PARES (Sus compañeros) </div>
            <div className="col col-border py-2">
              <textarea 
                className="form-control" 
                name="acc_par" 
                rows="3"
                value={ formValues.acc_par }
                onChange={ onInputChanged }
              ></textarea>
            </div>
            <div className="col col-border py-2">
              <textarea 
                className="form-control" 
                name="estr_par" 
                rows="3"
                value={ formValues.estr_par }
                onChange={ onInputChanged }
              ></textarea>
            </div>
          </div>
        </div>
        <div className="container mt-3">
          <b>Firma y cargo de quienes realizan el proceso de valoración: Docentes, coordinadores, docente de apoyo u otro profesional etc. </b>
          <p className="mt-3" style={{ color: "#bdbdbd" }}>Si existen varios docentes a cargo en un mismo curso, es importante que cada uno aporte una valoración 
          del desempeño del estudiante en su respectiva área y los ajustes planteados</p>
        </div>
        <div className="outer">
          <PiarFirmas/>
        </div>
        <div className="container mt-3">
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
