import { useEffect, useRef } from "react";

import { useForm, useModal, useModalStore, usePiarStore } from "../../hooks"
import { ModalAjustes } from './ModalAjustes'
import { ModalDeleteMateria } from './ModalDeleteMateria'
import './TablaAjustes.css'
import { TablaAjustesBody } from "./TablaAjustesBody";

export const TablaAjustes = () => {

    const { onClickOpenModal, stylesIsOpen, stylesIsClose, isAjusteModalOpen } = useModal();
    const { periodo } = usePiarStore();
    const { setModalType, handleSetMateriasModal, setActiveMateria } = useModalStore();
    const { matsPiarState } = useForm();
    const btnAddMateria = useRef(null);
    
    const onOpenModalMaterias = () => {
        onClickOpenModal('ajustes');
        setModalType('materias');
        handleSetMateriasModal();
    }

    const onOpenModalHerramientas = ( materia, type ) => {
        onClickOpenModal('ajustes');
        setModalType( type );
        setActiveMateria( materia );
    }

    const onOpenModalDelete = ( materia, type ) => {
        setActiveMateria(materia);
        onClickOpenModal(type);
    }

    useEffect(() => {
        if ( isAjusteModalOpen ) {
            stylesIsOpen( btnAddMateria );
        } else {
            stylesIsClose( btnAddMateria );
        }
        return () => {
            stylesIsClose( btnAddMateria );
        };
    }, [isAjusteModalOpen]);
    
    const renderContent = () => {
        switch (periodo) {
            case 't1':
                return (
                    <TablaAjustesBody
                        onOpenModalDelete = { onOpenModalDelete }
                        periodo='t1'
                        matsPiarState={matsPiarState.trimestre1.materias}
                        onOpenModalMaterias={onOpenModalMaterias}
                        btnAddMateria={btnAddMateria}
                        onOpenModalHerramientas = { onOpenModalHerramientas }
                    />
                );
            case 't2':
                return (
                    <TablaAjustesBody
                        onOpenModalDelete = { onOpenModalDelete }
                        periodo='t2'
                        matsPiarState={matsPiarState.trimestre2.materias}
                        onOpenModalMaterias={onOpenModalMaterias}
                        btnAddMateria={btnAddMateria}
                        onOpenModalHerramientas = { onOpenModalHerramientas }
                    />
                );
            case 't3':
                return (
                    <TablaAjustesBody
                        onOpenModalDelete = { onOpenModalDelete }
                        periodo='t3'
                        matsPiarState={matsPiarState.trimestre3.materias}
                        onOpenModalMaterias={onOpenModalMaterias}
                        btnAddMateria={btnAddMateria}
                        onOpenModalHerramientas = { onOpenModalHerramientas }
                    />
                );
            case 'b1':
                return (
                    <TablaAjustesBody
                        onOpenModalDelete = { onOpenModalDelete }
                        periodo='b1'
                        matsPiarState={matsPiarState.bimestre1.materias}
                        onOpenModalMaterias={onOpenModalMaterias}
                        btnAddMateria={btnAddMateria}
                        onOpenModalHerramientas = { onOpenModalHerramientas }
                    />
                );
            case 'b2':
                return (
                    <TablaAjustesBody
                        onOpenModalDelete = { onOpenModalDelete }
                        periodo='b2'
                        matsPiarState={matsPiarState.bimestre2.materias}
                        onOpenModalMaterias={onOpenModalMaterias}
                        btnAddMateria={btnAddMateria}
                        onOpenModalHerramientas = { onOpenModalHerramientas }
                    />
                );
            case 'b3':
                return (
                    <TablaAjustesBody
                        onOpenModalDelete = { onOpenModalDelete }
                        periodo='b3'
                        matsPiarState={matsPiarState.bimestre3.materias}
                        onOpenModalMaterias={onOpenModalMaterias}
                        btnAddMateria={btnAddMateria}
                        onOpenModalHerramientas = { onOpenModalHerramientas }
                    />
                );
            case 'b4':
                return (
                    <TablaAjustesBody
                        onOpenModalDelete = { onOpenModalDelete }
                        periodo='b4'
                        matsPiarState={matsPiarState.bimestre4.materias}
                        onOpenModalMaterias={onOpenModalMaterias}
                        btnAddMateria={btnAddMateria}
                        onOpenModalHerramientas = { onOpenModalHerramientas }
                    />
                );
            default:
                return null;
        }
    };

  return (
    <>
    <div className="table-responsive p-sm-3 py-sm-3 py-2"  style={{ backgroundColor: '#d0d0d0', borderRadius: '0 10px 10px 10px' }}>
        <table className="table-responsive">
            <thead>
                <tr>
                    <th><div className='text-orientation'>AREAS/APRENDIZAJE</div></th>
                    <th>DOCENTE</th>
                    <th>OBJETIVOS/PROPOSITOS<br /><br />
                        (Estas son para todo el grado, de acuerdo con los EBC y los DBA)<br />
                        <span
                            style={{ 
                                backgroundColor: "#d0d0d0",
                                padding: "5px",
                                borderRadius: "5px"    
                            }}
                        >{periodo} Trimestre</span>
                    </th>
                    <th>
                        BARRERAS QUE SE EVIDENCIAN EN EL CONTEXTO SOBRE LAS QUE SE DEBEN
                        TRABAJAR
                    </th>
                    <th>
                        AJUSTES RAZONABLES
                    </th>
                    <th>
                        EVALUACIÓN DE LOS AJUSTES<br /><br />
                        (Dejar espacio para observaciones. Realizar seguimiento 3 veces en
                        el año como minimo de acuerdo con la periodicidad establecida en
                        el sistema institucional de Evaluacion de los Estudiantes SIEE)
                    </th>
                </tr>
            </thead>
            <tbody>
                { renderContent() }
            </tbody>
        </table>
    </div>
    <ModalAjustes/>
    <ModalDeleteMateria/>
    </>
  )
}
