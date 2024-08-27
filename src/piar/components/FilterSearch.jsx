import { usePiarStore } from '../../hooks';
import './FilterSearch.css'

export const FilterSearch = ({ filterWidthState }) => {
  
  const { searchState, setSearchPiar } = usePiarStore();

  let filterStyle = {}
  
  if (filterWidthState != 'N') {
    filterStyle = {
      position: 'fixed',
      top: '70px',
      width: `${ filterWidthState }px`, // Utiliza el valor de filterWidthState para el ancho
    };
  } else {
    filterStyle = {};
  }
    
  
  return (
    <div className='w-100'>
      <div className='item-conteiner-filter-search'>
        <div className={`${ filterWidthState === 'N' ? '' : 'bg-body-tertiary' } p-2 item-conteiner-filter-search-input`} style={ filterStyle }>
          <div className="input-box">
            <i className="fa fa-search"></i>
            <input 
              type="search" 
              className="form-control"
              name='search'
              value={ searchState }
              onChange={ setSearchPiar }
            />                    
          </div>
          {/* <div className="d-grid gap-2 mt-1">
            <button className="btn btn-secondary" type="button" title='Filtrar'>
              <i className="fa-solid fa-filter"></i>
            </button>
          </div> */}
        </div>
      </div>
    </div>
  )
}
