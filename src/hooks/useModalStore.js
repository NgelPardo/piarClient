import { useDispatch, useSelector } from "react-redux"
import { onSetFormVisible, onSetModalType, onSetSelectedRows, onSetActiveMateria, setMateriasModal, updateHerramientasModal, onSetTittleModal, onAddNewMateria, onSetActiveMateriaModal, onUpdateMateriaModal, onDeleteMateriaModal, onAddNewObjetivo, onAddNewBarrera, onAddNewAjuste, onAddNewEvaluacion, onUpdateObjetivoModal, onUpdateBarreraModal, onUpdateAjusteModal, onUpdateEvaluacionModal, onSetActiveObjetivoModal, onSetActiveBarreraModal, onSetActiveAjusteModal, onSetActiveEvaluacionModal, onLoadMateriasModal, onResetHerramientas, onInitActiveHerramientas, onDeleteHerramientaModal } from "../store";
import { piarApi } from "../apis";
import Swal from "sweetalert2";

export const useModalStore = () => {
  
    const dispatch = useDispatch();

    const { user } = useSelector( state => state.auth );

    const {
        modalType, 
        formVisible, 
        selectedRows, 
        materias, 
        activeMateriasModal,
        objetivos, 
        barreras, 
        ajustes, 
        evaluaciones,
        activeMateria,
        activeMateriaModal,
        activeObjetivoModal,
        activeBarreraModal,
        activeAjusteModal,
        activeEvaluacionModal,
    } = useSelector(state => state.modal);

    const setModalType = ( modalType ) => {
        dispatch( onSetModalType( modalType ) )
    }

    const setFormVisible = ( formVisible ) => {
        dispatch( onSetFormVisible( formVisible ) )
    }

    const setSelectedRows = ( selectedRows ) => {
        dispatch( onSetSelectedRows( selectedRows ) )
    }

    // const setHerramientasModal = () => {
    //     dispatch( updateHerramientasModal() );
    // }

    const setActiveMateria = ( activeMateria ) => {
        dispatch( onSetActiveMateria( activeMateria ) )
    }

    const setTittleModal = ( tittleModal ) => {
        dispatch( onSetTittleModal( tittleModal ) )
    }

    const addNewMateria = ( materia ) => {
        dispatch( onAddNewMateria( materia ) )
    }

    const setActiveMateriaModal = ( modalMateria ) => {
        dispatch( onSetActiveMateriaModal( modalMateria ) )
    }

    const setActiveObjetivoModal = ( modalObjetivo ) => {
        dispatch( onSetActiveObjetivoModal( modalObjetivo ) )
    }

    const setActiveBarreraModal = ( modalBarrera ) => {
        dispatch( onSetActiveBarreraModal( modalBarrera ) )
    }

    const setActiveAjusteModal = ( modalAjuste ) => {
        dispatch( onSetActiveAjusteModal( modalAjuste ) )
    }

    const setActiveEvaluacionModal = ( modalEvaluacion ) => {
        dispatch( onSetActiveEvaluacionModal( modalEvaluacion ) )
    }

    const resetHerramientas = ( modalType ) => {
        dispatch( onResetHerramientas( modalType ) )
    }

    const handleSetMateriasModal = () => {
        dispatch( setMateriasModal() )
    }

    const startSavingMateriaModal = async( materiaModal ) => {
        try {
            if( materiaModal.id ) {
                await piarApi.put(`/materias/${ materiaModal.id }`, materiaModal);
                Swal.fire({icon: 'success',title: 'Materia Actualizada',text: 'Guardado correctamete.',});
                dispatch( onUpdateMateriaModal({ ...materiaModal }) )
                return;
            } 
            const { data } = await piarApi.post('/materias', materiaModal);
            dispatch( onAddNewMateria({ ...materiaModal, id: data }))
            Swal.fire({icon: 'success',title: 'Materia Creada',text: 'Guardado correctamete.',});
        } catch (error) {
            Swal.fire({icon: 'error',title: 'Error',text: error.response.data.name,});
            return false;
        }
    }

    const startSavingObjetivoModal = async( objetivoModal ) => {
        try {
            if( objetivoModal.id ) {
                await piarApi.put(`/objetivos/${objetivoModal.id}`, objetivoModal);
                Swal.fire({icon: 'success',title: 'Objetivo Actualizado',text: 'Guardado correctamete.',});
                dispatch( onUpdateObjetivoModal({ ...objetivoModal }) )
                return;
            }
            const { data } = await piarApi.post('/objetivos', { ...objetivoModal, id_uss: user.uid });
            dispatch(onAddNewObjetivo({ ...objetivoModal, id: data }))
            Swal.fire({icon: 'success',title: 'Objetivo Creado',text: 'Guardado correctamete.',});
        } catch (error) {
            Swal.fire({icon: 'error',title: 'Error',text: error.response.data.name,});
            return false;
        }
    }

    const startSavingBarreraModal = async( barreraModal ) => {
        try {
            if( barreraModal.id ) {
                await piarApi.put(`/barreras/${barreraModal.id}`, barreraModal);
                Swal.fire({icon: 'success',title: 'Barrera Actualizada',text: 'Guardado correctamete.',});
                dispatch( onUpdateBarreraModal({ ...barreraModal }) )
                return;
            }
            const { data } = await piarApi.post('/barreras', { ...barreraModal, id_uss: user.uid });
            dispatch(onAddNewBarrera({ ...barreraModal, id: data }))
            Swal.fire({icon: 'success',title: 'Barrera Creada',text: 'Guardado correctamete.',});
        } catch (error) {
            Swal.fire({icon: 'error',title: 'Error',text: error.response.data.name,});
            return false;
        }
    }

    const startSavingAjusteModal = async( ajusteModal ) => {
        try {
            if( ajusteModal.id ) {
                await piarApi.put(`/ajustes/${ajusteModal.id}`, ajusteModal);
                Swal.fire({icon: 'success',title: 'Ajuste Actualizado',text: 'Guardado correctamete.',});
                dispatch( onUpdateAjusteModal({ ...ajusteModal }) )
                return;
            }
            const { data } = await piarApi.post('/ajustes', { ...ajusteModal, id_uss: user.uid });
            dispatch( onAddNewAjuste({ ...ajusteModal, id: data }))
            Swal.fire({icon: 'success',title: 'Ajuste Creado',text: 'Guardado correctamete.',});
        } catch (error) {
            Swal.fire({icon: 'error',title: 'Error',text: error.response.data.name,});
            return false;
        }
    }

    const startSavingEvaluacionModal = async( evaluacionModal ) => {
        try {
            if( evaluacionModal.id ) {
                await piarApi.put(`/evaluaciones/${evaluacionModal.id}`, evaluacionModal);
                Swal.fire({icon: 'success',title: 'Evaluacion Actualizada',text: 'Guardado correctamete.',});
                dispatch( onUpdateEvaluacionModal({ ...evaluacionModal }) )
                return;
            }
            const { data } = await piarApi.post('/evaluaciones', { ...evaluacionModal, id_uss: user.uid });
            dispatch( onAddNewEvaluacion({ ...evaluacionModal, id: data }) )
            Swal.fire({icon: 'success',title: 'Evaluacion Creada',text: 'Guardado correctamete.',});
        } catch (error) {
            Swal.fire({icon: 'error',title: 'Error',text: error.response.data.name,});
            return false;
        }
    }

    const startLoadingMaterias = async() => {
        try {
            const { data } = await piarApi.get(`/materias/${ user.uid }`);
            dispatch( onLoadMateriasModal( data ) );
        } catch (error) {
            console.log(error)
        }
    }

    const startLoadingObjetivosModal = async () => {
        resetHerramientas( modalType );
        try {
            if ( activeMateria ) {
                const { data } = await piarApi.get(`/objetivos/${ activeMateria.id_mat }`);
                dispatch( updateHerramientasModal( data ) );
            }
        } catch (error) {
            console.log(error)
        }
    }

    const startLoadingBarrerasModal = async () => {
        resetHerramientas( modalType );
        try {
            if ( activeMateria ) {
                const { data } = await piarApi.get(`/barreras/${ activeMateria.id_mat }`);
                dispatch( updateHerramientasModal( data ) );
            }
        } catch (error) {
            console.log(error)
        }
    }

    const startLoadingAjustesModal = async () => {
        resetHerramientas( modalType );
        try {
            if ( activeMateria ) {
                const { data } = await piarApi.get(`/ajustes/${ activeMateria.id_mat }`);
                dispatch( updateHerramientasModal( data ) );
            }
        } catch (error) {
            console.log(error)
        }
    }

    const startLoadingEvaluacionesModal = async () => {
        resetHerramientas( modalType );
        try {
            if ( activeMateria ) {
                const { data } = await piarApi.get(`/evaluaciones/${ activeMateria.id_mat }`);
                dispatch( updateHerramientasModal( data ) );
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteMateriaModal = async() => {
        try {
            await piarApi.delete(`/materias/${ activeMateriaModal.id }`);
            dispatch( onDeleteMateriaModal() );
            Swal.fire({icon: 'success',title: 'Materia eliminada',text: 'La materia ha sido eliminada exitosamente.',});
        } catch (error) {
            console.log(error);
            Swal.fire({ icon: 'error', title: 'Error', text: error.response.data.name, });
        }
    }

    const deleteHerramientaModal = async () => {

        const modalMapping = {
            'objetivos': { state: activeObjetivoModal, key: 'activeObjetivoModal' },
            'barreras': { state: activeBarreraModal, key: 'activeBarreraModal' },
            'ajustes': { state: activeAjusteModal, key: 'activeAjusteModal' },
            'evaluaciones': { state: activeEvaluacionModal, key: 'activeEvaluacionModal' }
        };
    
        const activeHerramienta = modalMapping[modalType];

        try {
            await piarApi.delete(`/${modalType}/${ activeHerramienta.state.id }`);
            dispatch( onDeleteHerramientaModal({ activeHerramienta: activeHerramienta.key }) )
            Swal.fire({icon: 'success',title: 'Eliminado',text: 'Eliminado exitosamente.',});
        } catch (error) {
            console.log(error);
            Swal.fire({ icon: 'error', title: 'Error', text: error.response.data.name, });
        }
    }

    const initHerramientasModal = () => {
        dispatch( onInitActiveHerramientas() );
    }
 
    return {
        //Propiedades
        modalType,
        formVisible,
        materias,
        activeMateriasModal,
        selectedRows,
        objetivos, 
        barreras, 
        ajustes, 
        evaluaciones,
        activeMateria,
        activeMateriaModal,
        activeObjetivoModal,
        activeBarreraModal,
        activeAjusteModal,
        activeEvaluacionModal,
        //Metodos
        setModalType,
        setFormVisible,
        setSelectedRows,
        handleSetMateriasModal,
        setActiveMateria,
        setTittleModal,
        addNewMateria,
        resetHerramientas,
        setActiveMateriaModal,
        startSavingMateriaModal,
        deleteMateriaModal,
        startSavingObjetivoModal,
        startSavingBarreraModal,
        startSavingAjusteModal,
        startSavingEvaluacionModal,
        setActiveObjetivoModal,
        setActiveBarreraModal,
        setActiveAjusteModal,
        setActiveEvaluacionModal,
        startLoadingMaterias,
        startLoadingObjetivosModal,
        startLoadingBarrerasModal,
        startLoadingAjustesModal,
        startLoadingEvaluacionesModal,
        initHerramientasModal,
        deleteHerramientaModal,
    }
}
