export const getColumnDefUsers = ( handleEdit, handleDelete, btnDeleteUser ) => [
  
  {
    accessorKey: "id",
    header: "Id",
  },{
    accessorKey: "nombres",
    header: "Nombres",
  },
  {
    accessorKey: "apellidos",
    header: "Apellidos",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "rol",
    header: "Rol",
  },
  {
    accessorKey: "fec_Dil",
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
            <div className="col px-1">
              <button 
                type="button" 
                className="btn btn-danger p-1" 
                title="Eliminar"
                onClick={() => handleDelete(row.original)}
                ref={ btnDeleteUser }
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
            <div className="col px-1">
              <button 
                type="button" 
                className="btn btn-secondary p-1" 
                title="restablecer contraseña"
                onClick={() => handleEdit(row.original)}
              >
                <i className="fa-solid fa-arrows-rotate fa-sm"></i>
              </button>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "id_Rol",
    header: "IdRol"
  },
];
