
export const Firma = ({ index, onRemoveSignature, showConditionalDiv }) => {
  return (
    <div className="col-md-4 mb-3">
        { showConditionalDiv && (  
        <div className="row px-4">
            <div className="position-relative">
                <div className="position-absolute top-0 end-0">
                    <button 
                        type="button" 
                        className="btn bg-danger py-0 px-1" 
                        style={{ color: '#f5f5f5', borderRadius: '20px' }}
                        onClick={ () => onRemoveSignature(index) }
                    >
                        <i className="fa-solid fa-minus"></i>
                    </button>
                </div>
            </div>
        </div>
        )}
        <div className="row mt-4 pt-2">
            <div className="col-10" style={{ backgroundColor: '#fffff', height: '200px', border: '1px solid black'}}>

            </div>
        </div>
        <div className="row" style={{ marginRight: '25px' }}>
            <label className="form-label">Nombre</label>
            <input type="" className="form-control"/>
        </div>
        <div className="row" style={{ marginRight: '25px' }}>
            <label className="form-label">Area</label>
            <input type="" className="form-control"/>
        </div>
    </div>
  )
}
