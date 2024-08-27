import { useEffect, useRef } from 'react';
import { useModal, useModalStore, useUiStore } from '../../hooks';
import { ListUsers } from './';
import './ControlPanel.css'

export const ControlPanelUsers = () => {

  const btnNewUsuario = useRef(null);

  const { stylesIsOpen, stylesIsClose, onClickOpenModal, isUsersModalOpen } = useModal();
  const { setTittleModal } = useModalStore();
  const { setInputDisabled } = useUiStore();

  const openModalUsers = () => {
    setTittleModal( 'Crear Usuario' );
    setInputDisabled( false );
    onClickOpenModal('users');
  }

  useEffect(() => {
    if ( isUsersModalOpen ) {
        stylesIsOpen( btnNewUsuario );
    } else {
        stylesIsClose( btnNewUsuario );
    }
    return () => {
        stylesIsClose( btnNewUsuario );
    };
  }, [ isUsersModalOpen ])
  

  return (
    <div className='bg-body-tertiary p-2' style={{ borderRadius:"20px" }}>
        <div className='d-flex justify-content-between mt-2'>
          <div className='p-2 button-new-piar mb-2'>
            <button 
              className='btn' 
              style={{ backgroundColor: '#508bfc', color: '#f5f5f5', borderRadius: '50px' }}
              onClick={ openModalUsers }
              ref={ btnNewUsuario }
            >
              <i className="fa-solid fa-plus"></i>
              <span style={{ margin: '0px 10px'}}>Nuevo Usuario</span>
            </button>
          </div>
        </div>
        <ListUsers/>
    </div>
  )
}
