import { useEffect } from "react";
import { useForm } from "../../hooks"

export const Piar1_4 = ({ inputClasses }) => {

    const {
        formState1,
        onInputChange,
        onEffectChange
    } = useForm();

    useEffect(() => {
        if (formState1.vinc_otr_inst === "Si") {
            onEffectChange('no_inst', '', 'formState1')
        } else {
            onEffectChange('cual_inst', '', 'formState1')
        }
    }, [formState1.vinc_otr_inst]);
    

  return (
    <div className="col-10 p-4 contenedor-form mb-3" style={{ backgroundColor: '#F3F3F3', borderRadius: '10px' }}>
        <span>4): Entorno Educativo:</span><hr />
        <span><b>Información de la Trayectoria Educativa</b></span><hr />
        <div className="row">
            <div className="col-md-8">
                <label className="form-label">¿Ha estado vinculado en otra institución educativa, fundación o modalidad de educación inicial?</label>
                <div>
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            id="SiVincIns"
                            name="vinc_otr_inst" 
                            value={ true }
                            checked={ formState1.vinc_otr_inst }
                            onChange={ (event) => onInputChange(event, "formState1") }
                        />
                        <label className="form-check-label" htmlFor="SiVincIns">Si</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            id="NoVincIns"  
                            name="vinc_otr_inst"
                            value={ false }
                            checked={ !formState1.vinc_otr_inst }
                            onChange={ (event) => onInputChange(event, "formState1") }
                        />
                        <label className="form-check-label" htmlFor="NoVincIns">No</label>
                    </div>
                </div>
            </div>
            { formState1.vinc_otr_inst ? (
                <div className="col-md-4">
                    <label htmlFor="cual_inst" className="form-label">¿Cuáles?</label>
                    <input 
                        type="text" 
                        className="form-control"
                        id="cual_inst"
                        name="cual_inst"
                        value={ formState1.cual_inst }
                        onChange={ (event) => onInputChange(event, "formState1") }
                    />
                </div>
            ):(
                <div className="col-md-4">
                    <label htmlFor="no_inst" className="form-label">¿Por qué?</label>
                    <input 
                        type="text" 
                        className="form-control"
                        id="no_inst"
                        name="no_inst"
                        value={ formState1.no_inst }              
                        onChange={ (event) => onInputChange(event, "formState1") }
                    /> 
                </div>          
            )} 
        </div>
        <div className="row p-2" style={{ border: '1px solid #bdbdbd', borderRadius: '15px' }}>
            <div className="col-md-4">
                <label htmlFor="ult_grad" className="form-label">Ultimo grado cursado </label>
                <select
                    className="form-select"
                    name="ult_grad"
                    id="ult_grad"
                    value={ formState1.ult_grad }
                    onChange={ (event) => onInputChange(event, "formState1") }
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
            <div className="col-md-4">
                <label className="form-label">¿Aprobó?</label>
                <div>
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="aprov_ult_grad" 
                            id="SiAprovGrad"
                            value={ true }
                            checked={ formState1.aprov_ult_grad }
                            onChange={ (event) => onInputChange(event, "formState1") }
                        />
                        <label className="form-check-label" htmlFor="SiAprovGrad">Si</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="aprov_ult_grad"
                            id="NoAprovGrad"
                            value={ false }
                            checked={ !formState1.aprov_ult_grad }
                            onChange={ (event) => onInputChange(event, "formState1") }
                        />
                        <label className="form-check-label" htmlFor="NoAprovGrad">No</label>
                    </div>
                </div>
            </div>
            <div className="col-md-4">
                <label htmlFor="obs_ult_grd" className="form-label">Observaciones:</label>
                <textarea 
                    className={`form-control ${ inputClasses.obs_ult_grd }`}
                    id="obs_ult_grd" 
                    placeholder="(incluir motivos del cambio de la modalidad o de la institución educativa)"
                    rows="3"
                    name="obs_ult_grd"
                    value={formState1.obs_ult_grd}
                    onChange={ (event) => onInputChange(event, "formState1") }  
                ></textarea>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <label className="form-label">¿Se recibe informe pedagógico cualitativo que describa el proceso de desarrollo y aprendizaje del estudiante y/o PIAR?</label>
                <div>
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            id="SiInfPed"
                            name="infm_ped"
                            value={ true }
                            checked={ formState1.infm_ped }
                            onChange={ (event) => onInputChange(event, "formState1") }
                        />
                        <label className="form-check-label" htmlFor="SiInfPed">Si</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            id="NoInfPed"
                            name="infm_ped"
                            value={ false }
                            checked={ !formState1.infm_ped }
                            onChange={ (event) => onInputChange(event, "formState1") }
                        />
                        <label className="form-check-label" htmlFor="NoInfPed">No</label>
                    </div>
                </div>
            </div>
            {
                formState1.infm_ped && (
                    <div className="col-md-6">
                        <label htmlFor="inst_infm" className="form-label">¿De qué institución o modalidad proviene el informe?</label>
                        <input 
                            type="text" 
                            className="form-control"
                            id="inst_infm"
                            name="inst_infm"
                            value={ formState1.inst_infm }
                            onChange={ (event) => onInputChange(event, "formState1") }
                        />
                    </div>
                )      
            }  
        </div>
        <div className="row">
            <div className="col-md-6">
                <label className="form-label">¿Está asistiendo en la actualidad a programas complementarios?</label>
                <div>
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="prog_comp" 
                            id="SiProgComp"
                            value={ true }
                            checked={ formState1.prog_comp }
                            onChange={ (event) => onInputChange(event, "formState1") }
                        />
                        <label className="form-check-label" htmlFor="SiProgComp">Si</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="prog_comp" 
                            id="NoProgCom"
                            value={ false }
                            checked={ !formState1.prog_comp }
                            onChange={ (event) => onInputChange(event, "formState1") }
                        />
                        <label className="form-check-label" htmlFor="NoProgCom">No</label>
                    </div>
                </div>
            </div>
            { formState1.prog_comp && (
                <div className="col-md-6">
                    <label htmlFor="tipo_prog_comp" className="form-label">¿Cuáles?</label>
                    <input 
                        type="text" 
                        className="form-control"
                        placeholder="(Ejemplo: Deportes, danzas, música, pintura, recreación, otros cursos)  "
                        id="tipo_prog_comp"
                        name="tipo_prog_comp"
                        value={ formState1.tipo_prog_comp }
                        onChange={ (event) => onInputChange(event, "formState1") }
                    />
                </div>
            )}
        </div>
        <span><b>Información de la institución educativa en la que se matricula</b></span><hr />
        <div className="row">
            <div className="col-md-6">
                <label htmlFor="nom_inst" className="form-label">Nombre de la Institución educativa a la que se matricula:</label>
                <input 
                    type="text" 
                    className={`form-control ${ inputClasses.nom_inst }`}
                    id="nom_inst"
                    name="nom_inst"
                    value={ formState1.nom_inst }
                    onChange={ (event) => onInputChange(event, "formState1") }
                />
            </div>
            <div className="col-md-6">
                <label htmlFor="sed_inst" className="form-label">Sede</label>
                <input 
                    type="text" 
                    className={`form-control ${ inputClasses.sed_inst }`}
                    id="sed_inst"
                    name="sed_inst"
                    value={ formState1.sed_inst }
                    onChange={ (event) => onInputChange(event, "formState1") }
                />
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <label htmlFor="trans_inst" className="form-label">Medio que usará el estudiante para transportarse a la institución educativa</label>
                <input 
                    type="text" 
                    className={`form-control ${ inputClasses.trans_inst }`}
                    id="trans_inst"
                    name="trans_inst"
                    value={ formState1.trans_inst }
                    onChange={ (event) => onInputChange(event, "formState1") }
                />
            </div>
            <div className="col-md-6">
                <label htmlFor="dist_inst" className="form-label">Distancia entre la institución educativa o sede y el hogar del estudiante (Tiempo)</label>
                <input 
                    type="text" 
                    className={`form-control ${ inputClasses.dist_inst }`}
                    id="dist_inst"
                    name="dist_inst"
                    value={ formState1.dist_inst }
                    onChange={ (event) => onInputChange(event, "formState1") }
                />
            </div>
        </div>
    </div>
  )
}
