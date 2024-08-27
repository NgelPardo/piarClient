import { useModal, useModalStore, usePiarStore, useUiStore } from "../../hooks"

export const ModalDeleteMateria = () => {

    const { onClickCloseModal, isAjusteModalOpen } = useModal();
    const { deleteMateriaModal, activeMateriaModal, activeMateria, modalType, deleteHerramientaModal } = useModalStore(); 
    const { isDeleteModalOpen } = useUiStore();
    const { deleteMateriaPiar } = usePiarStore();

    const closeModal = () => {
        onClickCloseModal('delete');
    }

    const onDelete = () => {
        if (isAjusteModalOpen) {
            if (modalType === 'materias') {
                deleteMateriaModal();
            } else {
                deleteHerramientaModal();
            }
        } else {
            deleteMateriaPiar();
        }
        
        onClickCloseModal('delete');
    }

    const renderModalContent = () => {
        if (isAjusteModalOpen) {
            switch (modalType) {
                case 'objetivos':
                    return <>¿Está seguro de eliminar el objetivo?</>;
                case 'barreras':
                    return <>¿Está seguro de eliminar la barrera?</>;
                case 'ajustes':
                    return <>¿Está seguro de eliminar el ajuste?</>;
                case 'evaluaciones':
                    return <>¿Está seguro de eliminar la evaluación?</>;
                default:
                    return <>¿Está seguro de eliminar la materia {activeMateriaModal ? activeMateriaModal.nom_mat : ''}?</>;
            }
        } else {
            return <>¿Está seguro de eliminar la materia {activeMateria ? activeMateria.nom_mat : ''} de su formulario?</>;
        }
    };

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
                    { renderModalContent() }      
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
