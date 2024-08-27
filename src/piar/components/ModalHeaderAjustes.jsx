import { useModal, useModalStore } from '../../hooks';

export const ModalHeaderAjustes = () => {

    const { modalType } = useModalStore();
    const { onClickCloseModal } = useModal();

  return (
    <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">
            {
                modalType === 'materias' 
                    ? <>Materias</> 
                    : modalType === 'objetivos'
                    ? <>Objetivos</>
                    : modalType === 'barreras'
                    ? <>Barreras</>
                    : modalType === 'ajustes'
                    ? <>Ajuste</>
                    : modalType === 'evaluaciones'
                    ? <>Evaluaciones</>
                    : <>404</>
            }
        </h1>
        <button 
            type="button" 
            className="btn-close" 
            aria-label="Close" 
            onClick={ () => onClickCloseModal('ajustes') }
        ></button>
    </div>
  )
}
