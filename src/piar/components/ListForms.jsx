import { useNavigate } from "react-router-dom"
import { usePiarStore, useUiStore } from "../../hooks"
import { getColumnDef } from "./columnsFormDefs"
import './ListForm.css'
import { TableDeskTop } from "./TableDeskTop"
import { TableMobile } from "./TableMobile"

export const ListForms = () => {

  const navigate = useNavigate();

  const { windowWidth } = useUiStore();
  const { piars, startLoadingPiarPt1ById } = usePiarStore();

  const handleEdit = async( piar ) => {
    await startLoadingPiarPt1ById( piar.id );
    navigate('/piar');
  }

  const handleDelete = ( piar ) => {
    console.log( piar )
  }

  const columnDef = getColumnDef(handleEdit, handleDelete);

  return (
    <div className="container">
      {
        piars.length === 0 ? (
          <div className="col-12 text-center">
            <p>No se encontraron elementos.</p>
          </div>
        ): (
          windowWidth < 780 ? (
            <TableMobile 
              columnDef={ columnDef } 
              data={ piars }
            />
          ) : (
            <TableDeskTop 
              columnDef={ columnDef } 
              data={ piars }
            />
          ) 
        )
      }
    </div>
  )
}
