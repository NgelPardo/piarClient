import { useEffect } from "react";
import { FilterSearch, TableDeskTop, FormNewMateria, ModalDeleteMateria, FormObjetivosModal, FormBarrerasModal, FormAjustesModal, FormEvaluacionesModal } from "./";
import { getColumnDefMats, getColumnDefObjs, getColumnDefBarrs, getColumnDefAjts, getColumnDefEvas } from "../../helpers";
import { useAuthStore, useModal, useModalStore } from "../../hooks";

export const ModalBodyAjustes = () => {

    const { user } = useAuthStore();

    const { onClickOpenModal } = useModal();

    const { 
        modalType, 
        materias,
        activeMateria,
        activeMateriasModal,
        formVisible,
        objetivos,
        barreras,
        ajustes,
        evaluaciones,
        setFormVisible,
        setActiveMateriaModal,
        handleSetMateriasModal,
        setActiveObjetivoModal,
        setActiveBarreraModal,
        setActiveAjusteModal,
        setActiveEvaluacionModal,
        startLoadingMaterias,
        startLoadingObjetivosModal,
        startLoadingBarrerasModal,
        startLoadingAjustesModal,
        startLoadingEvaluacionesModal
    } = useModalStore();

    const handleBtnCrear = () => {
        switch ( modalType ) {
            case 'materias':
                setActiveMateriaModal({
                    id: null,
                    nom_mat: '',
                    grd_mat: 'N/A',
                    id_prof: user.uid,
                    id_uss: user.uid,
                    fec_dig: new Date().toISOString(),
                });
                break;
            case 'objetivos':
                setActiveObjetivoModal({
                    desc_obj: '',
                    id_mat: activeMateria.id_mat,
                    fec_dil: new Date(),
                });
                break;
            case 'barreras':
                setActiveBarreraModal({
                    desc_barr: '',
                    id_mat: activeMateria.id_mat,
                    fec_dil: new Date(),
                });
                break;
            case 'ajustes':
                setActiveAjusteModal({
                    desc_ajt: '',
                    id_mat: activeMateria.id_mat,
                    fec_dil: new Date(),
                });
                break;
            case 'evaluaciones':
                setActiveEvaluacionModal({
                    desc_eva: '',
                    id_mat: activeMateria.id_mat,
                    fec_dil: new Date(),
                });
                break;
        
            default:
                break;
        }
        setFormVisible(true);
    }
    const handleBack = () => {
        setFormVisible(false);
    }
    const handleEditMateria = ( materia ) => {
        setActiveMateriaModal( materia );
        setFormVisible( true );
    };

    const handleDeleteMateria = ( materia ) => {
        setActiveMateriaModal( materia );
        onClickOpenModal('delete');
    };

    const handleEditHerramienta = ( herramienta ) => {
        switch ( modalType ) {
            case 'objetivos':
                setActiveObjetivoModal( herramienta );
                setFormVisible( true );
                break;
            case 'barreras':
                setActiveBarreraModal( herramienta );
                setFormVisible( true );
                break;
            case 'ajustes':
                setActiveAjusteModal( herramienta );
                setFormVisible( true );
                break;
            case 'evaluaciones':
                setActiveEvaluacionModal( herramienta );
                setFormVisible( true );
                break;
        
            default:
                break;
        }
    }

    const handleDeleteHerramienta = ( herramienta ) => {
        switch (modalType) {
            case 'objetivos':
                setActiveObjetivoModal( herramienta );
                onClickOpenModal('delete');
                break;
            case 'barreras':
                setActiveBarreraModal( herramienta );
                onClickOpenModal('delete');
                break;
            case 'ajustes':
                setActiveAjusteModal( herramienta );
                onClickOpenModal('delete');
                break;
            case 'evaluaciones':
                setActiveEvaluacionModal( herramienta );
                onClickOpenModal('delete');
                break;
        
            default:
                break;
        }
    }

    const columnDefMats = getColumnDefMats( handleEditMateria, handleDeleteMateria );
    
    const columnDefObjs = getColumnDefObjs( handleEditHerramienta, handleDeleteHerramienta );
    
    const columnDefBarrs = getColumnDefBarrs( handleEditHerramienta, handleDeleteHerramienta );
    
    const columnDefAjts = getColumnDefAjts( handleEditHerramienta, handleDeleteHerramienta );
    
    const columnDefEvas = getColumnDefEvas( handleEditHerramienta, handleDeleteHerramienta )
    
    useEffect(() => {
        if (modalType === 'materias') {
            handleSetMateriasModal();
        }
    }, [ materias ]);
    
    useEffect(() => {
        if (modalType === 'materias') {
            startLoadingMaterias();
        }        
    }, [ modalType ]);
    
    useEffect(() => {
        const loadModalData = {
            'objetivos': startLoadingObjetivosModal,
            'barreras': startLoadingBarrerasModal,
            'ajustes': startLoadingAjustesModal,
            'evaluaciones': startLoadingEvaluacionesModal
        };

        const loadFunction = loadModalData[ modalType ];
        if (loadFunction) {
            loadFunction();
        }
    }, [ modalType ]);

  return (
    <>
    {
        formVisible && modalType === 'materias' ? 
        <div className="modal-body">
            <div className="pt-0 pt-sm-3">
                <button className="btn btn-primary" onClick={ handleBack }>
                    <i className="fa-solid fa-left-long"></i>
                    <span style={{ marginLeft: '8px' }}>Atras</span>
                </button>
            </div>
            <div className="px-5 py-3">
                <FormNewMateria/>
            </div>
        </div>
        : formVisible && modalType === 'objetivos' ?
        <div className="modal-body">
            <div className="pt-0 pt-sm-3">
                <button className="btn btn-primary" onClick={ handleBack }>
                    <i className="fa-solid fa-left-long"></i>
                    <span style={{ marginLeft: '8px' }}>Atras</span>
                </button>
            </div>
            <div className="px-5 py-3">
                <FormObjetivosModal/>
            </div>
        </div>
        : formVisible && modalType === 'barreras' ?
        <div className="modal-body">
            <div className="pt-0 pt-sm-3">
                <button className="btn btn-primary" onClick={ handleBack }>
                    <i className="fa-solid fa-left-long"></i>
                    <span style={{ marginLeft: '8px' }}>Atras</span>
                </button>
            </div>
            <div className="px-5 py-3">
                <FormBarrerasModal/>
            </div>
        </div>
        : formVisible && modalType === 'ajustes' ?
        <div className="modal-body">
            <div className="pt-0 pt-sm-3">
                <button className="btn btn-primary" onClick={ handleBack }>
                    <i className="fa-solid fa-left-long"></i>
                    <span style={{ marginLeft: '8px' }}>Atras</span>
                </button>
            </div>
            <div className="px-5 py-3">
                <FormAjustesModal/>
            </div>
        </div>
        : formVisible && modalType === 'evaluaciones' ?
        <div className="modal-body">
            <div className="pt-0 pt-sm-3">
                <button className="btn btn-primary" onClick={ handleBack }>
                    <i className="fa-solid fa-left-long"></i>
                    <span style={{ marginLeft: '8px' }}>Atras</span>
                </button>
            </div>
            <div className="px-5 py-3">
                <FormEvaluacionesModal/>
            </div>
        </div>
        :
        <div className='modal-body'>
            <div className="d-flex justify-content-between">
                <div className="pt-0 pt-sm-3">
                    <button className="btn btn-success" onClick={ handleBtnCrear }>
                        <i className="fa-solid fa-plus"></i>
                        <span style={{ marginLeft: '8px' }}>Crear</span>
                    </button>
                </div>
                <div className="col-sm-3 col-7 pt-2 pt-sm-0">
                    <FilterSearch filterWidthState={ 'N' }/>
                </div>
            </div>
            {
                modalType === 'materias' 
                ? <TableDeskTop columnDef={ columnDefMats } data={ activeMateriasModal } />
                : modalType === 'objetivos'
                ? <TableDeskTop columnDef={ columnDefObjs } data={ objetivos }/>
                : modalType === 'barreras'
                ? <TableDeskTop columnDef={ columnDefBarrs } data={ barreras } />
                : modalType === 'ajustes'
                ? <TableDeskTop columnDef={ columnDefAjts } data={ ajustes } />
                : modalType === 'evaluaciones'
                ? <TableDeskTop columnDef={ columnDefEvas } data={ evaluaciones } />
                : <>404</>
            }
        </div>
    }
    <ModalDeleteMateria/>
    </>
  )
}
