
import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isSideBarOpen: false,
        windowWidth: window.innerWidth,
        isAjusteModalOpen: false,
        isDeleteModalOpen: false,
        isRowSelected: false,
        parteActual: 1,
        isUsersModalOpen: false,
        tittleModal: '',
        isInputDisabled: false,
    },
    reducers: {
        onOpenSideBar: ( state ) => {
            state.isSideBarOpen = !state.isSideBarOpen;
        },
        onOpenAjusteModal: ( state ) => {
            state.isAjusteModalOpen = true;
        },
        onCloseAjusteModal: ( state ) => {
            state.isAjusteModalOpen = false;
        },
        onSetIsRowSelected: ( state, { payload } ) => {
            state.isRowSelected = payload;
        },
        onOpenDeleteModal: ( state ) => {
            state.isDeleteModalOpen = true;
        },
        onCloseDeleteModal: ( state ) => {
            state.isDeleteModalOpen = false;
        },
        setParteActualState: ( state, { payload } ) => {
            state.parteActual = payload;
        },
        onOpenUsersModal: ( state ) => {
            state.isUsersModalOpen = true;
        },
        onCloseUsersModal: ( state ) => {
            state.isUsersModalOpen = false;
        },
        onSetTittleModal: ( state, { payload } ) => {
            state.tittleModal = payload
        },
        onSetInputDisabled: ( state, { payload } ) => {
            state.isInputDisabled = payload
        },
    }
});

export const { 
    onOpenSideBar, 
    setWindowWidth, 
    onOpenAjusteModal, 
    onCloseAjusteModal, 
    onSetIsRowSelected, 
    setParteActualState, 
    setRowSelection,
    onOpenDeleteModal,
    onCloseDeleteModal,
    onOpenUsersModal,
    onCloseUsersModal,
    onSetTittleModal,
    onSetInputDisabled,
} = uiSlice.actions;