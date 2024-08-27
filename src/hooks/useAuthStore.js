import { jwtDecode } from "jwt-decode";

import { useDispatch, useSelector } from "react-redux"
import { piarApi } from "../apis";
import { clearErrorMessage, onAddNewUser, onChecking, onDeleteUser, onLoadProfesores, onLoadUsers, onLogin, onLogout, onSetActiveUser, onUpdateUser } from "../store";
import Swal from "sweetalert2";


export const useAuthStore = () => {

    const { status, user, errorMessage, users, userActive, profesores } = useSelector( state => state.auth );
    const dispatch = useDispatch();

    const startLogin = async ({ email, password }) => {
        dispatch( onChecking() );
        try {
            const { data } = await piarApi.post('/users/login', { email, password });
            localStorage.setItem('token', data);
            const decoded = jwtDecode(data);
            dispatch(onLogin(
                { 
                    name: decoded.name, 
                    uid: decoded.sub, 
                    permissions: decoded.permissions,
                    roles: decoded.roles
                }
            ));

        } catch (error) {
            dispatch( onLogout("Credenciales incorrectas") );
            setTimeout(() => {
                dispatch( clearErrorMessage() );
            }, 100);
        }
    }

    const startSavingUser = async ( user ) => {
        try {
            const rolName =
                user.rol === "1" ? "SuperAdmin" :
                user.rol === "2" ? "Admin" :
                user.rol === "3" ? "Profesor" :
                user.rol === "4" ? "Auxiliar" :
                "Desconocido";
            if (user.id) {
                Swal.fire({ title: 'Actualizando usuario...', text: 'Por favor, espere.', allowOutsideClick: false,
                    didOpen: () => { Swal.showLoading(); }
                });
                await piarApi.put(`/users/${user.id}`, {
                    Nombre: user.nombres,
                    Apellido: user.apellidos,
                    Rol: parseInt(user.rol, 10)
                });
                dispatch( onUpdateUser({ ...user, rolName }) );
                Swal.fire({icon: 'success',title: 'Usuario actualizado',text: 'El usuario se ha actualizado correctamente.',});
                return true;
            }
            Swal.fire({ title: 'Registrando usuario...', text: 'Por favor, espere.', allowOutsideClick: false,
                didOpen: () => { Swal.showLoading(); }
            });
            const { data } = await piarApi.post('/users/register',
                {
                    Email: user.email, 
                    Nombre: user.nombres, 
                    Apellido: user.apellidos, 
                    Password: user.password, 
                    Rol: parseInt(user.rol, 10)
                });
            dispatch( onAddNewUser({ ...user, data, rolName }) );
            Swal.fire({icon: 'success',title: 'Usuario registrado',text: 'El usuario se ha registrado correctamente.',});
            return true;
        } catch (error) {
            Swal.fire({icon: 'error',title: 'Error',text: error.response.data.name,});
            return false;
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if ( !token ) return dispatch( onLogout() );
        const decoded = jwtDecode(token);
            dispatch(onLogin(
                { 
                    name: decoded.name, 
                    uid: decoded.sub, 
                    permissions: decoded.permissions,
                    roles: decoded.roles
                }
            ));
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogout() );
    }

    const startLoadingUsers = async() => {
        try {
            const { data } = await piarApi.get('/users');
            dispatch( onLoadUsers( data ) );
        } catch (error) {
            console.log('Error cargando eventos');
            console.log(error);
        }
    }

    const startLoadingProfesores = async () => {
        try {
            const { data } = await piarApi.get('/users/profesores');
            dispatch( onLoadProfesores(data) );
        } catch (error) {
            console.log(error)
        }
    }

    const startDeletingUser = async () => {
        try {
            await piarApi.delete(`/users/${ userActive.id }`);
            dispatch( onDeleteUser() );
            Swal.fire({icon: 'success',title: 'Usuario eliminado',text: 'El usuario ha sido eliminado exitosamente.',});
        } catch (error) {
            console.log(error);
            Swal.fire({ icon: 'error', title: 'Error', text: error.response.data.name, });
        }
    }

    const setActiveUser = ( userActive ) => {
        dispatch( onSetActiveUser( userActive ) )
    }


    return {
        //Propiedades
        status, 
        user, 
        errorMessage,
        users,
        userActive,
        profesores,
        //Metodos
        checkAuthToken,
        startLogin,
        startLogout,
        startSavingUser,
        startLoadingUsers,
        setActiveUser,
        startDeletingUser,
        startLoadingProfesores,
    }

}
