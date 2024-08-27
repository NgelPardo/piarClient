import { useAuthStore, useModalStore, useUiStore } from "../hooks";

export const useModal = () => {


    const {
        closeModalAjuste,
        openModalAjuste,
        isAjusteModalOpen,
        isUsersModalOpen,
        isDeleteModalOpen,
        openModalDelete,
        closeModalDelete,
        openModalUsers,
        closeModalUsers,
    } = useUiStore();
    
    const { setActiveMateria, setFormVisible, setModalType } = useModalStore();

    const { setActiveUser } = useAuthStore();

    const onClickOpenModal = ( tipo, tittle ) => {
        //TODO: Manejar informacion para modal materias o objetivos o evaluaciones etc
        if (tipo === 'ajustes') {
            openModalAjuste();
        }
        if (tipo === 'delete') {
            openModalDelete();
        }
        if (tipo === 'users') {
            openModalUsers( tittle );
        }
        
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';
        document.body.appendChild(backdrop);
        const backdrop2 = document.createElement('div');
        backdrop2.className = 'modal-backdrop fade show';
        document.body.appendChild(backdrop2);
    }

    const onClickCloseModal = ( tipo ) => {
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach((backdrop) => {
            document.body.removeChild(backdrop);
        });

        if (tipo === 'ajustes') {
            closeModalAjuste();
            setActiveMateria([]);
            setModalType(null);
        }
        if (tipo === 'delete') {
            closeModalDelete();
            //setActiveMateria([]);
            setActiveUser({});
        }
        if (tipo === 'users') {
            closeModalUsers();
            setActiveUser(null);
        }
        setFormVisible(false);
    
    }

    const handleClickOutside = ( ref, { target }) => {
        if (ref.current && !ref.current.contains( target ) && target.classList.value === 'modal fade show' ){
            if (target.id === 'modalAjustes') {
                onClickCloseModal('ajustes');
            }
            if (target.id === 'modalDelete') {
                onClickCloseModal('delete');
                setActiveMateria([]);
            }
            if (target.id === 'modalUsers') {
                onClickCloseModal('users');
            }
        }
    };

    const stylesIsOpen = ( ref ) => {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '17px';
        document.body.classList.add('modal-open');
        document.addEventListener('click', (e) => handleClickOutside( ref, e ));
    };

    const stylesIsClose = ( ref ) => {
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.body.classList.remove('modal-open');
        document.removeEventListener('click', (e) => handleClickOutside( ref, e ));
    };

    return {
        onClickOpenModal,
        onClickCloseModal,
        stylesIsOpen,
        stylesIsClose,
        isAjusteModalOpen,
        isUsersModalOpen,
        isDeleteModalOpen,
    }

}