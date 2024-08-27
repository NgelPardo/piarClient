import { useForm, useModal, useModalStore, usePiarStore, useUiStore } from "../../hooks";

export const ModalFooterAjustes = () => {

  const { selectedRows, setSelectedRows, modalType, activeMateria } = useModalStore();
  const { isRowSelected } = useUiStore();
  const { onClickCloseModal } = useModal();
  const { periodo } = usePiarStore()
  const { startSavingMateriasPiar, startSavingHerramientasPiar } = useForm();

  

  const onSetItem = async () => {

    const baseData = {
      sem_mat: periodo,
      id_piar: 'b2d0516a-3308-4f43-bc50-d2efaf712276',  //TODO: Actualizar el id_piar
    };

    const mapping = {
      'materias': { idKey: 'id_mat', saveFunc: startSavingMateriasPiar },
      'objetivos': { idKey: 'id_obj', saveFunc: startSavingHerramientasPiar },
      'barreras': { idKey: 'id_barr', saveFunc: startSavingHerramientasPiar },
      'ajustes': { idKey: 'id_ajt', saveFunc: startSavingHerramientasPiar },
      'evaluaciones': { idKey: 'id_eva', saveFunc: startSavingHerramientasPiar }
    };

    const config = mapping[modalType];
  
    if (config) {
      const updatedItems = selectedRows.map(item => ({
        ...item,
        [config.idKey]: item.id,
        ...baseData
      }));

      updatedItems.forEach(item => delete item.id);

      await config.saveFunc(updatedItems, activeMateria, modalType);
    }
    
    onClickCloseModal('ajustes');
    setSelectedRows({});
  }

  return (
    <div className="modal-footer">
        <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={ () => onClickCloseModal('ajustes') }
        >Cerrar</button>
        {
          isRowSelected ? 
            <button 
              type="button" 
              className="btn btn-primary"
              onClick={ onSetItem }
            >
              Agregar
            </button>
            :
            <></>
        }
        
    </div>
  )
}
