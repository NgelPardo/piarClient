import { createSlice } from '@reduxjs/toolkit';


const tempBarreras = [
    {
        id: new Date().getTime() - 100,
        id_mat: new Date().getTime(),
        desc_barr: 'Dificultad para comprender conceptos abstractos y simbólicos.',
        id_uss: 1,
        fec_dig: new Date().getTime()
    },
    {
        id: new Date().getTime() - 200,
        id_mat: new Date().getTime(),
        desc_barr: 'Dificultad para entender y analizar textos complejos.',
        id_uss: 1,
        fec_dig: new Date().getTime()
    },
    {
        id: new Date().getTime() - 300,
        id_mat: new Date().getTime(),
        desc_barr: 'Dificultad para comprender términos y conceptos científicos.',
        id_uss: 1,
        fec_dig: new Date().getTime()
    }
];

const tempAjustes = [
    {
        id: new Date().getTime() - 100,
        id_mat: new Date().getTime(),
        desc_ajt: 'Proveer herramientas manipulativas, gráficos y modelos para representar conceptos abstractos.',
        id_uss: 1,
        fec_dig: new Date().getTime()
    },
    {
        id: new Date().getTime() - 200,
        id_mat: new Date().getTime(),
        desc_ajt: ' Permitir presentaciones orales, proyectos o soluciones prácticas en lugar de exámenes escritos tradicionales.',
        id_uss: 1,
        fec_dig: new Date().getTime()
    },
    {
        id: new Date().getTime() - 300,
        id_mat: new Date().getTime(),
        desc_ajt: 'Proveer libros en braille, audiolibros, y textos con impresión grande o software de lectura.',
        id_uss: 1,
        fec_dig: new Date().getTime()
    }
];

const tempEvaluaciones = [
    {
        id: new Date().getTime() - 100,
        id_mat: new Date().getTime(),
        desc_eva: 'Analizar el progreso en las calificaciones y la participación en las actividades matemáticas.',
        id_uss: 1,
        fec_dig: new Date().getTime()
    },
    {
        id: new Date().getTime() - 200,
        id_mat: new Date().getTime(),
        desc_eva: 'Observar cómo los estudiantes utilizan los textos adaptados durante la lectura.',
        id_uss: 1,
        fec_dig: new Date().getTime()
    },
    {
        id: new Date().getTime() - 300,
        id_mat: new Date().getTime(),
        desc_eva: 'Revisar cómo el apoyo adicional impacta en la realización de experimentos y tareas de laboratorio.',
        id_uss: 1,
        fec_dig: new Date().getTime()
    }
];

