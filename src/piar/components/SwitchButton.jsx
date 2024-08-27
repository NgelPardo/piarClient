import './SwitchButton.css';

export const SwitchButton = ({ viewData, setViewData }) => {

  return (
    <div className="row mb-4">
        <div className="col-12">
            <div className="btn-group btn-toggle">
                <button
                    className={`btn btn-lg ${ viewData ? 'btn-primary active' : 'btn-light' }`}
                    style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'}}
                    onClick={ () => setViewData( true ) }
                >
                    <i className="fa-solid fa-table-list"></i>
                </button>
                <button 
                    className={`btn btn-lg ${ !viewData ? 'btn-primary active' : 'btn-light' }`}
                    style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'}}
                    onClick={ () => setViewData( false ) }
                >
                    <i className="fa-solid fa-window-restore"></i>
                </button>
            </div>
        </div>
    </div>
  )
}
