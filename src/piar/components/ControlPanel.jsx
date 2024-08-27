import { useState } from 'react';
import { SwitchButton, ListForms, CardList } from './';
import './ControlPanel.css'
import { useNavigate } from 'react-router-dom';
import { useForm, usePiarStore } from '../../hooks';

export const
  ControlPanel = () => {

  const navigate = useNavigate();

  const [ viewData, setViewData ] = useState( false );

  const { isLoadingPiars } = usePiarStore();
  
  const { setInitialForm1 } = useForm();

  const updateViewData = ( newValue ) => {
    setViewData( newValue );
  };

  const handleNewPiar = () => {
    setInitialForm1();
    navigate('/piar');
  }

  return (
    <div className='bg-body-tertiary p-2' style={{ borderRadius:"20px" }}>
        <div className='d-flex justify-content-between mt-2'>
          <div className='p-2 button-new-piar'>
            <button 
              onClick={ handleNewPiar }
              className='btn' style={{ backgroundColor: '#508bfc', color: '#f5f5f5', borderRadius: '50px' }}>
              <i className="fa-solid fa-plus"></i>
              <span style={{ margin: '0px 10px'}}>Nuevo Piar</span>
            </button>
          </div>
          <SwitchButton viewData={ viewData } setViewData={ updateViewData }/>
        </div>
        {
          isLoadingPiars ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (<></>)
        }
        {
          viewData ? (
            <ListForms/>
          ) : (
            <CardList/>
          )
        }
    </div>
  )
}
