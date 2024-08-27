import { createSlice } from '@reduxjs/toolkit';
import { initalForm1, initalForm2 } from '../../helpers';
import { semMatMapping } from '../../helpers';

export const piarSlice = createSlice({
    name: 'piar',
    initialState: {
        piars: [],
        isLoadingPiarPt1: false,
        isLoadingPiars: false,
        isLoadingMateriasPiar: true,
        searchState: '',
        piarPt3Active: null,
        piarPt4Active: null,
        formStates: {
            formState1: initalForm1,
            formState2: initalForm2,
            formState3: [],
            formState4: [],
            matsPiarState: {
                id: null,
                trimestre1: { materias: [] },
                trimestre2: { materias: [] },
                trimestre3: { materias: [] },
                bimestre1: { materias: [] },
                bimestre2: { materias: [] },
                bimestre3: { materias: [] },
                bimestre4: { materias: [] }
            }
        },
        periodo: '',
        deptos: [],
        munis: [],
    }, 
    reducers: {
        setInitialFormState1: ( state ) => {
            state.formStates.formState1 = initalForm1;
        },
        setInitialFormState2: ( state, { payload } ) => {
            state.formStates.formState2 = payload;
        },
        setLoadingPiarPt1: ( state, { payload } ) => {
            state.isLoadingPiarPt1 = payload;
        },
        setLoadingPiars: ( state, { payload } ) =>{
            state.isLoadingPiars = payload;  
        },
        setSearchState: ( state, { payload } ) => {
            state.searchState = payload;
        },
        setFormState: ( state, { payload } ) => {
            const { name, value, formName } = payload;
            state.formStates[ formName ] = { ...state.formStates[ formName ], [name]: value };
        },
        setDateState: (state, { payload }) => {
            const { changing, isoDateString, formName } = payload;
            state.formStates[ formName ] = { ...state.formStates[ formName ], [changing]: isoDateString };
        },
        setDeptosState: ( state, { payload } ) => {
            state.deptos = payload;
        },
        setMunisState: ( state, { payload } ) => {
            state.munis = payload;
        },
        setIdPiarMatsPiar: ( state, { payload } ) => {
            state.formStates.matsPiarState.id = payload;
        },
        setPiarPt3Active: ( state, { payload } ) => {
            state.piarPt3Active = payload;
        },
        setPiarPt4Active: ( state, { payload } ) => {
            state.piarPt4Active = payload;
        },
        onAddNewPiarPt1: ( state, { payload } ) => {
            state.piars.push( payload );
        },
        onAddNewMateriasPiar: ( state, { payload } ) => {
            switch (state.periodo) {
                case 't1':
                    state.formStates.matsPiarState.trimestre1.materias.push( payload );
                    break;
                case 't2':
                    state.formStates.matsPiarState.trimestre2.materias.push( payload );
                    break;
                case 't3':
                    state.formStates.matsPiarState.trimestre3.materias.push( payload );
                    break;
                case 'b1':
                    state.formStates.matsPiarState.bimestre1.materias.push( payload );
                    break;
                case 'b2':
                    state.formStates.matsPiarState.bimestre2.materias.push( payload );
                    break;
                case 'b3':
                    state.formStates.matsPiarState.bimestre3.materias.push( payload );
                    break;
                case 'b4':
                    state.formStates.matsPiarState.bimestre4.materias.push( payload );
                    break;
                default:
                    break;
            }
            
        },
        onDeleteMateria: ( state, { payload } ) => {
            const { periodo, activeMateria } = payload;
            state.formStates.matsPiarState[periodo].materias = state.formStates.matsPiarState[periodo].materias.filter(
                materia => materia.id_mat !== activeMateria.id_mat
            )
        },
        onAddNewHerramientaPiar: ( state, { payload } ) => {
            const { periodo, index, herramientas, tipoHerramienta } = payload;
            herramientas.forEach( herramienta => {
                state.formStates.matsPiarState[periodo].materias[index][tipoHerramienta].push( herramienta )
            });
        },
        onDeleteHerramientaPiar: ( state, { payload } ) => {
            const { periodoKey, index, herramientaId, tipoHerramienta } = payload;
            state.formStates.matsPiarState[periodoKey].materias[index][tipoHerramienta] = 
            state.formStates.matsPiarState[periodoKey].materias[index][tipoHerramienta].filter(
                herramienta => herramienta.id !== herramientaId
            );
        },
        setPeriodoState: ( state, { payload } ) => {
            state.periodo = payload;
        },
        onLoadPiars: ( state, { payload = [] } ) => {
            payload.forEach( piar => {
                const exists = state.piars.some( dbPiar => dbPiar.id === piar.id );
                if ( !exists ) {
                    state.piars.push( piar )
                }    
            })
        },
        onLoadMateriasPiar: ( state, { payload = [] } ) => {
            state.isLoadingMateriasPiar = false;
            payload.forEach( materia =>{
                const { sem_mat, id_mat } = materia;
                const periodo = semMatMapping[sem_mat];
                if( periodo )
                {
                    const exists = state.formStates.matsPiarState[periodo].materias.some(mat => mat.id_mat === id_mat);

                    if (!exists) {
                        state.formStates.matsPiarState[periodo].materias.push( materia );
                    }
                }
            })
        },
        onLoadPiarPt1: ( state, { payload } ) => {
            state.formStates.formState1 = payload;
        },
        onLoadPiarPt2: ( state, { payload } ) => {
            state.formStates.formState2 = payload;
        }
    }
});

export const { 
    setSearchState, 
    setFormState, 
    setDateState, 
    setDeptosState, 
    setMunisState,
    setInitialFormState1,
    onAddNewPiarPt1,
    onAddNewMateriasPiar,
    onDeleteMateria,
    onAddNewHerramientaPiar,
    onDeleteHerramientaPiar,
    setPeriodoState,
    onLoadPiars,
    setInitialFormState2,
    setIdPiarMatsPiar,
    onLoadMateriasPiar,
    onLoadPiarPt1,
    onLoadPiarPt2,
    setLoadingPiarPt1,
    setPiarPt3Active,
    setPiarPt4Active,
    setLoadingPiars,
} = piarSlice.actions;