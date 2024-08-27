import { IndeterminateCheckbox } from "../piar/components";

export const getColumnDefBarrs = ( handleEdit, handleDelete ) => [
  {
    id: "select",
    header: ({ table }) => (
      <IndeterminateCheckbox
        {...{
          checked: table.getIsAllRowsSelected(),
          indeterminate: table.getIsSomeRowsSelected(),
          onChange: table.getToggleAllRowsSelectedHandler(),
        }}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "ID Barrera",
  },
  {
    accessorKey: "desc_barr",
    header: "Descripción",
  },
  {
    accessorKey: "fec_dil",
    header: "Fecha Creacion",
  },
  {
    accessorKey: "actions",
    header: "Acciones",
    cell: ({ row }) => {
      return (
        <div className="container">
          <div className="row">
            <div className="col">
              <button 
                type="button" 
                className="btn btn-danger p-1" 
                title="Eliminar"
                onClick={() => handleDelete(row.original)}
              >
                <i className="fa-solid fa-trash fa-sm"></i>
              </button>
            </div>
            <div className="col px-1">
              <button 
                type="button" 
                className="btn btn-primary p-1" 
                title="Editar"
                onClick={() => handleEdit(row.original)}
              >
                <i className="fa-solid fa-file-pen fa-sm"></i>
              </button>
            </div>
          </div>
        </div>
      )
    }
  },
];
