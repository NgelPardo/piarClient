import { onAddNewMateriasPiar, onUpdateHerramientasModal, onSetMateriasModal } from ".."

export const addAndUpdateMaterias = ( payload ) => {
    return (dispatch, getState) => {
        payload.forEach(materia => {
            dispatch( onAddNewMateriasPiar(materia) );
        });
    }
};

export const setMateriasModal = () => {
    return (dispatch, getState) => {
        const { periodo } = getState().piar;
        const periodosMap = {
            t1: 'trimestre1',
            t2: 'trimestre2',
            t3: 'trimestre3',
            b1: 'bimestre1',
            b2: 'bimestre2',
            b3: 'bimestre3',
            b4: 'bimestre4'
        };
        const periodoKey = periodosMap[periodo];
        const matsPiarState = getState().piar.formStates.matsPiarState[periodoKey];
        
        const payload = {
            materiasMod: matsPiarState,
            periodo
        }
        
        dispatch( onSetMateriasModal( payload ) );
    }
}

export const updateHerramientasModal = ( data ) => {
    return (dispatch, getState) => {
        const state = getState();
        const { activeMateria, modalType } = getState().modal;
        const { periodo } = getState().piar;

        const periodosMap = { //TODO: Obtener de semMatMapping.js
            t1: 'trimestre1',
            t2: 'trimestre2',
            t3: 'trimestre3',
            b1: 'bimestre1',
            b2: 'bimestre2',
            b3: 'bimestre3',
            b4: 'bimestre4'
        };

        const idsMap = {
            objetivos: 'id_obj',
            barreras: 'id_barr',
            ajustes: 'id_ajt',
            evaluaciones: 'id_eva'
        };

        const idHerr = idsMap[modalType];

        const periodoKey = periodosMap[periodo];
        const materias = state.piar.formStates.matsPiarState[periodoKey].materias;
        const index = materias.findIndex( m => m.id === activeMateria.id );
        const herramientas = state.piar.formStates.matsPiarState[periodoKey].materias[index][modalType];
        
        const filteredData = data.filter( item => 
            !herramientas.some( herramienta => herramienta[idHerr] === item.id )
        );

        const payload = { filteredData, modalType }
        
        dispatch( onUpdateHerramientasModal( payload ) );
    }
}