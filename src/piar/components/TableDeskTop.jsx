import { 
  flexRender, 
  useReactTable, 
  getCoreRowModel, 
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"
import { useEffect, useMemo, useState } from "react";

import { useModalStore, usePiarStore, useUiStore } from "../../hooks";
import "./Table.css";

export const TableDeskTop = ({ columnDef, data }) => {

  const [ rowSelection, setRowSelection ] = useState({});
  const { setIsSelectedRow } = useUiStore();
  const { searchState, setSearchPiar } = usePiarStore();
  const { setSelectedRows } = useModalStore();

  const finalData = useMemo(() => data, [data]);
  const finalColumnDef = useMemo(() => columnDef, [columnDef]);
  const [sorting, setSorting] = useState([]);

  const tableInstance = useReactTable({
      columns: finalColumnDef,
      data: finalData,
      initialState: {
        columnVisibility: {
          id: false,
          id_Rol: false,
          id_uss: false,
        },
      },
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      state: {
        sorting,
        globalFilter: searchState,
        rowSelection: rowSelection,
      },
      onSortingChange: setSorting,
      onGlobalFilterChange: setSearchPiar,
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onRowSelectionChange: setRowSelection,
      enableRowSelection: true,
  });

  useEffect(() => {
    const rows = tableInstance.getSelectedRowModel().flatRows.map(row => row.original);
    if (tableInstance.getSelectedRowModel().rows.length > 0) {
      setIsSelectedRow(true)
    } else {
      setIsSelectedRow(false)
    }
    setSelectedRows( rows )
  }, [tableInstance.getSelectedRowModel()]);

  useEffect(() => {
    setRowSelection({});  
  }, [data]);
    

  return (
    <>
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          { tableInstance.getHeaderGroups().map( headerElement => {
            return <tr key={ headerElement.id }>{ headerElement.headers.map( columnElement => {
              return (
                <th 
                  key={ columnElement.id } 
                  colSpan={ columnElement.colSpan } 
                  onClick={ columnElement.column.getToggleSortingHandler() }
                  style={{ cursor: 'pointer' }}
                >
                  { flexRender(
                    columnElement.column.columnDef.header,
                    columnElement.getContext()
                  ) }
                  {(() => {
                    const sorting = columnElement.column.getIsSorted();
                    if (sorting.length > 0) {
                      return (
                        <div className="d-inline-flex" style={{ marginLeft: "5px" }}>
                          {sorting === 'desc' ? (
                            <i className="fa-solid fa-sort-down"></i>
                          ) : (
                            <i className="fa-solid fa-sort-up"></i>
                          )}
                        </div>
                      );
                    } else {
                      return (
                        <div className="d-inline-flex" style={{ marginLeft: "5px" }}>
                          <i className="fa-solid fa-sort"></i>
                        </div>
                      );
                    }
                  })()}
                </th>
              )
            }) }</tr>
          })}
        </thead>
        <tbody>
          { tableInstance.getRowModel().rows.map(rowElement => {
            return <tr key={ rowElement.id }>
              { rowElement.getVisibleCells().map( cellElement => {
                return <td key={ cellElement.id }>
                  { flexRender(cellElement.column.columnDef.cell, cellElement.getContext() ) }
                </td>
              }) }
            </tr>
            }) }
        </tbody>
      </table>
    </div>
    <hr />
    <div className="adm-page">
      <button 
        onClick={() => tableInstance.previousPage() } 
        disabled={ !tableInstance.getCanPreviousPage() }
        className="btn-prev"
      >
        {"<"}
      </button>
      <span style={{ fontSize: "12px" }}>
        {tableInstance.getState().pagination.pageIndex + 1} de{" "} {tableInstance.getPageCount()}
      </span>
      <button 
        onClick={() => tableInstance.nextPage() }
        disabled={ !tableInstance.getCanNextPage() }
        className="btn-next"
      >
        {">"}
      </button>
    </div>
    </>
  )
}
