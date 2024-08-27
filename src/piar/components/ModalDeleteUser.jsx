import { useAuthStore, useModal, useUiStore } from "../../hooks"

export const ModalDeleteUser = () => {

    const { onClickCloseModal } = useModal();
    const { isDeleteModalOpen } = useUiStore();
    const { setActiveUser, startDeletingUser, userActive } = useAuthStore();

    const closeModal = () => {
        onClickCloseModal('delete');
        setActiveUser(null);
    }

    const onDelete = async() => {
        await startDeletingUser();
        setActiveUser(null);
        onClickCloseModal('delete');
    }

  return (
    <div 
        className={`modal fade ${ isDeleteModalOpen ? 'show' : ''}`} 
        id="modalDelete" 
        tabIndex="-1"
        style={{ display: isDeleteModalOpen ? 'block' : 'none' }}
    >
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">
                        Eliminar
                    </h1>
                    <button 
                        type="button" 
                        className="btn-close" 
                        aria-label="Close" 
                        onClick={ () => closeModal() }
                    ></button>
                </div>
                <div className="modal-body text center">
                    ¿Esta seguro de eliminar al usuario { userActive?.email }?      
                </div>
                <div className="modal-footer">
                    <button 
                        type="button" 
                        className="btn btn-danger"
                        onClick={ () => onDelete() }
                    >Eliminar</button>
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={ () => closeModal() }
                    >Cancelar</button>
                </div>
            </div>
        </div>
    </div>
  )
}
