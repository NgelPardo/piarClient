import ReactDatePicker, { registerLocale } from "react-datepicker"
import es from 'date-fns/locale/es'
import { useForm, usePiarStore } from "../../hooks";
import { useEffect, useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";

registerLocale( 'es', es );

export const Piar1_1 = ({ inputClasses }) => {

    const [ filterMunis, setFilterMunis ] = useState([]);
    
    const { 
        formState1,
        onDateChange,
        onInputChange,
        onTypeHeadChangeAuto
    } = useForm();

    const { 
        startLoadingDeptos,
        startLoadingMunis, 
        munis,
        deptos 
    } = usePiarStore();

    useEffect(() => {
        startLoadingDeptos();    
        startLoadingMunis();
    }, []);

    useEffect(() => {
        if (Object.keys(munis).length !== 0) {
            const filteredMunis = munis.filter(({ departamento }) => departamento === formState1.depa_est[0]);
            setFilterMunis( filteredMunis );
        }
    }, [formState1.depa_est]);

  return (
    <>
    <div className="col-10 p-4 contenedor-form mb-3" style={{ backgroundColor: '#F3F3F3', borderRadius: '10px' }}>
        <div className="col-md-12">
            <div className="col-md-6">
                <label htmlFor="fec_dil" className="form-label">Fecha y lugar de diligenciamiento</label>
                <div className="input-group">
                    <ReactDatePicker 
                        selected={new Date(formState1.fec_dil) } 
                        className="form-control input-date"
                        onChange={ (event) => onDateChange( event, 'fec_dil', 'formState1')}
                        locale="es"
                        id="fec_dil"
                    />
                    <div className="ico-input" style={{ color: '#00000' }}>
                        <i className="fa-solid fa-calendar-days"></i>
                    </div>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <label htmlFor="nom_dil" className="form-label">Nombre de la persona que lo diligencia</label>
                <input 
                    className={`form-control ${ inputClasses.nom_dil }`}
                    id="nom_dil" 
                    name="nom_dil"
                    type="text"   
                    value={ formState1.nom_dil } 
                    onChange={ (event) => onInputChange(event, "formState1") }
                />
            </div>
            <div className="col-md-6">
                <label htmlFor="rol_se_ie" className="form-label">Rol que desempeña en la SE o la IE</label>
                <input 
                    className={`form-control ${ inputClasses.rol_se_ie }`}
                    id="rol_se_ie"
                    type="text"  
                    name="rol_se_ie" 
                    value={ formState1.rol_se_ie } 
                    onChange={ (event) => onInputChange(event, "formState1") }
                />
            </div>
        </div>
    </div>
    {/* INFORMACION GENERAL DEL ESTUDIANTE */}
    <div className="col-10 p-4 contenedor-form mb-3" style={{ backgroundColor: '#F3F3F3', borderRadius: '10px' }}>
        <div className="row">
            <span>1): Información general del estudiante</span>
        </div><hr />
        <div className="row">
            <div className="col-md-4">
                <label htmlFor="nom_est" className="form-label">Nombres</label>
                <input 
                    className={`form-control ${ inputClasses.nom_est }`}
                    id="nom_est"
                    type="text"  
                    name="nom_est" 
                    value={ formState1.nom_est } 
                    onChange={ (event) => onInputChange(event, "formState1") }
                />
            </div>
            <div className="col-md-4">
                <label htmlFor="ape_est" className="form-label">Apellidos</label>
                <input 
                    className={`form-control ${ inputClasses.ape_est }`}
                    id="ape_est"
                    name="ape_est"
                    type="text" 
                    value={ formState1.ape_est }
                    onChange={ (event) => onInputChange(event, "formState1") }
                />
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">
                <label htmlFor="lug_nac_est" className="form-label">Lugar de nacimiento</label>
                <input 
                    className={`form-control ${ inputClasses.lug_nac_est }`}
                    id="lug_nac_est"
                    name="lug_nac_est"
                    type="text"
                    value={ formState1.lug_nac_est }
                    onChange={ (event) => onInputChange(event, "formState1") }
                />
            </div>
            <div className="col-md-4">
                <label htmlFor="edad_est" className="form-label">Edad</label>
                <input 
                    className="form-control"
                    id="edad_est"
                    min={ 0 }
                    name="edad_est"
                    type="number" 
                    value={ formState1.edad_est }
                    onChange={ (event) => onInputChange(event, "formState1") }
                />
            </div>
            <div className="col-md-4">
                <div className="col-md-12">
                    <label htmlFor="fec_nac_est" className="form-label">Fecha de nacimiento</label>
                    <div className="input-group">
                        <ReactDatePicker 
                            selected={ new Date(formState1.fec_nac_est) } 
                            className="form-control input-date"
                            showMonthDropdown
                            showYearDropdown
                            dropdownMode="select"
                            onChange={ (event) => onDateChange( event, 'fec_nac_est', 'formState1')}
                            locale="es"
                            id="fec_nac_est"
                        />
                        <div className="ico-input" style={{ color: '#00000' }}>
                            <i className="fa-solid fa-calendar-days"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="row py-2" style={{ border: '1px solid #bdbdbd', borderRadius: '15px'}}>
            <div className="row">
                <div className="col-md-4">
                    <label className="form-label">Tipo de documento</label>
                    <div>
                        <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input" 
                                type="radio" 
                                name="tip_doc_est" 
                                value="TI"
                                id="TI"
                                checked={ formState1.tip_doc_est === "TI" }
                                onChange={ (event) => onInputChange(event, "formState1") }
                            />
                            <label className="form-check-label" htmlFor="TI">TI</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input" 
                                type="radio" 
                                name="tip_doc_est" 
                                value="RC"
                                id="RC"
                                checked={ formState1.tip_doc_est === "RC" }
                                onChange={ (event) => onInputChange(event, "formState1") }
                            />
                            <label className="form-check-label" htmlFor="RC">RC</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input" 
                                type="radio" 
                                name="tip_doc_est" 
                                value="CC"
                                id="CC"
                                checked={ formState1.tip_doc_est === "CC" }
                                onChange={ (event) => onInputChange(event, "formState1") }
                            />
                            <label className="form-check-label" htmlFor="CC">CC</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input" 
                                type="radio" 
                                name="tip_doc_est" 
                                value="Otro"
                                id="Otro"
                                checked={ formState1.tip_doc_est === "Otro" }
                                onChange={ (event) => onInputChange(event, "formState1") }
                            />
                            <label className="form-check-label" htmlFor="Otro">Otro</label>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 px-md-2" style={{ margin: '0px 12px'}}>
                    <label htmlFor="doc_est" className="form-label">No. de identificación</label>
                    <input 
                        type="text" 
                        className={`form-control ${ inputClasses.doc_est }`}
                        name="doc_est"
                        id="doc_est"
                        value={ formState1.doc_est }
                        onChange={ (event) => onInputChange(event, "formState1") }
                    />
                </div>
            </div>
            {
                formState1.tip_doc_est === 'Otro' && 
                ( 
                    <div className="row mt-2 mx-0">
                        <div className="row">
                            <div className="col-auto">
                                <label htmlFor="otro_doc_est" className="col-form-label">¿Cuál?</label>
                            </div>
                            <div className="col-auto">
                                <input 
                                    type="text" 
                                    className="form-control"
                                    name="otro_doc_est"
                                    id="otro_doc_est"
                                    value={ formState1.otro_doc_est }
                                    onChange={ (event) => onInputChange(event, "formState1") }
                                />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
        <div className="row">
            <div className="col-md-4">
                <label className="form-label">Departamento donde vive</label>
                <Typeahead
                    isInvalid = { inputClasses.depa_est === 'is-invalid' ? true : false }
                    id="depa_est"
                    name="depa_est"
                    onChange={ (event) => onTypeHeadChangeAuto(event, 'depa_est', 'formState1') }
                    options={ deptos }
                    value={ formState1.depa_est }
                />
            </div>
            <div className="col-md-4">
                <label className="form-label">Municipio</label>
                <Typeahead
                    isInvalid = { inputClasses.mun_est === 'is-invalid' ? true : false }
                    id="mun_est"
                    name="mun_est"
                    labelKey="municipio"
                    onChange={ (event) => onTypeHeadChangeAuto(event, 'mun_est', 'formState1') }
                    options={ filterMunis }
                    value={ formState1.mun_est }
                />
            </div>
            <div className="col-md-4">
                <label htmlFor="barrio_est" className="form-label">Barrio/vereda</label>
                <input 
                    type="text" 
                    className={`form-control ${ inputClasses.barrio_est }`}
                    name="barrio_est"
                    id="barrio_est"
                    value={ formState1.barrio_est }
                    onChange={ (event) => onInputChange(event, "formState1") }
                />
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">
                <label htmlFor="dir_est" className="form-label">Dirección de vivienda</label>
                <input 
                    type="text" 
                    className={`form-control ${ inputClasses.dir_est }`}
                    name="dir_est"
                    id="dir_est"
                    value={ formState1.dir_est }
                    onChange={ (event) => onInputChange(event, "formState1") }
                />
            </div>
            <div className="col-md-4">
                <label htmlFor="tel_est" className="form-label">Teléfono</label>
                <input 
                    type="text" 
                    className={`form-control ${ inputClasses.tel_est }`}
                    name="tel_est"
                    id="tel_est"
                    value={ formState1.tel_est }
                    onChange={ (event) => onInputChange(event, "formState1") }
                />
            </div>
            <div className="col-md-4">
                <label htmlFor="ema_est" className="form-label">Correo electrónico</label>
                <input 
                    type="text" 
                    className={`form-control ${ inputClasses.ema_est }`}
                    name="ema_est"
                    id="ema_est"
                    value={ formState1.ema_est }
                    onChange={ (event) => onInputChange(event, "formState1") }
                />
            </div>
        </div>
        <div className="row">
            <div className={ `col-md-4 ${ formState1.cen_pro === 'Si' && 'border-separate py-2' }` }>
                <div className="row">
                    <label className="form-label">¿Está en centro de protección?</label>
                    <div>
                        <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input" 
                                type="radio" 
                                name="cen_pro"
                                id="SiCen"
                                value={ true }
                                checked={ formState1.cen_pro === true }
                                onChange={ (event) => onInputChange(event, "formState1") }
                            />
                            <label className="form-check-label" htmlFor="SiCen">Si</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input 
                                className="form-check-input" 
                                type="radio" 
                                name="cen_pro" 
                                id="NoCen"
                                value={ false }
                                checked={ formState1.cen_pro === false }
                                onChange={ (event) => onInputChange(event, "formState1") }
                            />
                            <label className="form-check-label" htmlFor="NoCen">No</label>
                        </div>
                    </div>          
                </div>
                {
                    formState1.cen_pro &&
                    (
                    <div className="row">
                        <div className="col">
                            <label htmlFor="lugar_cen_pro" className="form-label">¿dónde?</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="lugar_cen_pro"
                                id="lugar_cen_pro"
                                value={ formState1.lugar_cen_pro }
                                onChange={ (event) => onInputChange(event, "formState1") }
                            />
                        </div>
                    </div>
                    )
                }
            </div>    
            <div className="col-md-4">
                <label htmlFor="grd_asp_est" className="form-label">Grado al que aspira ingresar</label>
                <select 
                    className="form-select" 
                    name="grd_asp_est"
                    id="grd_asp_est"
                    value={ formState1.grd_asp_est }
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
        </div>
        <div className="row text-center" style={{ border: '1px solid #bdbdbd', borderRadius: '15px'}}>
            <div className="col p-3">
                <span>Si el estudiante no tiene registro civil debe iniciarse la gestión con la familia y la Registraduría</span>
            </div>
        </div>
        <div className="row">
            <div className="col-md-4">
                <label htmlFor="grp_etn" className="form-label">¿Se reconoce o pertenece a un grupo étnico? ¿Cuál?</label>
                <input 
                    type="text" 
                    className={`form-control ${ inputClasses.grp_etn }`}
                    name="grp_etn"
                    id="grp_etn"
                    value={ formState1.grp_etn }
                    onChange={ (event) => onInputChange(event, "formState1") }
                />
            </div>
        </div>
        <div className="row p-2" style={{ border: '1px solid #bdbdbd', borderRadius: '15px'}}>
            <div className="col-md-6">
                <label className="form-label">¿Se reconoce como víctima del conflicto armado?</label>
                <div>
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="vic_conf" 
                            value={ true }
                            id="SiConf"
                            checked={ formState1.vic_conf === true }
                            onChange={ (event) => onInputChange(event, "formState1") }
                        />
                        <label className="form-check-label" htmlFor="SiConf">Si</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="vic_conf" 
                            value={ false }
                            id="NoConf"
                            checked={ formState1.vic_conf === false }
                            onChange={ (event) => onInputChange(event, "formState1") }
                        />
                        <label className="form-check-label" htmlFor="NoConf">No</label>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <label className="form-label">(¿Cuenta con el respectivo registro?)</label>
                <div>
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="reg_vic_conf" 
                            value={ true }
                            id="SiRegConf"
                            checked={ formState1.reg_vic_conf === true }
                            onChange={ (event) => onInputChange(event, "formState1") }
                        />
                        <label className="form-check-label" htmlFor="SiRegConf">Si</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="reg_vic_conf" 
                            value={ false }
                            id="NoRegConf"
                            checked={ formState1.reg_vic_conf === false }
                            onChange={ (event) => onInputChange(event, "formState1") }
                        />
                        <label className="form-check-label" htmlFor="NoRegConf">No</label>
                    </div>
                </div>
                <div className="col-md-10 pb-2">
                    <input type="file" className="form-control"></input>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}
