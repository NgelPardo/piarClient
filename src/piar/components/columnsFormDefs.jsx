export const getColumnDef = ( handleEdit, handleDelete, btnDeletePiar ) => [
    {
        accessorKey: 'id',
        header: 'ID Estudiante'
    },
    {
        accessorKey: 'nomEst',
        header: 'Nombre'
    },
    {
        accessorKey: 'docEst',
        header: 'Identificacion'
    },
    {
        accessorKey: 'fecDil',
        header: 'Fecha Creacion'
    },
    {
        accessorKey: 'estPiar',
        header: 'Estado'
    },
    {
        accessorKey: 'ultGrado',
        header: 'Curso'
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
                        ref={ btnDeletePiar }
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
        );
        },
    },

]