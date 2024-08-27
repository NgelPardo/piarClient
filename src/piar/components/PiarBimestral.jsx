import { useEffect } from "react";
import { usePiarStore } from "../../hooks";
import { TablaAjustes } from "./TablaAjustes"

export const PiarBimestral = () => {

  const { setPeriodo, periodo } = usePiarStore();

  useEffect(() => {
    const validPeriods = ['b1', 'b2', 'b3', 'b4'];
    if (!validPeriods.includes(periodo)) {
      setPeriodo('b1');
    }
  }, [periodo, setPeriodo]);

  const handleBimestre = ( bimestre ) => {
      setPeriodo( bimestre )
  }

  return (
    <>
      <ul className="nav nav-tabs ul-ajustes">
        <li className="nav-item">
          <button className={`nav-link ${ periodo === 'b1' ? "active-btn" : 'bg-light-table-ajuste'}`} onClick={ () => handleBimestre( 'b1' ) }><span>Primer Bimestre</span></button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${ periodo === 'b2' ? "active-btn" : 'bg-light-table-ajuste'}`} onClick={ () => handleBimestre( 'b2' ) }><span>Segundo Bimestre</span></button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${ periodo === 'b3' ? "active-btn" : 'bg-light-table-ajuste'}`} onClick={ () => handleBimestre( 'b3' ) }><span>Tercer Bimestre</span></button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${ periodo === 'b4' ? "active-btn" : 'bg-light-table-ajuste'}`} onClick={ () => handleBimestre( 'b4' ) }><span>Cuarto Bimestre</span></button>
        </li>
      </ul>
      <TablaAjustes/>    
    </>
  )
}
