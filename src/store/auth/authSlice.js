import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoadingUsers: true,
        status: 'checking',
        user: {},
        errorMessage: undefined,
        users: [],
        profesores: [],
        userActive: null,
    },
    reducers: {
        onChecking: ( state ) => {
            state.status = 'checking';
            state.user = {};
            state.errorMessage = undefined;
        },
        onLogin: (state, { payload }) => {
            state.status = 'autheticated';
            state.user = payload;
            state.errorMessage = undefined;
        },
        onLogout: ( state, { payload } ) => {
            state.status = 'not-authenticated';
            state.user = {};
            state.errorMessage = payload;
        },
        clearErrorMessage: ( state ) => {
            state.errorMessage = undefined;
        },
        onLoadUsers: ( state, { payload = [] } ) => {
            state.isLoadingUsers = false;
            payload.forEach( user => {
                const exist = state.users.some( dbUser => dbUser.id === user.id );
                if( !exist ) {
                    state.users.push( user )
                }
            })
        },
        onSetActiveUser: ( state, { payload } ) => {
            state.userActive = payload;
        },
        onAddNewUser: ( state, { payload } ) => {
            const newUser = {
                id: payload.data,
                nombres: payload.nombres,
                apellidos: payload.apellidos,
                email: payload.email,
                fec_dil: new Date().toISOString(),
                rol: payload.rolName,
                id_Rol: payload.rol
            }
            state.users.push( newUser );
            state.userActive = null;  
        },
        onUpdateUser: ( state, { payload } ) => {
            const updateUser = {
                id: payload.id,
                nombres: payload.nombres,
                apellidos: payload.apellidos,
                email: payload.email,
                rol: payload.rolName,
                id_Rol: payload.rol
            }
            state.users = state.users.map( user => {
                if( user.id === updateUser.id ) {
                    return {
                        ...user,
                        nombres: payload.nombres,
                        apellidos: payload.apellidos,
                        rol: payload.rolName,
                        id_Rol: payload.rol
                    };
                }

                return user;
            });
            state.userActive = null;  
        },  
        onDeleteUser: ( state ) => {
            if ( state.userActive ) {
                state.users = state.users.filter( user => user.id !== state.userActive.id );
                state.userActive = null;
            }
        },
        onLoadProfesores: ( state, { payload } ) => {
            state.profesores = payload;
        }
    }
});

export const { onChecking, onLogin, onLogout, clearErrorMessage, onLoadUsers, onSetActiveUser, onDeleteUser, onUpdateUser, onAddNewUser, onLoadProfesores } = authSlice.actions;