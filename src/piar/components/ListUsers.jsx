import { useAuthStore, useModal, useModalStore, useUiStore } from "../../hooks"
import { getColumnDefUsers } from "../../helpers"
import './ListForm.css'
import { TableDeskTop } from "./TableDeskTop"
import { TableMobile } from "./TableMobile"
import { useEffect, useRef } from "react"

export const ListUsers = () => {

  const btnDeleteUser = useRef(null);

  const { windowWidth, setInputDisabled } = useUiStore();
  const { onClickOpenModal, isDeleteModalOpen, stylesIsOpen, stylesIsClose } = useModal();
  const { users, setActiveUser } = useAuthStore();
  const { setTittleModal } = useModalStore();

  const handleEdit = ( user ) => {
    setActiveUser( user );
    setTittleModal( 'Modificar Usuario' );
    setInputDisabled( true );
    onClickOpenModal( 'users' );
  };

  const handleDelete = ( user ) => {
    onClickOpenModal('delete');
    setActiveUser( user );
  };

  const columnDefUsers = getColumnDefUsers(handleEdit, handleDelete, btnDeleteUser);
  
  useEffect(() => {
    if ( isDeleteModalOpen ) {
      stylesIsOpen( btnDeleteUser );
    } else {
      stylesIsClose( btnDeleteUser );
    }
    return () => {
        stylesIsClose( btnDeleteUser );
    };
  }, [isDeleteModalOpen]);

  return (
    <div className="container">
      { windowWidth < 780 ? (
        <TableMobile 
          columnDef={ columnDefUsers } 
          data={ users }
        />
      ) : (
        <TableDeskTop 
          columnDef={ columnDefUsers } 
          data={ users }
        />
      )}
    </div>
  )
}
