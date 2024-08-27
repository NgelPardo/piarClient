import { useEffect, useState } from "react";
import { Piar1, Piar2, Piar3, Piar4, Piar5 } from "../components";
import { PiarLayout } from "../layout/PiarLayout"
import './PiarPage.css'
import { useUiStore } from "../../hooks";
import { useNavigate } from "react-router-dom";

export const PiarPage = () => {

  const navigate = useNavigate()

  const { parteActual } = useUiStore();

  const [ periodoAcademico, setPeriodoAcademico ] = useState(localStorage.getItem('academicPeriod') || null );
  
  useEffect(() => {
    localStorage.setItem('sectionPiar', parteActual)
  }, [parteActual]);

  useEffect(() => {
    localStorage.setItem('academicPeriod', periodoAcademico)
  }, [periodoAcademico]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("redirectAfterReload", true);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    const shouldRedirect = localStorage.getItem("redirectAfterReload");
    if (shouldRedirect) {
      localStorage.removeItem("redirectAfterReload");
      navigate("/form", { replace: true });
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const renderParteActual = () => {
    switch (parteActual) {
      case 1:
        return <Piar1 />;
      case 2:
        return <Piar2 setPeriodoAcademico={ setPeriodoAcademico } periodoAcademico={ periodoAcademico }/>;
      case 3:
        return <Piar3 periodoAcademico={ periodoAcademico }/>;
      case 4:
        return <Piar4 />;
      case 5:
        return <Piar5 />;
      default:
        return null;
    }
  };

  return (
    <PiarLayout>
      {renderParteActual()}
    </PiarLayout>
  )
}
