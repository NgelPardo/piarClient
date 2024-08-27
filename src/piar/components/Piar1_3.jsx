import { useForm } from "../../hooks";

export const Piar1_3 = ({ inputClasses }) => {

    const { formState1, onInputChange } = useForm();

  return (
    <div className="col-10 px-5 py-4 contenedor-form mb-3" style={{ backgroundColor: '#F3F3F3', borderRadius: '10px' }}>
        <span>3): Entorno Hogar</span><hr />
        <div className="row justify-content-around">
            <div className="col-md-6 p-4 mb-2 mb-md-0" style={{ border: '1px solid #bdbdbd', borderRadius: '15px'}}>
                <div className="row">
                    <label htmlFor="nom_mam" className="form-label">Nombre de la madre</label>
                    <input 
                        type="text" 
                        className={`form-control ${ inputClasses.nom_mam }`}
                        name="nom_mam"
                        id="nom_mam"
                        value={ formState1.nom_mam }
                        onChange={ (event) => onInputChange(event, "formState1") }
                    />
                </div>
                <div className="row">
                    <label htmlFor="ocu_mam" className="form-label">Ocupación de la madre</label>
                    <input 
                        type="text" 
                        className={`form-control ${ inputClasses.ocu_mam }`}
                        name="ocu_mam"
                        id="ocu_mam"
                        value={ formState1.ocu_mam }
                        onChange={ (event) => onInputChange(event, "formState1") }
                    />
                </div>
                <div className="row">
                    <label htmlFor="niv_ed_mam" className="form-label">Nivel educativo alcanzado</label>
                    <input 
                        type="text" 
                        className={`form-control ${ inputClasses.niv_ed_mam }`}
                        name="niv_ed_mam"
                        id="niv_ed_mam"
                        value={ formState1.niv_ed_mam }
                        onChange={ (event) => onInputChange(event, "formState1") }
                    />
                </div>
            </div>
            <div className="col-md-6 p-4" style={{ border: '1px solid #bdbdbd', borderRadius: '15px'}}>
                <div className="row">
                    <label htmlFor="nom_pap" className="form-label">Nombre del padre</label>
                    <input 
                        type="text" 
                        className={`form-control ${ inputClasses.nom_pap }`}
                        name="nom_pap"
                        id="nom_pap"
                        value={ formState1.nom_pap }
                        onChange={ (event) => onInputChange(event, "formState1") }
                    />
                </div>
                <div className="row">
                    <label htmlFor="ocu_pap" className="form-label">Ocupación del padre</label>
                    <input 
                        type="text" 
                        className={`form-control ${ inputClasses.ocu_pap }`}
                        name="ocu_pap"
                        id="ocu_pap"
                        value={ formState1.ocu_pap }
                        onChange={ (event) => onInputChange(event, "formState1") }
                    />
                </div>
                <div className="row">
                    <label htmlFor="niv_ed_pap" className="form-label">Nivel educativo alcanzado</label>
                    <input 
                        type="text" 
                        className={`form-control ${ inputClasses.niv_ed_pap }`}
                        name="niv_ed_pap"
                        id="niv_ed_pap"
                        value={ formState1.niv_ed_pap }
                        onChange={ (event) => onInputChange(event, "formState1") }
                    />
                </div>
            </div>
        </div>
        <div className="row contenedor-piar3" style={{ border: '1px solid #bdbdbd', borderRadius: '15px'}}>
            <div className="col-md-6 item-row-piar3">
                <div className="row">
                    <label htmlFor="nom_cui" className="form-label">Nombre Cuidador</label>
                    <input 
                        type="text" 
                        className={`form-control ${ inputClasses.nom_cui }`}
                        name="nom_cui"
                        id="nom_cui"
                        value={ formState1.nom_cui }
                        onChange={ (event) => onInputChange(event, "formState1") }
                    />
                </div>
                <div className="row">
                    <label htmlFor="par_cui" className="form-label">Parentesco con el estudiante:</label>
                    <input 
                        type="text" 
                        className={`form-control ${ inputClasses.par_cui }`}
                        name="par_cui"
                        id="par_cui"
                        value={ formState1.par_cui }
                        onChange={ (event) => onInputChange(event, "formState1") }
                    />
                </div>
                <div className="row">
                    <label htmlFor="niv_ed_cui" className="form-label">Nivel educativo cuidador</label>
                    <input 
                        type="text" 
                        className={`form-control ${ inputClasses.niv_ed_cui }`}
                        name="niv_ed_cui"
                        id="niv_ed_cui"
                        value={ formState1.niv_ed_cui }
                        onChange={ (event) => onInputChange(event, "formState1") }
                    />
                </div>
            </div>
            <div className="col-md-6 item-row-piar3">
                <div className="row">
                    <label htmlFor="tel_cui" className="form-label">Teléfono</label>
                    <input 
                        type="text" 
                        className={`form-control ${ inputClasses.tel_cui }`}
                        name="tel_cui"
                        id="tel_cui"
                        value={ formState1.tel_cui }
                        onChange={ (event) => onInputChange(event, "formState1") }
                    />
                </div>
                <div className="row">
                    <label htmlFor="ema_cui" className="form-label">Correo electrónico:</label>
                    <input 
                        type="" 
                        className={`form-control ${ inputClasses.ema_cui }`}
                        name="ema_cui"
                        id="ema_cui"
                        value={ formState1.ema_cui }
                        onChange={ (event) => onInputChange(event, "formState1") }
                    />
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <label htmlFor="num_her" className="form-label">No. Hermanos</label>
                <input 
                    type="number" 
                    className="form-control"
                    name="num_her"
                    id="num_her"
                    value={ formState1.num_her }
                    onChange={ (event) => onInputChange(event, "formState1") }
                />
            </div>
            <div className="col-md-6">
                <label htmlFor="lug_ocu_est" className="form-label">Lugar que ocupa:</label>
                <input 
                    type="number" 
                    className={`form-control ${ inputClasses.lug_ocu_est }`}
                    name="lug_ocu_est"
                    id="lug_ocu_est"
                    value={ formState1.lug_ocu_est }
                    onChange={ (event) => onInputChange(event, "formState1") }
                />
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <label htmlFor="per_viv_e" className="form-label">Personas con quien vive:</label>
                <input 
                    type="text" 
                    className={`form-control ${ inputClasses.per_viv_e }`}
                    name="per_viv_e"
                    id="per_viv_e"
                    value={ formState1.per_viv_e }
                    onChange={ (event) => onInputChange(event, "formState1") }
                />
            </div>
            <div className="col-md-6">
                <label htmlFor="apo_cri_e" className="form-label">¿Quiénes apoyan la crianza del estudiante?</label>
                <input 
                    type="text" 
                    className={`form-control ${ inputClasses.apo_cri_e }`}
                    name="apo_cri_e"
                    id="apo_cri_e"
                    value={ formState1.apo_cri_e }
                    onChange={ (event) => onInputChange(event, "formState1") }
                />
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <label className="form-label">¿Está bajo protección?</label>
                <div>
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="baj_prot"
                            value={ true }
                            id="siBaj"
                            checked={formState1.baj_prot }
                            onChange={ (event) => onInputChange(event, "formState1") }  
                        />
                        <label className="form-check-label" htmlFor="siBaj">Si</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input 
                            className="form-check-input" 
                            type="radio" 
                            name="baj_prot"
                            value={ false }
                            id="noBaj"  
                            checked={ !formState1.baj_prot }
                            onChange={ (event) => onInputChange(event, "formState1") }
                        />
                        <label className="form-check-label" htmlFor="noBaj">No</label>
                    </div>
                </div> 
            </div>
            <div className="col-md-6">
                <div className="row">
                    <div className="col-6">
                        <label className="form-label">La familia recibe algún subsidio de alguna entidad o institución:</label>
                        <div>
                            <div className="form-check form-check-inline">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="sub_inst_ent" 
                                    value={ true }
                                    id="siSubIns"
                                    checked={ formState1.sub_inst_ent }  
                                    onChange={ (event) => onInputChange(event, "formState1") }
                                />
                                <label className="form-check-label" htmlFor="siSubIns">Si</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input 
                                    className="form-check-input" 
                                    type="radio" 
                                    name="sub_inst_ent"
                                    value={ false }
                                    id="noSubIns"  
                                    checked={ !formState1.sub_inst_ent }  
                                    onChange={ (event) => onInputChange(event, "formState1") }
                                />
                                <label className="form-check-label" htmlFor="noSubIns">No</label>
                            </div>
                        </div> 
                    </div>
                    {
                        formState1.sub_inst_ent &&
                        (
                        <div className="col-6">
                            <label htmlFor="tip_sub" className="form-label">¿Cuál?</label>
                            <input 
                                type="text" 
                                className="form-control"
                                name="tip_sub"
                                id="tip_sub"
                                value={ formState1.tip_sub }
                                onChange={ (event) => onInputChange(event, "formState1") }
                            />
                        </div>
                        )  
                    }   
                </div>
            </div>
        </div>
    </div>
  )
}
