import ReactDatePicker from "react-datepicker";
import { usePiarStore, useUiStore } from "../../hooks";
import { useEffect, useState } from "react";
import { parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

export const Piar5 = () => {

  const navigate = useNavigate();
  const { parteActual, setParteActual } = useUiStore();
  const { startSavingPiar, piarPt4Active } = usePiarStore();

  const [formValues, setFormValues] = useState({
    fec_dil_a3: new Date().toISOString(),
    inst_edu_a3: '',
    doc_dir: [{ nom: '' }],
    nom_fam: [{ nom: '', par: '' }],
    acts_apo: [
      {
        nom_act: '',
        desc_act: '',
        frec_act: ''
      }
    ],
    compromisos: ''
  });

  const onInputChanged = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value
    })
  };

  const onDateInputChanged = ( event, nameDateInput ) => {
    setFormValues({
      ...formValues,
      [nameDateInput] : event.toISOString()
    })
  };

  const onArrayInputChange = ( event, index, inp, key ) => {
    const { value } = event.target;

    const updatedInp = formValues[inp].map((item, i) => {
          if (i === index) {
              return { ...item, [key]: value };
          }
          return item;
      });

    setFormValues({
      ...formValues,
      [inp]: updatedInp
    })
  }

  const handlePushInput = ( inp ) => {
    if( inp === 'doc_dir' ){
      setFormValues({
        ...formValues,
        doc_dir: [
          ...formValues.doc_dir,
          { nom: '' }
        ]
      });
    }
    if ( inp === 'acts_apo'){
      setFormValues({
        ...formValues,
        acts_apo: [
          ...formValues.acts_apo,
          {
            nom_act: '',
            desc_act: '',
            frec_act: ''
          }
        ]
      })
    }
  }

  const handleSubInput = ( inp ) => {
    setFormValues({
        ...formValues,
        [inp]: formValues[inp].slice(0, -1)
    });
  }

  const onBtnBack = () => {
    setParteActual( parteActual - 1 );
  }

  const onSubmit = async( event ) => {
    event.preventDefault();
    const payload = {
      ...formValues,
      id: 'b2d0516a-3308-4f43-bc50-d2efaf712276',
      acts_apo: JSON.stringify(formValues.acts_apo),
      doc_dir: JSON.stringify(formValues.doc_dir),
      nom_fam: JSON.stringify(formValues.nom_fam)
    }
    await startSavingPiar(payload);
    setParteActual(1);
    navigate('/form')
  }

  useEffect(() => {
    if( piarPt4Active !== null )
    {
      setFormValues(
        {
          ...piarPt4Active,
          doc_dir: JSON.parse(piarPt4Active.doc_dir),
          nom_fam: JSON.parse(piarPt4Active.nom_fam),
          acts_apo: JSON.parse(piarPt4Active.acts_apo)
        });
    }
  }, [ piarPt4Active ])
  

  return (
    <div className="container-fluid">
      <div className="row text-center">
          <div style={{width:'80%', margin: 'auto'}}>
              <img src="./Min.PNG" alt="" style={{maxWidth: '100%', height: 'auto'}}/>
          </div>
      </div>
      <div className="row text-center">
            <h4>
                ACTA DE ACUERDO
        </h4>
            <h4>Plan Individual de Ajustes Razonables - PIAR -</h4>
            <h4>
                ANEXO 3
            </h4>
      </div>
      <div className="row text-center">
          <div className="mt-3" style={{width: '80%', margin: 'auto'}}>
              <div style={{height: '25px'}} className="progress" role="progressbar" aria-label="Success example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                  <div className="progress-bar bg-success" style={{width: '80%'}}>80%  Acta de acuerdo</div>
              </div>
          </div>
      </div>
      <form className="row g-2 justify-content-center mt-3" onSubmit={ onSubmit }>
        <div className="col-10 p-4 contenedor-form mb-3" style={{ backgroundColor: '#F3F3F3', borderRadius: '10px' }}>
          <div className="row">
            <div className="col-md-6">
              <label htmlFor="fec_dig_a3" className="form-label">Fecha y lugar de diligenciamiento</label>
              <div className="input-group">
                  <ReactDatePicker 
                      selected={ parseISO(formValues.fec_dil_a3) } 
                      className="form-control input-date"
                      name="fec_dig_a3"
                      onChange={ (event) => onDateInputChanged( event, 'fec_dil_a3' ) }
                      locale="es"
                      id="fec_dig_a3"
                  />
                  <div className="ico-input" style={{ color: '#00000' }}>
                      <i className="fa-solid fa-calendar-days"></i>
                  </div>
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="inst_edu_a2" className="form-label">Institución educativa y sede</label>
              <input 
                type="text" 
                className={`form-control ${ /*classes.inst_edu_a2*/'' }`}
                id="inst_edu_a3"
                name="inst_edu_a3"
                value={ formValues.inst_edu_a3 }
                onChange={ (event) => onInputChanged( event ) }
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="jor_a2" className="form-label">Nombre del estudiante</label>
              <input 
                type="text" 
                className={`form-control`}
                id="jor_a2"
                name="jor_a2"
                //value={formState2.jor_a2}
                disabled
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="jor_a2" className="form-label">Documento de Identificación</label>
              <input 
                type="text" 
                className={`form-control`}
                id="jor_a2"
                name="jor_a2"
                //value={formState2.jor_a2}
                disabled
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="jor_a2" className="form-label">Edad</label>
              <input 
                type="text" 
                className={`form-control`}
                id="jor_a2"
                name="jor_a2"
                //value={formState2.jor_a2}
                disabled
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="jor_a2" className="form-label">Grado</label>
              <input 
                type="text" 
                className={`form-control`}
                id="jor_a2"
                name="jor_a2"
                //value={formState2.jor_a2}
                disabled
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Nombres equipo directivos y de docentes</label>
              { formValues.doc_dir.map((doc, index) => (
                <input 
                  key={`doc${index}`}
                  type="text" 
                  className={`form-control mb-2 ${ /*classes.docs_ela*/'' }`}
                  id={ `doc_nombres${index}` }
                  name={ `doc_dir[${index}].nom` }
                  value={ doc.nom }
                  onChange={ ( event ) => onArrayInputChange( event, index, 'doc_dir', 'nom' ) }
                />
              ))}
              <div className={`row text-center justify-content-center pe-md-5 pe-0  ${ /*formState2.docs_ela.length === 1 ? 'mt-2' : ''*/ '' }`}>
                <div className="col-3">
                  <button
                    type="button"
                    className={`btn bg-success`}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ffff'
                    }}
                    onClick={ () => handlePushInput('doc_dir') }
                  ><i className="fa-solid fa-plus"></i></button>
                </div>
                {
                  formValues.doc_dir.length > 1 && (
                    <div className="col-3">
                      <button
                        type="button"
                        className="btn bg-danger"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ffff'
                        }}
                        onClick={ () => handleSubInput('doc_dir') }
                      ><i className="fa-solid fa-minus"></i></button>
                    </div>
                  )
                }
              </div>
            </div>
            <div className="col-md-6">
              <label className="form-label">Familia del estudiante </label>
              {
                formValues.nom_fam.map(( fam, index ) => (
                  <div className="row" key={`fam${index}`}>
                    <div className="col-6">
                      <label htmlFor="">Nombres</label>
                      <input 
                        type="text"
                        className="form-control"
                        name={`nom_fam[${index}].nom`}
                        value={ fam.nom }
                        onChange={(event) => onArrayInputChange( event, index, 'nom_fam', 'nom' ) }
                      />
                    </div>
                    <div className="col-6">
                      <label htmlFor="">Parentesco</label>
                      <input 
                        type="text"
                        className="form-control"
                        name={`nom_fam[${index}].par`}
                        value={ fam.par }
                        onChange={(event) => onArrayInputChange( event, index, 'nom_fam', 'par' ) }
                      />
                    </div>
                  </div>
                ))
              }
              <div className={`row text-center justify-content-center pe-md-5 pe-0 mt-2 ${ /*formState2.docs_ela.length === 1 ? 'mt-2' : ''*/ '' }`}>
                <div className="col-3">
                  <button
                    type="button"
                    className={`btn bg-success`}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ffff'
                    }}
                    //onClick={ () => handlePushInput('doc_dir') }
                  ><i className="fa-solid fa-plus"></i></button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-10 p-4 contenedor-form mb-3" style={{ backgroundColor: '#F3F3F3', borderRadius: '10px' }}>
          <div className="container">
            <p>Según el Decreto 1421 de 2017 la educación inclusiva es un proceso permanente que              
            reconoce, valora y responde a la diversidad de características, intereses, posibilidades y            
            expectativas de los estudiantes para promover su desarrollo, aprendizaje y participación, en un             
            ambiente de aprendizaje común, sin discriminación o exclusión. <br /><br />
            
            La inclusión solo es posible cuando se unen los esfuerzos del colegio, el estudiante y la familia.                 
            De ahí la importancia de formalizar con las firmas, la presente Acta Acuerdo. <br /><br />
            
            <b>El Establecimiento Educativo</b> ha realizado la valoración y definido los ajustes razonables que             
            facilitarán al estudiante su proceso educativo. <br /><br />
            
            <b>La Familia se compromete</b> a cumplir y firmar los compromisos señalados en el PIAR y en las 
            actas de acuerdo, para fortalecer los procesos escolares del estudiante y en particular a:</p>
          </div>
          <div className="container">
            <textarea 
              className="form-control" 
              id="" 
              rows="5"
              placeholder="Incluya aquí los compromisos específicos para implementar en el aula que requieran ampliación o detalle adicional al incluido en el PIAR. "    
              name="compromisos"
              value={ formValues.compromisos }
              onChange={ (event) => onInputChanged(event) }
            ></textarea>
          </div>
        </div>
        <div className="col-10 p-4 contenedor-form mb-3" style={{ backgroundColor: '#F3F3F3', borderRadius: '10px' }}>
          <p>Y en casa apoyará con las siguientes actividades: </p>
          <div className="container text-center">
            <div className="row">
              <div className="col-3 col-border">
                <b>Nombre de la Actividad</b>
              </div>
              <div className="col-6 col-border">
                <b>Descripción de la estrategia</b>
              </div>
              <div className="col-3 col-border">
                <b>Frecuencia D Diaria, S Semanal, P Permanente</b>
              </div>
            </div>
            {
              formValues.acts_apo.map((act, index) => (
                <div className="row" key={`act[${index}]`}>
                  <div className="col-3 col-border">
                    <input 
                      type="text" 
                      className="form-control mt-2"
                      name={`acts_apo[${index}].nom_act`}
                      value={act.nom_act}
                      onChange={ (event) => onArrayInputChange( event, index, 'acts_apo', 'nom_act' ) }
                    />
                  </div>
                  <div className="col-6 col-border">
                    <textarea 
                      className="form-control my-2"
                      rows="3"
                      name={`acts_apo[${index}].desc_act`}
                      value={act.desc_act}
                      onChange={ (event) => onArrayInputChange( event, index, 'acts_apo', 'desc_act' ) }
                    ></textarea>
                  </div>
                  <div className="col-3 col-border">
                    <select 
                      className="form-select mt-2" 
                      name={`acts_apo[${index}].frec_act`}
                      value={act.frec_act}
                      onChange={ (event) => onArrayInputChange( event, index, 'acts_apo', 'frec_act' ) }
                    >
                      <option value="D">D</option>
                      <option value="S">S</option>
                      <option value="P">P</option>
                    </select>
                  </div>
                </div>
              ))
            }
            <div className="mt-3">
              <button
                type="button"
                className={`btn bg-success`}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffff'
                }}
                onClick={ () => handlePushInput('acts_apo') }
              ><i className="fa-solid fa-plus"></i></button>
              {
                formValues.acts_apo.length > 1 && (
                    <button
                      type="button"
                      className="btn bg-danger mx-2"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ffff'
                      }}
                      onClick={ () => handleSubInput('acts_apo') }
                    ><i className="fa-solid fa-minus"></i></button>
                )
              }
            </div>
          </div>
        </div>
        <div className="col-10 p-4 contenedor-form mb-3" style={{ backgroundColor: '#F3F3F3', borderRadius: '10px' }}>
          <b>Firma de los Actores comprometidos: </b>
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