export const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        modalType: '',
        formVisible: false,
        selectedRows: {},
        activeMateria: [],
        activeMateriaModal: null,
        activeMateriasModal: [],
        activeObjetivoModal: null,
        activeBarreraModal: null,
        activeAjusteModal: null,
        activeEvaluacionModal: null,
        materias: [],
        objetivos: [],
        barreras: tempBarreras,
        ajustes: tempAjustes,
        evaluaciones: tempEvaluaciones,
    },
    reducers: {
        onSetModalType: ( state, { payload } ) => {
            state.modalType = payload;
        },
        onSetFormVisible: ( state, { payload } ) => {
            state.formVisible = payload;
        },
        onSetSelectedRows: ( state, { payload } ) => {
            state.selectedRows = payload;
        },
        onSetActiveMateria: ( state, { payload } ) => {
            state.activeMateria = payload;  
        },
        onSetActiveMateriaModal: ( state, { payload } ) => {
            state.activeMateriaModal = payload;
        },
        onSetActiveObjetivoModal: ( state, { payload } ) => {
            state.activeObjetivoModal = payload;
        },
        onSetActiveBarreraModal: ( state, { payload } ) => {
            state.activeBarreraModal = payload;
        },
        onSetActiveAjusteModal: ( state, { payload } ) => {
            state.activeAjusteModal = payload;
        },
        onSetActiveEvaluacionModal: ( state, { payload } ) => {
            state.activeEvaluacionModal = payload;
        },
        onUpdateMateriasModal: (state, { payload }) => {
            if( payload.materiasMod.materias ){
                const { materiasMod, periodo } = payload;
                const periodosMap = {
                    t1: 'primerTrimestre',
                    t2: 'segundoTrimestre',
                    t3: 'tercerTrimestre',
                    b1: 'primerBimestre',
                    b2: 'segundoBimestre',
                    b3: 'tercerBimestre',
                    b4: 'cuartoBimestre'
                };
                const periodoKey = periodosMap[ periodo ];
                if (periodoKey) {
                    materiasMod.materias.forEach(materia => {
                        state.periodos[periodoKey] = state.periodos[periodoKey].filter(
                            materiaModal => materiaModal.id_mat !== materia.id_mat
                        );
                    });
                }
            }
        },
        onUpdateHerramientasModal: ( state, { payload } ) => {
            const { filteredData, modalType } = payload;
            if ( filteredData ) {
                filteredData.forEach( herramienta => {
                    const exist = state[modalType].some( dbHerramientaModal => dbHerramientaModal.id === herramienta.id );
                    if( !exist ) {
                        state[modalType].push( herramienta )
                    }
                });
            }
        },
        // onLoadObjetivosModal: ( state, { payload = [] } ) => {
        //     payload.forEach( objetivo => {
        //         const exist = state.objetivos.some( dbObjetivoModal => dbObjetivoModal.id === objetivo.id );
        //         if( !exist ) {
        //             state.objetivos.push( objetivo )
        //         }   
        //     })
        // },
        onAddNewMateria: ( state, { payload } ) => {
            state.materias.push( payload );
        },
        onAddNewObjetivo: ( state, { payload } ) => {
            state.objetivos.push( payload );
        },
        onAddNewBarrera: ( state, { payload } ) => {
            state.barreras.push( payload );
        },
        onAddNewAjuste: ( state, { payload } ) => {
            state.ajustes.push( payload );
        },
        onAddNewEvaluacion: ( state, { payload } ) => {
            state.evaluaciones.push( payload );
        },
        onSetMateriasModal: ( state, { payload } ) => {
            const materiasPiar = payload.materiasMod.materias;
            state.activeMateriasModal = state.materias.filter( materia => {
                return !materiasPiar.some( materiaPiar => materiaPiar.id_mat === materia.id );
            });
        },
        onUpdateMateriaModal: ( state, { payload } ) => {
            state.materias = state.materias.map( materia => {
                if( materia.id === payload.id ) {
                    return payload;
                }
                return materia;
            });
        },
        onUpdateObjetivoModal: ( state, { payload } ) => {
            state.objetivos = state.objetivos.map( objetivo => {
                if( objetivo.id === payload.id ) {
                    return payload;
                }
                return objetivo;
            });
        },
        onUpdateBarreraModal: ( state, { payload } ) => {
            state.barreras = state.barreras.map( barrera => {
                if( barrera.id === payload.id ) {
                    return payload;
                }
                return barrera;
            });
        },
        onUpdateAjusteModal: ( state, { payload } ) => {
            state.ajustes = state.ajustes.map( ajuste => {
                if( ajuste.id === payload.id ) {
                    return payload;
                }
                return ajuste;
            });
        },
        onUpdateEvaluacionModal: ( state, { payload } ) => {
            state.evaluaciones = state.evaluaciones.map( evaluacion => {
                if( evaluacion.id === payload.id ) {
                    return payload;
                }
                return evaluacion;
            });
        },
        onDeleteMateriaModal: ( state ) => {
            if ( state.activeMateriaModal ) {
                state.materias = state.materias.filter( materia => materia.id !== state.activeMateriaModal.id );
                state.activeMateriaModal = null;
            }
        },
        onDeleteHerramientaModal: ( state, { payload } ) => {
            const { modalType } = state;
            const { activeHerramienta } = payload;
            const herramientaMap = {
                objetivos: 'activeObjetivoModal',
                barreras: 'activeBarreraModal',
                ajustes: 'activeAjusteModal',
                evaluaciones: 'activeEvaluacionModal'
            }

            if (activeHerramienta) {
                state[modalType] = state[modalType].filter( herramienta => herramienta.id !== state[herramientaMap[modalType]].id );
                //state[activeHerramienta] = null; //TODO:OJO
            }
        },
        onLoadMateriasModal: ( state, { payload = [] } ) => {
            payload.forEach( materia => {
                const exist = state.materias.some( dbMateriaModal => dbMateriaModal.id === materia.id );
                if( !exist ) {
                    state.materias.push( materia )
                }   
            })
        },
        onResetHerramientas: ( state, { payload } ) => {
            state[payload] = [];
        },
        onInitActiveHerramientas: ( state ) => {
            state.activeObjetivoModal   = null;
            state.activeBarreraModal    = null;
            state.activeAjusteModal     = null;
            state.activeEvaluacionModal = null;
        }
    }
});

export const { 
    onSetModalType, 
    onSetFormVisible, 
    onSetSelectedRows,
    onSetMateriasModal,
    onUpdateMateriasModal,
    onUpdateHerramientasModal,
    onAddNewMateria,
    onSetActiveMateria,
    onSetActiveMateriaModal,
    onUpdateMateriaModal,
    onDeleteMateriaModal,
    onAddNewObjetivo,
    onAddNewBarrera,
    onAddNewAjuste,
    onAddNewEvaluacion,
    onUpdateObjetivoModal,
    onUpdateBarreraModal,
    onUpdateAjusteModal,
    onUpdateEvaluacionModal,
    onSetActiveObjetivoModal,
    onSetActiveBarreraModal,
    onSetActiveAjusteModal,
    onSetActiveEvaluacionModal,
    onDeleteHerramientaModal,
    onLoadMateriasModal,
    onResetHerramientas,
    onInitActiveHerramientas,
} = modalSlice.actions;