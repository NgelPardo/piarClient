import {
  flexRender,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useMemo } from "react";
import { usePiarStore } from "../../hooks";

export const TableMobile = ({ columnDef, data }) => {
  
  const { searchState, setSearchPiar } = usePiarStore();
  const finalData = useMemo(() => data, []);
  const finalColumnDef = useMemo(() => columnDef, []);

  const tableInstance = useReactTable({
    columns: finalColumnDef,
    data: finalData,
    getCoreRowModel: getCoreRowModel(),
    onGlobalFilterChange: setSearchPiar,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: searchState,
    }
  });
  return (
    <div className="table-responsive">
      {tableInstance.getRowModel().rows.map((rowElement) => {
        return (
          <div key={rowElement.id} className="fila">
            {rowElement.getVisibleCells().map( cellElement => {
              if (cellElement.column.id === "fechaCreacion") {
                const date = cellElement.row.original.fechaCreacion;
                const formattedDate = new Date(date).toLocaleDateString(
                  "en-US",
                  { year: "numeric", month: "2-digit", day: "2-digit" }
                );
                return (
                  <div key={cellElement.id} className="columna">
                    <div className="header">{ cellElement.column.columnDef.header }</div>
                    <div className="contenido" key={cellElement.id}>{formattedDate}</div>
                  </div>
                );
              } else {
                return (
                  <div key={cellElement.id} className="columna">
                    <div className="header">{ cellElement.column.columnDef.header }</div>
                    <div className="contenido" key={cellElement.id}>
                      {flexRender(
                        cellElement.column.columnDef.cell,
                        cellElement.getContext()
                      )}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};
