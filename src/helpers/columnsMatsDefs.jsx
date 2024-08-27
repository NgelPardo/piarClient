import { IndeterminateCheckbox } from "../piar/components";

export const getColumnDefMats = ( handleEdit, handleDelete ) => [
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
    header: "ID Materia",
  },
  {
    accessorKey: "nom_mat",
    header: "Nombre Materia",
  },
  {
    accessorKey: "grd_mat",
    header: "Grado",
  },
  {
    accessorKey: "id_uss",
    header: "Usuario",
  },
  {
    accessorKey: "id_prof",
    header: "Profesor",
  },
  {
    accessorKey: "fec_dig",
    header: "Fecha Creacion",
    cell: ({ getValue }) => {
      const isoDate = getValue();
      const date = new Date(isoDate);
      if (isNaN(date.getTime())) {
        return "Fecha inválida";
      }
      const formattedDate = date.toLocaleString('es-CO', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',  
        second: '2-digit',
        hour12: true,
      });
      return formattedDate;
    }
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
