import { useDispatch, useSelector } from "react-redux"
import {
    onCloseAjusteModal, 
    onOpenAjusteModal, 
    onOpenSideBar, 
    onSetIsRowSelected, 
    setParteActualState, 
    onOpenDeleteModal, 
    onCloseDeleteModal,
    onOpenUsersModal,
    onCloseUsersModal,
    onSetInputDisabled,
} from "../store";

export const useUiStore = () => {

    const dispatch = useDispatch();
    
    const {
        isSideBarOpen,
        windowWidth,
        isAjusteModalOpen,
        isDeleteModalOpen,
        isRowSelected,
        parteActual,
        isUsersModalOpen,
        tittleModal,
        isInputDisabled,
    } = useSelector( state => state.ui );

    const openSideBar = () => {
        dispatch( onOpenSideBar() )
    }

    const openModalAjuste = () => {
        dispatch( onOpenAjusteModal() )
    }

    const closeModalAjuste = () => {
        dispatch( onCloseAjusteModal() )
    }

    const openModalDelete = () => {
        dispatch( onOpenDeleteModal() )
    }

    const closeModalDelete = () => {
        dispatch( onCloseDeleteModal() )
    }

    const setIsSelectedRow = ( isSelected ) => {
        dispatch( onSetIsRowSelected( isSelected ) )
    }

    const setParteActual = ( nextSection ) => {
        dispatch( setParteActualState( nextSection ));
    }

    const openModalUsers = () => {
        dispatch( onOpenUsersModal() )
    }

    const closeModalUsers = () => {
        dispatch( onCloseUsersModal() )
    }

    const setInputDisabled = ( isDisabled ) => {
        dispatch( onSetInputDisabled( isDisabled ) )
    }

    return {
        //Propiedades
        isSideBarOpen,
        windowWidth,
        isAjusteModalOpen,
        isRowSelected,
        parteActual,
        isDeleteModalOpen,
        isUsersModalOpen,
        tittleModal,
        isInputDisabled,
        //Metodos
        openSideBar,
        openModalAjuste,
        closeModalAjuste,
        setIsSelectedRow,
        setParteActual,
        openModalDelete,
        closeModalDelete,
        openModalUsers,
        closeModalUsers,
        setInputDisabled,
    }

}