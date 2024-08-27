import { useEffect, useRef, useState } from "react";
import { ControlPanel, FilterSearch } from "../components"
import { PiarLayout } from "../layout/PiarLayout"
import { usePiarStore } from "../../hooks";

export const FormPage = () => {
  const containerRef = useRef(null);
  const [ filterWidthState, setFilterWidthState ] = useState( 0 );
  const { startLoadingPiars, isLoadingPiarPt1 } = usePiarStore();

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
    startLoadingPiars();
  }, []);
  
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
            <ControlPanel/>
          </div>
        </div>
      </div>
      {
        isLoadingPiarPt1 ? (
          <div className="spinner-overlay">
            <div className="spinner-container">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        ) : <></>
      }
    </PiarLayout>
  )
}
