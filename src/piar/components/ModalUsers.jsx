import { useEffect, useMemo, useState } from "react";
import { useAuthStore, useModal, useUiStore } from "../../hooks"

export const ModalUsers = () => {

    const { startSavingUser, userActive } = useAuthStore();
    const { tittleModal, isInputDisabled } = useUiStore();
    const { isUsersModalOpen, onClickCloseModal } = useModal();

    const [formSubmitted, setFormSubmitted] = useState(false);

    const [formValues, setFormValues] = useState({
        id: '',
        nombres: '',
        apellidos: '',
        email: '',
        rol: '4',
        password: '$Test123'
    });

    const nombresClass = useMemo(() => {
        if (!formSubmitted) return '';
        
        return (formValues.nombres.length > 0)
            ? ''
            : 'is-invalid';
    }, [
        formValues.nombres,
        formSubmitted
    ]);

    const apellidosClass = useMemo(() => {
        if (!formSubmitted) return '';
        
        return (formValues.apellidos.length > 0)
            ? ''
            : 'is-invalid';
    }, [
        formValues.apellidos,
        formSubmitted
    ]);

    const emailClass = useMemo(() => {
        if (!formSubmitted) return '';
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        return emailRegex.test(formValues.email)
            ? ''
            : 'is-invalid';
    }, [
        formValues.email,
        formSubmitted
    ]);

    const onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    };

    const onSubmit = async ( event ) => {
        event.preventDefault();
        setFormSubmitted(true);

        if (formValues.nombres.length <= 0) return;
        if (formValues.apellidos.length <= 0) return;
        if (formValues.email.length <= 0) return;

        const success = await startSavingUser( formValues );

        if (success) onClickCloseModal('users');
        //TODO: ENVIAR BEARER TOKEN
    }

    useEffect(() => {
        if (userActive !== null ) {
            setFormValues({ 
                id: userActive.id || '',
                nombres: userActive.nombres || '',
                apellidos: userActive.apellidos || '',
                email: userActive.email || '',
                rol: userActive.id_Rol || '4',
                password: userActive.password || 'PassUser'
            });
        } else {
            setFormValues({
                id: '',
                nombres: '',
                apellidos: '',
                email: '',
                rol: '4',
                password: '$Test123'
            });
        }
    }, [ userActive ])
    

  return (
    <div 
        className={`modal fade ${ isUsersModalOpen ? 'show' : ''}`} 
        id="modalUsers" 
        tabIndex="-1"
        style={{ display: isUsersModalOpen ? 'block' : 'none' }}
    >
        <div className="modal-dialog modal-xl">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                        { tittleModal }
                    </h1>
                    <button 
                        type="button" 
                        className="btn-close" 
                        aria-label="Close" 
                        onClick={ () => onClickCloseModal('users') }
                    ></button>
                </div>
                <div className="modal-body px-5">
                    <form className="container" onSubmit={ onSubmit }>

                        <div className="form-group mb-2">
                            <label>Nombres</label>
                            <input 
                                className={ `form-control ${ nombresClass }` }
                                name="nombres"
                                value={ formValues.nombres }
                                onChange={ onInputChanged }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label>Apellidos</label>
                            <input 
                                className={ `form-control ${ apellidosClass }` }
                                name="apellidos"
                                value={ formValues.apellidos }
                                onChange={ onInputChanged }
                            />
                          </div>
                        <div className="form-group mb-2">
                            <label>Email</label>
                            <input 
                                className={ `form-control ${ emailClass }` }
                                name="email"
                                value={ formValues.email }
                                onChange={ onInputChanged }
                                disabled={ isInputDisabled }
                            />
                        </div>
                        <div className="form-group mb-2">
                            <label>Rol</label>
                            <select 
                                className={ `form-select` }
                                name="rol"
                                value={ formValues.rol }
                                onChange={ onInputChanged }
                            >
                                <option value="4">Auxiliar</option>
                                <option value="1">SuperAdmin</option>
                                <option value="2">Admin</option>
                                <option value="3">Profesor</option>
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label>Contraseña</label>
                            <input
                                disabled
                                type="password" 
                                className="form-control"
                                name="title"
                                autoComplete="off"
                                value={ formValues.password }
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-outline-primary btn-block"
                        >
                            <i className="far fa-save"></i>
                            <span> Guardar</span>
                        </button>

                    </form>
                </div>
                <div className="modal-footer">
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={ () => onClickCloseModal('users') }
                    >Cerrar</button>
                </div>
            </div>
        </div>
    </div>
  )
}
