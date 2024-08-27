import { onAddNewHerramientaPiar, onDeleteHerramientaPiar, onDeleteMateria, onSetActiveMateria } from "../";

export const addHerramientas = ( payload ) => {
    return ( dispatch, getState ) => {
        const { materia, herramientas, modalType } = payload;
        const periodo = getState().piar.periodo;
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
        const materias = getState().piar.formStates.matsPiarState[periodoKey].materias;
        const index = materias.findIndex(m => m.id === materia.id);

        const infoHerramienta = {
            herramientas,
            periodo: periodoKey,
            index,
            tipoHerramienta: modalType
        };

        dispatch( onAddNewHerramientaPiar( infoHerramienta ) );
    }
};

export const deleteHerramientas = ( payload ) => {
    return ( dispatch, getState ) => {
        const { materia, herramientaId, tipoHerramienta } = payload;
        const state = getState();
        const periodo = state.piar.periodo;
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
        const materias = state.piar.formStates.matsPiarState[periodoKey].materias;

        const index = materias.findIndex(m => m.id === materia);
        
        const payloadDelete = {
            periodoKey,
            index, 
            herramientaId, 
            tipoHerramienta
        }

        dispatch( onDeleteHerramientaPiar( payloadDelete ) );
    }
}

export const deleteMaterias = () => {
    return ( dispatch, getState ) => {
        const state = getState();
        const { periodo } = state.piar;
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
        const { activeMateria } = state.modal;
        
        const payload = {
            periodo: periodoKey,
            activeMateria
        }
        
        dispatch( onDeleteMateria( payload ) );
        dispatch( onSetActiveMateria(null) );
    };
};