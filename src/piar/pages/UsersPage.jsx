import { useEffect, useRef, useState } from "react";
import { PiarLayout } from "../layout/PiarLayout"
import { ControlPanelUsers, FilterSearch, ModalDeleteUser, ModalUsers } from "../components";
import { useAuthStore } from "../../hooks";

export const UsersPage = () => {
  const containerRef = useRef(null);
  const [ filterWidthState, setFilterWidthState ] = useState( 0 );
  
  const { startLoadingUsers } = useAuthStore();

  const handleResizeFilter = (entries) => {
    const newFilterWidth = entries[0].contentRect.width;
    setFilterWidthState(newFilterWidth);
  };

  useEffect(() => {
    const container = containerRef.current;
    const resizeObserver = new ResizeObserver(handleResizeFilter);
    resizeObserver.observe(container);
    return () => {
      resizeObserver.disconnect();
    }
  }, []);
  
  useEffect(() => {
    startLoadingUsers();
  }, [])
  

  return (
    <PiarLayout>
      <div className="container-fluid">
        <div className="row">      
          <div className="col-md-3 order-md-2 bg-body-tertiary container-search" ref={containerRef}>
            <FilterSearch 
              filterWidthState={filterWidthState}
            />
          </div>
          <div className="col-md-9 order-md-1">
            <ControlPanelUsers/>
          </div>
        </div>
      </div>
      <ModalUsers/>
      <ModalDeleteUser/>
    </PiarLayout>
  )
}
