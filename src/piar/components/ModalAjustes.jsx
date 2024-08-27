import { useModal } from "../../hooks"
import { ModalBodyAjustes, ModalFooterAjustes, ModalHeaderAjustes } from "./";

export const ModalAjustes = () => {

    const { isAjusteModalOpen } = useModal();

  return (
    <div 
        className={`modal fade ${ isAjusteModalOpen ? 'show' : ''}`} 
        id="modalAjustes" 
        tabIndex="-1"
        style={{ display: isAjusteModalOpen ? 'block' : 'none' }}
    >
        <div className="modal-dialog modal-xl">
            <div className="modal-content">
                <ModalHeaderAjustes/>
                <ModalBodyAjustes/>
                <ModalFooterAjustes/>
            </div>
        </div>
    </div>
  )
}
