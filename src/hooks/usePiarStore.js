import { useDispatch, useSelector } from "react-redux"
import { setSearchState, setDeptosState, setMunisState, setPeriodoState, deleteMaterias, onLoadPiars, onAddNewPiarPt1, setIdPiarMatsPiar, onLoadMateriasPiar, onLoadPiarPt1, setLoadingPiarPt1, setPiarPt3Active, setPiarPt4Active, setLoadingPiars } from "../store";
import { deptosApi, piarApi } from '../apis';
import { separateDeptos, separateMunis } from "../helpers";
import Swal from "sweetalert2";

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

export const usePiarStore = () => {

    const dispatch = useDispatch();

    const {
        parteActual
    } = useSelector( state => state.ui );
    
    const {
        activeMateria
    } = useSelector( state => state.modal );

    const {
        searchState,
        piars,
        deptos,
        munis,
        periodo,
        formStates,
        isLoadingMateriasPiar,
        isLoadingPiarPt1,
        isLoadingPiars,
        piarPt3Active,
        piarPt4Active
    } = useSelector( state => state.piar );
    
    const { user } = useSelector( state => state.auth );

    const setSearchPiar = ({ target }) => {
        dispatch( setSearchState( target.value ) )
    };

    const setPeriodo = ( periodoAcademico ) => {
        dispatch( setPeriodoState( periodoAcademico ))
    };

    const startLoadingDeptos = async() => {
        try {
            const { data } = await deptosApi.get();
            const deptos = separateDeptos( data );
            dispatch( setDeptosState( deptos ) );
        } catch (error) {
            console.log(error);
        }
    }

    const startLoadingMunis = async() => {
        try {
            const { data } = await deptosApi.get();
            const munis = separateMunis( data );
            dispatch( setMunisState( munis ) );
        } catch (error) {
            console.log(error);
        }
    }

    const startSavingPiar = async ( piar ) => {
        try {
            if( piar.id ) {
                Swal.fire({ title: 'Actualizando piar...', text: 'Por favor, espere.', allowOutsideClick: false,
                    didOpen: () => { Swal.showLoading(); }
                });

                let data;

                switch ( parteActual ) {
                    case 1:
                        data = await piarApi.put(`/piars/pt1/${ piar.id }`, piar );
                        Swal.fire({ icon: 'success', title: 'Piar Actualizado', text: 'Guardado correctamete.', });
                        break;
                    case 2:
                        data = await piarApi.put(`/piars/pt2/${ piar.id }`,{
                            ...piar,
                            docs_ela: JSON.stringify( piar.docs_ela )
                        });
                        Swal.fire({ icon: 'success', title: 'Piar Actualizado', text: 'Guardado correctamete.', });
                        dispatch(setIdPiarMatsPiar( data.data ));
                        break;
                    case 4:
                        data = await piarApi.put(`/piars/pt3/${ piar.id }`, piar );
                        Swal.fire({ icon: 'success', title: 'Piar Actualizado', text: 'Guardado correctamete.', });
                        break;
                    case 5:
                        data = await piarApi.put(`piars/pt4/${ piar.id }`, piar);
                        Swal.fire({ icon: 'success', title: 'Piar Guardado', text: 'Guardado correctamete.', });
                        break;
                    default:
                        break;
                }
                
                return data;
            } 
            Swal.fire({ title: 'Creando piar...', text: 'Por favor, espere.', allowOutsideClick: false,
                didOpen: () => { Swal.showLoading(); }
            });
            const { data } = await piarApi.post('/piars/crear',
                {
                    ...piar,
                    depa_est: piar.depa_est[0],
                    mun_est: piar.mun_est[0].municipio,
                    cual_ter_med: JSON.stringify( piar.cual_ter_med ),
                    meds_frecuencia: JSON.stringify( piar.meds_frecuencia ),
                    idUss: user.uid,
                    idProf: user.uid
                });
            dispatch(onAddNewPiarPt1(
                {
                    id: data, nomEst: piar.nom_est, docEst: piar.doc_est,
                    fecDil: piar.fec_dil, estPiar: 2, ultGrado: piar.ult_grad
                }
            ));
            Swal.fire({icon: 'success',title: 'Piar Creado',text: 'Anexo 1 correctamete guardado.',});
            return data;
        } catch (error) {
            Swal.fire({icon: 'error',title: 'Error',text: error.response.data.name,});
            return false;
        }

    }

    const startLoadingPiars = async () => {
        setLoadingPiars( true );
        try {
            const endpoint = user.roles === 'Profesor' ? `/piars/profesor/${user.uid}` : '/piars';
            const { data } = await piarApi.get(endpoint);
            dispatch( onLoadPiars( data ) );
            setLoadingPiars( false );
        } catch (error) {
            console.log('Error cargando piars');
            console.log(error)
            setLoadingPiars( false );
        }
    }

    const startLoadingMateriasPiar = async() => {
        const idPiar = formStates.matsPiarState.id ? formStates.matsPiarState.id : 'b2d0516a-3308-4f43-bc50-d2efaf712276';
        try {
            const { data } = await piarApi.get(`/materiaspiar/${ idPiar }`);
            dispatch( onLoadMateriasPiar( data ) )
        } catch (error) {
            console.log('Error cargando materias');
            console.log(error)
        }
    }

    const startLoadingPiarPt1ById = async( idPiar ) => {
        dispatch( setLoadingPiarPt1( true ) );
        try {
            const { data } = await piarApi.get(`/piars/pt1/${ idPiar }`);
            dispatch( onLoadPiarPt1( data ) );
            dispatch( setLoadingPiarPt1( false ) );
        } catch (error) { 
            console.log('Error cargando piar');
            console.log(error);
            dispatch( setLoadingPiarPt1( false ) );
        }
    }

    const startLoadingPiarPt2ById = async( idPiar ) => {
        try {
            const { data } = await piarApi.get(`/piars/pt2/${ idPiar }`);
            return data;
        } catch (error) {
            console.log('Error cargando piar');
            console.log(error);
        }
    }

    const startLoadingPiarPt3ById = async( idPiar ) => {
        try {
            const { data } = await piarApi.get(`/piars/pt3/${ idPiar }`);
            dispatch( setPiarPt3Active( data ) );
            return data;
        } catch (error) {
            console.log('Error cargando piar');
            console.log(error);
        }
    }

    const startLoadingPiarPt4ById = async( idPiar ) => {
        try {
            const { data } = await piarApi.get(`/piars/pt4/${ idPiar }`);
            dispatch( setPiarPt4Active( data ) );
            return data;
        } catch (error) {
            console.log('Error cargando piar');
            console.log(error);
        }
    }

    const deleteMateriaPiar = async() => {
        try {
            await piarApi.delete(`/materiaspiar/${ activeMateria.id }`);
            dispatch( deleteMaterias() );
            Toast.fire({
                icon: "info",
                title: "Materia eliminada"
            });
        } catch (error) {
            console.log(error);
            Swal.fire({ icon: 'error', title: 'Error', text: error.response.data.name, });
        }
    }

    return {
        //Propiedades
        piars,
        searchState,
        deptos,
        munis,
        periodo,
        isLoadingMateriasPiar,
        isLoadingPiarPt1,
        piarPt3Active,
        piarPt4Active,
        isLoadingPiars,
        //Metodos
        setSearchPiar,
        startLoadingDeptos,
        startLoadingMunis,
        setPeriodo,
        deleteMateriaPiar,
        startLoadingPiars,
        startSavingPiar,
        startLoadingMateriasPiar,
        startLoadingPiarPt1ById,
        startLoadingPiarPt2ById,
        startLoadingPiarPt3ById,
        startLoadingPiarPt4ById
    }
}