import { useForm } from "../../hooks";

export const Piar1_2 = ({ inputClasses }) => {

  const { 
    formState1,
    onInputChange,
    onArrayInputChange,
    onNewInputChange
  } = useForm();

  const handlePushInput = ( prop, key_1, key_2, val, formName ) => {
    onNewInputChange( true, prop, key_1, key_2, val, formName );
  }

  const handleSubInput = (prop, formName) => {
    onNewInputChange(false, prop, null, null, null, formName );
  }

  return (
    <div className="col-10 p-4 contenedor-form mb-3" style={{ backgroundColor: '#F3F3F3', borderRadius: '10px' }}>
      <span>2): Entorno salud</span><hr />
      <div className="row">
        <div className="col-md-6">
          <label className="form-label">Afiliación al sistema de salud</label>
          <div>
              <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input"
                    type="radio"
                    name="afili_salud"
                    id="SiAfSal"
                    value={ true }
                    checked={ formState1.afili_salud }
                    onChange={ (event) => onInputChange(event, "formState1") }
                  />
                  <label className="form-check-label" htmlFor="SiAfSal">Si</label>
              </div>
              <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio"
                    name="afili_salud"
                    id="NoAfSal"
                    value={ false }
                    checked={ !formState1.afili_salud }
                    onChange={ (event) => onInputChange(event, "formState1") }
                  />
                  <label className="form-check-label" htmlFor="NoAfSal">No</label>
              </div>
          </div> 
        </div>
        {
          formState1.afili_salud &&
          (
            <div className="col-md-6">
              <div className="col-md-10">
                <label className="form-label" htmlFor="EPS">EPS</label>
                <input 
                  type="text" 
                  className="form-control"
                  name="eps"
                  id="EPS"
                  value={ formState1.eps }
                  onChange={ (event) => onInputChange(event, "formState1") }
                />
              </div>
              <div>
                  <div className="form-check form-check-inline">
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="contr_subsi" 
                        id="contr"
                        value="contributivo"
                        checked={ formState1.contr_subsi === "contributivo" }
                        onChange={ (event) => onInputChange(event, "formState1") }
                      />
                      <label className="form-check-label" htmlFor="contr">Contributivo</label>
                  </div>
                  <div className="form-check form-check-inline">
                      <input 
                        className="form-check-input" 
                        type="radio" 
                        name="contr_subsi" 
                        id="subsi"
                        value="subsidiado"
                        checked={ formState1.contr_subsi === "subsidiado" }
                        onChange={ (event) => onInputChange(event, "formState1") }
                      />
                      <label className="form-check-label" htmlFor="subsi">Subsidiado</label>
                  </div>
              </div> 
            </div>
          )
        }
      </div>
      <div className="row">
        <div className="col-md-5">
          <label htmlFor="lug_emer" className="form-label">Lugar donde le atienden en caso de emergencia</label>
          <input 
            type="text" 
            className={`form-control ${ inputClasses.lug_emer }`}
            name="lug_emer"
            id="lug_emer"
            value={ formState1.lug_emer }
            onChange={ (event) => onInputChange(event, "formState1") }
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <label className="form-label">¿El niño está siendo atendido por el sector salud?</label>
          <div>
              <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="aten_salud"
                    id="siAten"
                    value={ true }
                    checked={ formState1.aten_salud }
                    onChange={ (event) => onInputChange(event, "formState1") }
                  />
                  <label className="form-check-label" htmlFor="siAten">Si</label>
              </div>
              <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="aten_salud"
                    id="noAten"
                    value={ false }
                    checked={ !formState1.aten_salud }
                    onChange={ (event) => onInputChange(event, "formState1") }
                  />
                  <label className="form-check-label" htmlFor="noAten">No</label>
              </div>
          </div> 
        </div>
        {
          formState1.aten_salud &&
          (
            <div className="col-md-5">
              <label htmlFor="frec_aten_salud" className="form-label">Frecuencia</label>
              <select 
                className="form-select"
                aria-label="Default select example"
                name="frec_aten_salud"
                id="frec_aten_salud"
                value={ formState1.frec_aten_salud }
                onChange={ (event) => onInputChange(event, "formState1") }
              >
                <option value="N/A">Frecuencia</option>
                <option value="Semanal">Semanal</option>
                <option value="Mensual">Mensual</option>
                <option value="Semestral">Semestral</option>
                <option value="Anual">Anual</option>
              </select>
          </div>
          )
        }
        
      </div>
      <div className="row">
        <div className="col-md-6">
          <label className="form-label">Tiene diagnóstico médico</label>
          <div>
            <div className="form-check form-check-inline">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="diag_med"
                  id="siDiag"
                  value={ true }
                  checked={ formState1.diag_med }
                  onChange={ (event) => onInputChange(event, "formState1") }
                />
                <label className="form-check-label" htmlFor="siDiag">Si</label>
            </div>
            <div className="form-check form-check-inline">
                <input 
                  className="form-check-input" 
                  type="radio" 
                  name="diag_med"
                  id="noDiag"
                  value={ false }
                  checked={ !formState1.diag_med }
                  onChange={ (event) => onInputChange(event, "formState1") }
                />
                <label className="form-check-label" htmlFor="noDiag">No</label>
            </div>
          </div> 
        </div>
        {
          formState1.diag_med &&
          (
            <div className="col-md-5">
              <label htmlFor="cual_diag_med" className="form-label"> ¿Cuál?</label>
              <input 
                type="text" 
                className="form-control"
                id="cual_diag_med"
                name="cual_diag_med"
                value={ formState1.cual_diag_med }
                onChange={ (event) => onInputChange(event, "formState1") }
              />
            </div>
          )
        }
        
      </div>
      <div className="row">
        <div className="col-md-6">
          <label className="form-label">¿El niño está asistiendo a terapias?</label>
          <div>
              <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="ter_med" 
                    value={ true }
                    id="siTer"
                    checked={ formState1.ter_med }
                    onChange={ (event) => onInputChange(event, "formState1") }
                  />
                  <label className="form-check-label" htmlFor="siTer">Si</label>
              </div>
              <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="ter_med" 
                    value={ false }
                    id="noTer"
                    checked={ !formState1.ter_med }
                    onChange={ (event) => onInputChange(event, "formState1") }
                  />
                  <label className="form-check-label" htmlFor="noTer">No</label>
              </div>
          </div> 
        </div>
        {
          formState1.ter_med && (
            <div className="col-md-6">
              {formState1.cual_ter_med.map((cual_ter, index) => (
                <div className="row" key={`frec${index}`}>
                  <div className="col-6 col-md-5">
                    <label htmlFor={`cual_cual_ter_med${index}`} className="form-label"> ¿Cuál?</label>
                    <input 
                      type="text" 
                      className="form-control"
                      id={`cual_cual_ter_med${index}`}
                      name={ `cual_ter_med[${index}].cual` }
                      value={ cual_ter.cual }
                      onChange={ (event) => onArrayInputChange(event, "formState1") }
                    />
                  </div>
                  <div className="col-6 col-md-5">
                    <label htmlFor={`frec_cual_ter_med${index}`} className="form-label">Frecuencia</label>
                    <select 
                      className="form-select" 
                      aria-label="Default select example"
                      id={`frec_cual_ter_med${index}`}
                      name={`cual_ter_med[${index}].frec`}
                      value={ cual_ter.frec }
                      onChange={ (event) => onArrayInputChange(event, "formState1") }
                    >
                      <option value="N/A">Frecuencia</option>
                      <option value="Semanal">Semanal</option>
                      <option value="Mensual">Mensual</option>
                      <option value="Semestral">Semestral</option>
                      <option value="Anual">Anual</option>
                    </select>
                  </div>
                  {
                    formState1.cual_ter_med.length > 1 && ( <hr className="mt-2"/> )
                  }
                </div>
              ))}
              <div className={`row text-center justify-content-center pe-md-5 pe-0  ${ formState1.cual_ter_med.length === 1 ? 'mt-2' : '' }`}>
                <div className="col-3">
                  <button
                    type="button"
                    className={`btn bg-success`}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ffff'
                    }}
                    onClick={ () => handlePushInput('cual_ter_med', "cual", "frec", "N/A", 'formState1') }
                  ><i className="fa-solid fa-plus"></i></button>
                </div>
                {
                  formState1.cual_ter_med.length > 1 && (
                    <div className="col-3">
                      <button
                        type="button"
                        className="btn bg-danger"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ffff'
                        }}
                        onClick={ () => handleSubInput('cual_ter_med', 'formState1') }
                      ><i className="fa-solid fa-minus"></i></button>
                    </div>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
      <div className="row">
        <div className="col-md-6">
          <label className="form-label">¿Actualmente recibe tratamiento médico por alguna enfermedad en particular?</label>
          <div>
              <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="trat_med" 
                    value={ true }
                    id="siMed"
                    checked={ formState1.trat_med }
                    onChange={ (event) => onInputChange(event, "formState1") }
                  />
                  <label className="form-check-label" htmlFor="siMed">Si</label>
              </div>
              <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="trat_med"
                    value={ false }
                    id="noMed"
                    checked={ !formState1.trat_med }
                    onChange={ (event) => onInputChange(event, "formState1") }
                  />
                  <label className="form-check-label" htmlFor="noMed">No</label>
              </div>
          </div> 
        </div>
        {
          formState1.trat_med && (
            <div className="col-md-5">
              <label htmlFor="cual_trat_med" className="form-label"> ¿Cuál?</label>
              <input 
                type="text" 
                className="form-control"
                placeholder="Ejemplo: para controlar epilepsia, uso de oxígeno, insulina, etc.)"
                id="cual_trat_med"
                name="cual_trat_med"
                value={ formState1.cual_trat_med }
                onChange={ (event) => onInputChange(event, "formState1") }
              />
            </div>
          )
        }
      </div>
      <div className="row">
        <div className="col-md-6">
          <label className="form-label">¿Consume medicamentos?</label>
          <div>
              <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="cons_meds" 
                    value={ true }
                    id="siCons"
                    checked={ formState1.cons_meds }
                    onChange={ (event) => onInputChange(event, "formState1") }
                  />
                  <label className="form-check-label" htmlFor="siCons">Si</label>
              </div>
              <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="cons_meds" 
                    value={ false }
                    id="noCons"
                    checked={ !formState1.cons_meds }
                    onChange={ (event) => onInputChange(event, "formState1") }
                  />
                  <label className="form-check-label" htmlFor="noCons">No</label>
              </div>
          </div> 
        </div>
        {
          formState1.cons_meds && (
            <div className="col-md-6">
              {formState1.meds_frecuencia.map((med_fre, index) => (
                <div className="row" key={`med${index}`}>
                  <div className="col-6 col-md-5">
                    <label htmlFor={`cual_cual_med${index}`} className="form-label"> ¿Cuál?</label>
                    <input 
                      type="text" 
                      className="form-control"
                      id={`cual_cual_med${index}`}
                      name={ `meds_frecuencia[${index}].cual` }
                      value={ med_fre.cual }
                      onChange={ (event) => onArrayInputChange(event, "formState1") }
                    />
                  </div>
                  <div className="col-6 col-md-5">
                    <label htmlFor={`cual_med_frec${index}`} className="form-label">Horario</label>
                    <select 
                      className="form-select" 
                      aria-label="Default select example"
                      id={`cual_med_frec${index}`}
                      name={`meds_frecuencia[${index}].hor`}
                      value={ med_fre.hor }
                      onChange={ (event) => onArrayInputChange(event, "formState1") }
                    >
                      <option value="N/A">Horario</option>
                      <option value="1vd">1 vez al dia</option>
                      <option value="2vd">2 veces al dia</option>
                      <option value="3vd">3 veces al dia</option>
                      <option value="4vd">4 veces al dia</option>
                    </select>
                  </div>
                  {
                    formState1.meds_frecuencia.length > 1 && ( <hr className="mt-2"/> )
                  }
                </div>
              ))}
              <div 
                className={`row text-center justify-content-center pe-md-5 pe-0  ${ formState1.meds_frecuencia.length === 1 ? 'mt-2' : '' }`}>
                <div className="col-3">
                  <button
                    type="button"
                    className={`btn bg-success`}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ffff'
                    }}
                    onClick={ () => handlePushInput('meds_frecuencia', "cual", "hor", "N/A", 'formState1') }
                  ><i className="fa-solid fa-plus"></i></button>
                </div>
                {
                  formState1.meds_frecuencia.length > 1 && (
                    <div className="col-3">
                      <button
                        type="button"
                        className="btn bg-danger"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#ffff'
                        }}
                        onClick={ () => handleSubInput('meds_frecuencia', 'formState1') }
                      ><i className="fa-solid fa-minus"></i></button>
                    </div>
                  )
                }
              </div>
            </div>
          )
        }
      </div>
      <div className="row">
        <div className="col-md-6">
          <label className="form-label">¿Cuenta con productos de apoyo para favorecer su movilidad, comunicación e independencia?</label>
          <div>
              <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="prods_mov"
                    id="siProds"
                    value={ true }
                    checked={ formState1.prods_mov }
                    onChange={ (event) => onInputChange(event, "formState1") }
                  />
                  <label className="form-check-label" htmlFor="siProds">Si</label>
              </div>
              <div className="form-check form-check-inline">
                  <input 
                    className="form-check-input" 
                    type="radio" 
                    name="prods_mov"
                    id="noProds"
                    value={ false }
                    checked={ !formState1.prods_mov }
                    onChange={ (event) => onInputChange(event, "formState1") }
                  />
                  <label className="form-check-label" htmlFor="noProds">No</label>
              </div>
          </div> 
        </div>
        {
          formState1.prods_mov &&
          (
            <div className="col-md-5">
              <label htmlFor="cual_prods_mov" className="form-label">¿Cuáles?</label>
              <input 
                type="text" 
                className="form-control"
                name="cual_prods_mov"
                id="cual_prods_mov"
                value={ formState1.cual_prods_mov }
                onChange={ (event) => onInputChange(event, "formState1") }
              />
            </div>
          )
        }
      </div>
    </div>
  )
}
