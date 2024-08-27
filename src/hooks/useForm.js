import { useDispatch, useSelector } from "react-redux";
import { setFormState, setDateState, onAddNewPiarPt1, addHerramientas, setInitialFormState1, setInitialFormState2, deleteHerramientas } from '../store';
import { updateArrayItemProperty, returnIndex } from '../helpers';
import { addAndUpdateMaterias } from "../store/modal/thunks";
import Swal from "sweetalert2";
import { piarApi } from "../apis";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

export const useForm = () => {

    const dispatch = useDispatch();
    const { activeMateria } = useSelector(state => state.modal);
    const { formStates } = useSelector(state => state.piar);
    const { formState1, formState2, formState3, matsPiarState } = formStates;

    const onInputChange = ({ target }, formName) => {
        const { name, value, type } = target;
        let parsedValue;
        
        if (type === 'checkbox' || type === 'radio') {
            parsedValue = value === 'true' ? true : value === 'false' ? false : value;
        } else if (type === 'number') {
            parsedValue = Number(value);
        } else {
            parsedValue = value;
        }

        dispatch( setFormState({ name, value: parsedValue, formName }) );
    }

    const setInitialForm1 = () => {
        dispatch( setInitialFormState1() )
    };

    const setInitialForm2 = ( payload ) => {
        dispatch( setInitialFormState2( payload ) )
    };

    const onEffectChange = ( name, value, formName ) => {
        dispatch( setFormState({ name, value, formName }) )
    }

    const onDateChange = (event, changing, formName) => {
        const isoDateString = event.toISOString();
        dispatch( setDateState({ changing, isoDateString, formName }) );
    }

    const onTypeHeadChangeAuto = ( selected, name, formName ) => {
        const value = selected;
        dispatch( setFormState({ name, value, formName}) );
    }

    const onArrayInputChange = ({ target }, formName) => {
        const { name, value } = target;
        const prop = name.split('[')[0];
        const index = returnIndex( name );
        const updatedArrayItemProperty = updateArrayItemProperty( formStates[ formName ], name, value, index, prop );
        dispatch(setFormState({ name: prop, value: updatedArrayItemProperty, formName }));
    }

    const onNewInputChange = (type, prop, key_1, key_2, val, formName) => {
        const formState = formStates[formName];
        const newElement = {
          [key_1]: '',
          [key_2]: val
        };
        const newVal = type ? [...formState[prop], newElement] : formState[prop].slice(0, -1);
        dispatch(setFormState({ name: prop, value: newVal, formName }));
    };

    const deleteHerramientasPiar = async( payload ) => {
        const { herramientaId, tipoHerramienta } = payload;

        const urls = {
            'objetivos': '/objetivospiar',
            'barreras': '/barreraspiar',
            'ajustes': '/ajustespiar',
            'evaluaciones': '/evaluacionespiar'
        };

        const url = urls[tipoHerramienta];

        try {
            await piarApi.delete(`${url}/${herramientaId}`);
            dispatch( deleteHerramientas( payload ) );
            Toast.fire({
                icon: "info",
                title: "Eliminado"
            });
        } catch (error) {
            console.log(error);
            Swal.fire({ icon: 'error', title: 'Error', text: error.response.data.name, });
        }

    }

    const startSavingPiar = async( piar ) => {
        //TODO: Llegar al backend
        if ( piar.id ) {
            //Actualizando
        } else {
            //Creando
            dispatch(onAddNewPiarPt1({
                    ...piar,
                    id: new Date().getTime(),
                    est_piar: 'Pendiente'
                })
            )

            //TODO: retornar datos estudiante guardados en db junto con piarid para llenar formstatePT2
        }
    }

    const startSavingMateriasPiar = async ( materias ) => {
        const payload = {
            MateriasPiar: materias
        };
        try {
            Swal.fire({ title: 'Añadiendo materia...', text: 'Por favor, espere.', allowOutsideClick: false,
                didOpen: () => { Swal.showLoading(); }
            });
            const { data } = await piarApi.post('/materiaspiar', payload );
            const updatedMaterias = materias.map(( materia, index )=> ({
                ...materia,
                id: data[index],
                objetivos: [],
                barreras: [],
                ajustes: [],
                evaluaciones: []
            }));
            Toast.fire({
                icon: "success",
                title: "Materia añadida"
            });
            dispatch( addAndUpdateMaterias( updatedMaterias ) );
        } catch (error) {
            Swal.fire({icon: 'error',title: 'Error',text: error.response.data.name,});
            return false;
        }
    }

    const startSavingHerramientasPiar = async ( herramientas, materia, modalType ) => {
        const payload = {
            materia,
            herramientas,
            modalType
        };

        const urls = {
            'objetivos': '/objetivospiar',
            'barreras': '/barreraspiar',
            'ajustes': '/ajustespiar',
            'evaluaciones': '/evaluacionespiar'
        };

        const url = urls[modalType];

        const fieldMap = {
            'objetivos': { id: 'id_obj', sem: 'sem_obj' },
            'barreras': { id: 'id_barr', sem: 'sem_barr' },
            'ajustes': { id: 'id_ajt', sem: 'sem_ajt' },
            'evaluaciones': { id: 'id_eva', sem: 'sem_eva' }
        };

        const { id: idField, sem: semField } = fieldMap[modalType];

        const requestPayload = {
            [`${modalType.charAt(0).toUpperCase() + modalType.slice(1)}Piar`]: herramientas.map(herramienta => ({
                id_mat: activeMateria.id,
                [idField]: herramienta[idField],
                id_piar: herramienta.id_piar,
                [semField]: herramienta.sem_mat
            }))
        };

        try {
            const { data } = await piarApi.post(url, requestPayload);

            const updateHerramientas = herramientas.map((herramienta, index) => ({
                ...herramienta,
                id: data[index]
            }));

            const updatePayload = {
                ...payload,
                herramientas: updateHerramientas
            };

            dispatch( addHerramientas( updatePayload ) );
            
            Toast.fire({
                icon: "success",
                title: "Añadido"
            });
        } catch (error) {
            Swal.fire({icon: 'error',title: 'Error',text: error.response.data.name,});
            return false;
        }
    }

    return {
        formState1,
        formState2,
        formState3,
        matsPiarState,
        onInputChange,
        onEffectChange,
        onDateChange,
        onTypeHeadChangeAuto,
        onArrayInputChange,
        onNewInputChange,
        startSavingPiar,
        startSavingMateriasPiar,
        startSavingHerramientasPiar,
        setInitialForm1,
        setInitialForm2,
        deleteHerramientasPiar
    }
}
