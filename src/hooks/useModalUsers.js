import { useUiStore } from ".";

export const useModalUsers = () => {

    const { isUsersModalOpen, openModalUsers, closeModalUsers } = useUiStore();

    const onClickOpenModal = ( ) => {
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop fade show';
        document.body.appendChild(backdrop);
        const backdrop2 = document.createElement('div');
        backdrop2.className = 'modal-backdrop fade show';
        document.body.appendChild(backdrop2);
    }

    const onClickCloseModal = ( ) => {
        const backdrops = document.querySelectorAll('.modal-backdrop');
        backdrops.forEach((backdrop) => {
            document.body.removeChild(backdrop);
        });
    }

    const handleClickOutside = ( ref, { target }) => {
        if (ref.current && !ref.current.contains(target) && target.classList.value === 'modal fade show') {
            onClickCloseModal();
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
        isUsersModalOpen,
    }

}