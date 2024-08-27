import { useEffect } from "react";
import { useForm, usePiarStore, useUiStore } from "../../hooks";
import { PiarTrimestral, PiarBimestral } from "./";
import './Piar3.css'
import Swal from "sweetalert2";

export const Piar3 = ({ periodoAcademico }) => {

  const { parteActual, setParteActual } = useUiStore();
  const { matsPiarState } = useForm();
  const { startLoadingMateriasPiar, isLoadingMateriasPiar, startLoadingPiarPt3ById } = usePiarStore();

  const onBtnBack = () => {
    setParteActual( parteActual - 1 );
  }

  const onSubmit = async( event ) => {
    event.preventDefault();
    await startLoadingPiarPt3ById( matsPiarState.id );
    setParteActual( parteActual + 1 );
  }

  useEffect(() => {
    startLoadingMateriasPiar();
  }, [])
  
  useEffect(() => {
    if ( isLoadingMateriasPiar ) {
      Swal.fire({ title: 'Cargando materias...', text: 'Por favor, espere.', allowOutsideClick: false,
        didOpen: () => { Swal.showLoading(); }
      });
    } else {
      Swal.close();
    }
  }, [isLoadingMateriasPiar]);
  

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
                <div className="progress-bar bg-success" style={{width: '75%'}}>75%  Ajustes Razonables</div>
            </div>
        </div>
      </div>
      <div className="row my-3">
        <span><b>2. Ajustes Razonables</b></span>
      </div>
      <div className="pb-3">
        { 
          periodoAcademico === 'Trimestral' &&
            <PiarTrimestral/> 
        }
        { 
          periodoAcademico === 'Bimestral' &&
            <PiarBimestral/> 
        }
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
                    type="button"
                    onClick={ onSubmit }
                >Siguiente</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
