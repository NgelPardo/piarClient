import { useEffect } from "react";
import { TablaAjustes } from "./";
import { usePiarStore } from "../../hooks";

export const PiarTrimestral = () => {

    const { setPeriodo, periodo } = usePiarStore();

    useEffect(() => {
        const validPeriods = ['t1', 't2', 't3'];
        if (!validPeriods.includes(periodo)) {
        setPeriodo('t1');
        }
    }, [periodo, setPeriodo]);

    const handleTrimestre = ( trimestre ) => {
        setPeriodo( trimestre )
    }

  return (
    <>
        <ul className="nav nav-tabs ul-ajustes">
            <li className="nav-item">
                <button className={`nav-link ${ periodo === 't1' ? "active-btn" : 'bg-light-table-ajuste'}`} onClick={ () => handleTrimestre( 't1' ) }><span>Primer Trimestre</span></button>
            </li>
            <li className="nav-item">
                <button className={`nav-link ${ periodo === 't2' ? "active-btn" : 'bg-light-table-ajuste'}`} onClick={ () => handleTrimestre( 't2' ) }><span>Segundo Trimestre</span></button>
            </li>
            <li className="nav-item">
                <button className={`nav-link ${ periodo === 't3' ? "active-btn" : 'bg-light-table-ajuste'}`} onClick={ () => handleTrimestre( 't3' ) }><span>Tercer Trimestre</span></button>
            </li>
        </ul>
        <TablaAjustes/>    
    </>
  )
}
